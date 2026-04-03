import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const projectRoot = path.resolve(__dirname, '..', '..');
export const engineRoot = path.join(projectRoot, 'src', 'engine', 'simplex-engine');
export const workspaceRoot = path.join(projectRoot, 'workspaces');
export const samplesRoot = path.join(engineRoot, 'samples');
export const binDir = path.join(engineRoot, 'bin');
export const asmBinary = path.join(binDir, process.platform === 'win32' ? 'asm.exe' : 'asm');
export const emuBinary = path.join(binDir, process.platform === 'win32' ? 'emu.exe' : 'emu');
