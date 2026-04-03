export type ListingRow = { address: string; word: string; source: string };

export function parseListing(text: string): ListingRow[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.match(/^([0-9A-F]{8})\s+([0-9A-F]{8})\s+(.*)$/i))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      address: match[1],
      word: match[2],
      source: match[3].trim()
    }));
}
