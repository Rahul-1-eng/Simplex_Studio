import type { Express } from 'express';

export function registerResetRoute(app: Express) {
  app.post('/api/reset', (_req, res) => {
    res.json({ ok: true, message: 'Frontend playback reset is client-side. Machine state returned to zero view.', registers: { A: 0, B: 0, PC: 0, SP: 0 } });
  });
}
