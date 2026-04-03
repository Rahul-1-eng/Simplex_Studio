import type { Express } from 'express';
import fs from 'node:fs/promises';
import { ensureEngineBuilt } from '../lib/engine.js';
import { samplesRoot } from '../lib/paths.js';

export function registerHealthRoute(app: Express) {
  app.get('/api/health', async (_req, res) => {
    try {
      await ensureEngineBuilt();
      const samples = await fs.readdir(samplesRoot);
      res.json({ ok: true, engineReady: true, samplesCount: samples.filter((item) => item.endsWith('.asm')).length });
    } catch (error) {
      res.status(500).json({ ok: false, engineReady: false, error: (error as Error).message });
    }
  });
}
