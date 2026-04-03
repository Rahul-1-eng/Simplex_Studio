export type RegisterState = { A: number; B: number; PC: number; SP: number };
export type TraceStep = {
  step: number;
  pc: number;
  word: string;
  opcode: number;
  operand: number;
  registers: RegisterState;
};

export function parseTrace(text: string) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const trace: TraceStep[] = [];
  let haltReason = 'No halt record';
  let finalRegisters: RegisterState = { A: 0, B: 0, PC: 0, SP: 0 };

  for (const line of lines) {
    if (line.startsWith('STEP=')) {
      const map = Object.fromEntries(line.split(/\s+/).map((token) => token.split('=')));
      trace.push({
        step: Number(map.STEP),
        pc: Number(map.PC),
        word: map.WORD,
        opcode: Number(map.OPCODE),
        operand: Number(map.OPERAND),
        registers: {
          A: Number(map.A),
          B: Number(map.B),
          PC: Number(map.PC),
          SP: Number(map.SP)
        }
      });
    }

    if (line.startsWith('HALT_REASON=')) {
      const reasonMatch = line.match(/HALT_REASON=(.*?)\s+FINAL_A=/);
      const finalA = line.match(/FINAL_A=(-?\d+)/)?.[1] ?? '0';
      const finalB = line.match(/FINAL_B=(-?\d+)/)?.[1] ?? '0';
      const finalSP = line.match(/FINAL_SP=(-?\d+)/)?.[1] ?? '0';
      const finalPC = line.match(/FINAL_PC=(-?\d+)/)?.[1] ?? '0';
      haltReason = reasonMatch?.[1] ?? haltReason;
      finalRegisters = { A: Number(finalA), B: Number(finalB), SP: Number(finalSP), PC: Number(finalPC) };
    }
  }

  return { trace, haltReason, finalRegisters };
}
