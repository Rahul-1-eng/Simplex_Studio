# Extended SIMPLEX ISA

| Mnemonic | Opcode | Operand | Meaning |
|----------|--------|---------|---------|
| data     | pseudo | value   | place constant word |
| ldc      | 0      | value   | B := A; A := value |
| adc      | 1      | value   | A := A + value |
| ldl      | 2      | offset  | B := A; A := memory[SP + offset] |
| stl      | 3      | offset  | memory[SP + offset] := A; A := B |
| ldnl     | 4      | offset  | A := memory[A + offset] |
| stnl     | 5      | offset  | memory[A + offset] := B |
| add      | 6      | none    | A := B + A |
| sub      | 7      | none    | A := B - A |
| shl      | 8      | none    | A := B << A |
| shr      | 9      | none    | A := B >> A |
| adj      | 10     | value   | SP := SP + value |
| a2sp     | 11     | none    | SP := A; A := B |
| sp2a     | 12     | none    | B := A; A := SP |
| call     | 13     | offset  | B := A; A := PC; PC := PC + offset |
| return   | 14     | none    | PC := A; A := B |
| brz      | 15     | offset  | if A == 0 then PC := PC + offset |
| brlz     | 16     | offset  | if A < 0 then PC := PC + offset |
| br       | 17     | offset  | PC := PC + offset |
| HALT     | 18     | none    | halt |
| SET      | pseudo | value   | assign symbolic constant |

Branch-like mnemonics:
- call
- brz
- brlz
- br
