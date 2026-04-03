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
      res.status(400).send('Missing code');
      return;
    }

    try {
      const session = await createSession(filename ?? 'program.asm', code);
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
          symbols: parseSymbols(artifacts.sym),
          listing: parseListing(artifacts.lst),
          diagnosticsText: artifacts.log
        }
      });
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  });
}
