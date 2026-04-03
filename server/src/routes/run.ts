import type { Express } from 'express';
import { createSession } from '../workspace/session.js';
import { runAssembler, runEmulator } from '../lib/engine.js';
import { readIfExists } from '../lib/fs-utils.js';
import { parseMemory } from '../parsers/memory.js';
import { parseTrace } from '../parsers/trace.js';
import { saveRun } from '../lib/run-store.js';

export function registerRunRoute(app: Express) {
  app.post('/api/run', async (req, res) => {
    const { code, filename } = req.body as { code?: string; filename?: string };

    if (!code) {
      res.status(400).json({
        ok: false,
        message: 'Missing code',
        stderr: '',
        artifacts: {},
        parsed: {
          trace: [],
          haltReason: 'No source code provided.',
          finalRegisters: { A: 0, B: 0, PC: 0, SP: 0 },
          memory: []
        }
      });
      return;
    }

    let session:
      | Awaited<ReturnType<typeof createSession>>
      | null = null;
    let assembleStdout = '';
    let assembleStderr = '';
    let emulateStdout = '';
    let emulateStderr = '';

    try {
      session = await createSession(filename ?? 'program.asm', code);
      const assemble = await runAssembler(session.inputPath, session.outputPrefix);
      assembleStdout = assemble.stdout ?? '';
      assembleStderr = assemble.stderr ?? '';

      const emulate = await runEmulator(session.objectPath, session.tracePath, session.dumpPath);
      emulateStdout = emulate.stdout ?? '';
      emulateStderr = emulate.stderr ?? '';

      const artifacts = {
        log: await readIfExists(`${session.outputPrefix}.log`),
        lst: await readIfExists(`${session.outputPrefix}.lst`),
        sym: await readIfExists(`${session.outputPrefix}.sym`),
        int: await readIfExists(`${session.outputPrefix}.int`),
        o: await readIfExists(`${session.outputPrefix}.o`),
        bin: await readIfExists(`${session.outputPrefix}.bin`),
        trace: await readIfExists(session.tracePath),
        dump: await readIfExists(session.dumpPath)
      };

      const trace = parseTrace(artifacts.trace);
      const memory = parseMemory(artifacts.dump);
      const storedRun = saveRun({
        trace: trace.trace,
        haltReason: trace.haltReason,
        finalRegisters: trace.finalRegisters,
        memory
      });

      res.json({
        ok: true,
        message: 'Program assembled and executed successfully.',
        outputPrefix: session.outputPrefix,
        stdout: [assembleStdout, emulateStdout].filter(Boolean).join('\n'),
        stderr: [assembleStderr, emulateStderr].filter(Boolean).join('\n'),
        artifacts,
        runId: storedRun.id,
        parsed: {
          trace: trace.trace,
          haltReason: trace.haltReason,
          finalRegisters: trace.finalRegisters,
          memory
        }
      });
    } catch (error) {
      const artifacts = session
        ? {
            log: await readIfExists(`${session.outputPrefix}.log`),
            lst: await readIfExists(`${session.outputPrefix}.lst`),
            sym: await readIfExists(`${session.outputPrefix}.sym`),
            int: await readIfExists(`${session.outputPrefix}.int`),
            o: await readIfExists(`${session.outputPrefix}.o`),
            bin: await readIfExists(`${session.outputPrefix}.bin`),
            trace: await readIfExists(session.tracePath),
            dump: await readIfExists(session.dumpPath)
          }
        : {};

     const trace = parseTrace(((artifacts as Record<string, string | undefined>).trace) ?? '');
const memory = parseMemory(((artifacts as Record<string, string | undefined>).dump) ?? '');
      const err = error as Error & { stdout?: string; stderr?: string };

      res.status(500).json({
        ok: false,
        message: err.message || 'Run failed.',
        outputPrefix: session?.outputPrefix ?? '',
        stdout: [assembleStdout, emulateStdout, err.stdout ?? ''].filter(Boolean).join('\n'),
        stderr: [assembleStderr, emulateStderr, err.stderr ?? ''].filter(Boolean).join('\n'),
        artifacts,
        parsed: {
          trace: trace.trace,
          haltReason:
            trace.haltReason ||
            err.message ||
            'Execution failed before completion.',
          finalRegisters: trace.finalRegisters ?? { A: 0, B: 0, PC: 0, SP: 0 },
          memory
        }
      });
    }
  });
}