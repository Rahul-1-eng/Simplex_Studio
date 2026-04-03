# Assembler Design

## Pass 1
- validates labels
- validates mnemonic existence
- validates operand presence/absence
- records symbols
- assigns addresses
- collects preliminary diagnostics
- creates intermediate records

## Pass 2
- resolves numeric and symbolic operands
- computes relative displacement for branch-like instructions
- encodes machine words
- prepares object output

## Object format
Text object:
- address
- machine word
- mnemonic
- operand text

Binary object:
- 32-bit address
- 32-bit machine word
repeated for each generated word

## Diagnostics
- duplicate label
- undefined symbol
- unknown mnemonic
- missing operand
- unexpected operand
- invalid operand
- invalid label
- extra tokens
