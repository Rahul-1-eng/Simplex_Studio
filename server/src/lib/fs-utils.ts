import fs from 'node:fs/promises';
import path from 'node:path';

export async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

export function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

export async function readIfExists(filePath: string) {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch {
    return '';
  }
}

export async function listAsmSamples(samplesRoot: string) {
  const entries = await fs.readdir(samplesRoot);
  return entries.filter((entry) => entry.endsWith('.asm')).map((entry) => path.join(samplesRoot, entry));
}
