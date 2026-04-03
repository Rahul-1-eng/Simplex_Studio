import type { Express } from 'express';
import { getRun } from '../lib/run-store.js';

export function registerStepRoute(app: Express) {
  app.post('/api/step', (req, res) => {
    const { runId, stepIndex } = req.body as { runId?: string; stepIndex?: number };
    if (!runId) {
      res.status(400).send('Missing runId');
      return;
    }
    const run = getRun(runId);
    if (!run) {
      res.status(404).send('Run not found. Execute the program again to refresh step playback.');
      return;
    }
    const index = Math.max(0, Math.min(stepIndex ?? 0, run.trace.length - 1));
    res.json({ ok: true, step: run.trace[index], stepIndex: index, haltReason: run.haltReason, finalRegisters: run.finalRegisters });
  });
}
