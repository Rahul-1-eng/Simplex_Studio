import type { Express } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { samplesRoot } from '../lib/paths.js';

function describeSample(fileName: string) {
  const map: Record<string, { title: string; description: string; difficulty: 'Beginner' | 'Intermediate' }> = {
    'factorial.asm': { title: 'Factorial', description: 'Multiplies descending values to compute a factorial.', difficulty: 'Beginner' },
    'fibonacci.asm': { title: 'Fibonacci', description: 'Builds the Fibonacci sequence using iterative state updates.', difficulty: 'Beginner' },
    'bubble_sort.asm': { title: 'Bubble Sort', description: 'Sorts a small in-memory array and is ideal for trace replay.', difficulty: 'Intermediate' },
    'linear_search.asm': { title: 'Linear Search', description: 'Scans an array for a target value and records the found index.', difficulty: 'Beginner' },
    'max_in_array.asm': { title: 'Max in Array', description: 'Walks a list to identify the largest element in memory.', difficulty: 'Beginner' }
  };
  return map[fileName] ?? { title: path.basename(fileName, '.asm'), description: 'SIMPLEX sample program.', difficulty: 'Beginner' };
}

export function registerSamplesRoute(app: Express) {
  app.get('/api/samples', async (_req, res) => {
    const entries = (await fs.readdir(samplesRoot)).filter((entry) => entry.endsWith('.asm'));
    const samples = await Promise.all(entries.map(async (entry) => {
      const meta = describeSample(entry);
      return {
        id: path.basename(entry, '.asm'),
        ...meta,
        code: await fs.readFile(path.join(samplesRoot, entry), 'utf8')
      };
    }));
    res.json({ samples });
  });
}
