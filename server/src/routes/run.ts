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
      res.status(400).send('Missing code');
      return;
    }

    try {
      const session = await createSession(filename ?? 'program.asm', code);
      const assemble = await runAssembler(session.inputPath, session.outputPrefix);
      const emulate = await runEmulator(session.objectPath, session.tracePath, session.dumpPath);

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
        stdout: [assemble.stdout, emulate.stdout].filter(Boolean).join('\n'),
        stderr: [assemble.stderr, emulate.stderr].filter(Boolean).join('\n'),
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
      res.status(500).send((error as Error).message);
    }
  });
}
