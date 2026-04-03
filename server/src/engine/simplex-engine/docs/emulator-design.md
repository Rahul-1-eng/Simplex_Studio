# Emulator Design

Registers:
- A
- B
- SP
- PC

Trace contains:
- step number
- PC
- fetched word
- opcode
- operand
- A/B/SP values

Protection:
- PC range check
- memory range check
- execution step cap
- invalid opcode halt
