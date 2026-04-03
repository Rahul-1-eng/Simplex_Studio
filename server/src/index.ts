import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { ensureDir } from './lib/fs-utils.js';
import { workspaceRoot } from './lib/paths.js';
import { ensureEngineBuilt } from './lib/engine.js';
import { registerHealthRoute } from './routes/health.js';
import { registerSamplesRoute } from './routes/samples.js';
import { registerAssembleRoute } from './routes/assemble.js';
import { registerRunRoute } from './routes/run.js';
import { registerStepRoute } from './routes/step.js';
import { registerResetRoute } from './routes/reset.js';

const app = express();
const port = Number(process.env.PORT ?? 8787);
const clientDist = path.resolve(process.cwd(), '..', 'client', 'dist');

app.use(cors());
app.use(express.json({ limit: '1mb' }));
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

registerHealthRoute(app);
registerSamplesRoute(app);
registerAssembleRoute(app);
registerRunRoute(app);
registerStepRoute(app);
registerResetRoute(app);

if (fs.existsSync(clientDist)) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(port, async () => {
  await ensureDir(workspaceRoot);
  try {
    await ensureEngineBuilt();
    console.log(`SIMPLEX Studio server running on http://localhost:${port}`);
  } catch (error) {
    console.error('SIMPLEX Studio server started, but the engine is not ready yet.');
    console.error((error as Error).message);
    console.log(`Open http://localhost:${port} and check /api/health for engine diagnostics.`);
  }
});
