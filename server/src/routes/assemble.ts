import type { Express } from 'express';
import { createSession } from '../workspace/session.js';
import { runAssembler } from '../lib/engine.js';
import { readIfExists } from '../lib/fs-utils.js';
import { parseListing } from '../parsers/listing.js';
import { parseSymbols } from '../parsers/symbols.js';

export function registerAssembleRoute(app: Express) {
  app.post('/api/assemble', async (req, res) => {
    const { code, filename } = req.body as { code?: string; filename?: string };

    if (!code) {
      res.status(400).json({
        ok: false,
        message: 'Missing code',
        stderr: '',
        diagnostics: 'No source code was provided.',
        artifacts: {}
      });
      return;
    }

    let session:
      | Awaited<ReturnType<typeof createSession>>
      | null = null;

    try {
      session = await createSession(filename ?? 'program.asm', code);
      const command = await runAssembler(session.inputPath, session.outputPrefix);

      const artifacts = {
        log: await readIfExists(`${session.outputPrefix}.log`),
        lst: await readIfExists(`${session.outputPrefix}.lst`),
        sym: await readIfExists(`${session.outputPrefix}.sym`),
        int: await readIfExists(`${session.outputPrefix}.int`),
        o: await readIfExists(`${session.outputPrefix}.o`),
        bin: await readIfExists(`${session.outputPrefix}.bin`)
      };

      res.json({
        ok: true,
        message: 'Assembly completed successfully.',
        outputPrefix: session.outputPrefix,
        stdout: command.stdout,
        stderr: command.stderr,
        diagnostics: artifacts.log,
        artifacts,
     parsed: {
  symbols: parseSymbols(artifacts.sym ?? ''),
  listing: parseListing(artifacts.lst ?? ''),
  diagnosticsText: artifacts.log ?? ''
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
            bin: await readIfExists(`${session.outputPrefix}.bin`)
          }
        : {};

      const err = error as Error & { stdout?: string; stderr?: string };

      res.status(500).json({
        ok: false,
        message: err.message || 'Assembly failed.',
        outputPrefix: session?.outputPrefix ?? '',
        stdout: err.stdout ?? '',
        stderr: err.stderr ?? '',
        diagnostics:
          (artifacts as Record<string, string | undefined>).log ??
          err.stderr ??
          err.message,
        artifacts,
parsed: {
  symbols: parseSymbols(((artifacts as Record<string, string | undefined>).sym) ?? ''),
  listing: parseListing(((artifacts as Record<string, string | undefined>).lst) ?? ''),
  diagnosticsText:
    (artifacts as Record<string, string | undefined>).log ??
    err.stderr ??
    err.message
}
      });
    }
  });
}