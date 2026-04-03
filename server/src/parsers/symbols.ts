export type SymbolRow = { symbol: string; value: string; definedAt: string; usedAt: string };

export function parseSymbols(text: string): SymbolRow[] {
  return text
    .split(/\r?\n/)
    .slice(2)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('-'))
    .map((line) => {
      const parts = line.split(/\s+/);
      return {
        symbol: parts[0] ?? '',
        value: parts[1] ?? '',
        definedAt: parts[2] ?? '',
        usedAt: parts.slice(3).join(' ')
      };
    });
}
