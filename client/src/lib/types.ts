export type Sample = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate';
  code: string;
};

export type RegisterState = {
  A: number;
  B: number;
  PC: number;
  SP: number;
};

export type TraceStep = {
  step: number;
  pc: number;
  word: string;
  opcode: number;
  operand: number;
  registers: RegisterState;
};

export type SymbolRow = {
  symbol: string;
  value: string;
  definedAt: string;
  usedAt: string;
};

export type ListingRow = {
  address: string;
  word: string;
  source: string;
};

export type MemoryRow = {
  address: string;
  value: string;
};

export type AssembleResponse = {
  ok: boolean;
  message: string;
  outputPrefix: string;
  stdout: string;
  stderr: string;
  diagnostics: string;
  artifacts: Record<string, string>;
  parsed: {
    symbols: SymbolRow[];
    listing: ListingRow[];
    diagnosticsText: string;
  };
};

export type RunResponse = {
  ok: boolean;
  message: string;
  outputPrefix: string;
  stdout: string;
  stderr: string;
  artifacts: Record<string, string>;
  parsed: {
    trace: TraceStep[];
    haltReason: string;
    finalRegisters: RegisterState;
    memory: MemoryRow[];
  };
};
