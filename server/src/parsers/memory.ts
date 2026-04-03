export type MemoryRow = { address: string; value: string };

export function parseMemory(text: string): MemoryRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^([0-9A-F]{8})\s+([0-9A-F]{8})$/i))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({ address: match[1], value: match[2] }));
}
