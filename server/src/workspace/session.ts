import fs from 'node:fs/promises';
import path from 'node:path';
import { nanoid } from 'nanoid';
import { ensureDir, sanitizeFilename } from '../lib/fs-utils.js';
import { workspaceRoot } from '../lib/paths.js';

export type Session = {
  id: string;
  dir: string;
  inputPath: string;
  outputPrefix: string;
  objectPath: string;
  tracePath: string;
  dumpPath: string;
};

export async function createSession(filename: string, code: string): Promise<Session> {
  await ensureDir(workspaceRoot);
  const id = nanoid(10);
  const dir = path.join(workspaceRoot, id);
  await ensureDir(dir);

  const safeName = sanitizeFilename(filename || 'program.asm');
  const baseName = safeName.replace(/\.asm$/i, '');
  const inputPath = path.join(dir, `${baseName}.asm`);
  const outputPrefix = path.join(dir, baseName);

  await fs.writeFile(inputPath, code, 'utf8');

  return {
    id,
    dir,
    inputPath,
    outputPrefix,
    objectPath: `${outputPrefix}.o`,
    tracePath: `${outputPrefix}.trace`,
    dumpPath: `${outputPrefix}.dump`
  };
}
