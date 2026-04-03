import { nanoid } from 'nanoid';
import type { MemoryRow } from '../parsers/memory.js';
import type { RegisterState, TraceStep } from '../parsers/trace.js';

export type StoredRun = {
  id: string;
  trace: TraceStep[];
  memory: MemoryRow[];
  finalRegisters: RegisterState;
  haltReason: string;
};

const store = new Map<string, StoredRun>();

export function saveRun(data: Omit<StoredRun, 'id'>) {
  const id = nanoid(10);
  const item: StoredRun = { id, ...data };
  store.set(id, item);
  return item;
}

export function getRun(id: string) {
  return store.get(id) ?? null;
}
