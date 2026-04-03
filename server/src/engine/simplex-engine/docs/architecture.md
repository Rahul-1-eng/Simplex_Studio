# Architecture

## Assembler pipeline
1. Read source file
2. Lex line
3. Parse line
4. Pass 1
   - location counter
   - label collection
   - syntax-shape validation
5. Pass 2
   - symbol resolution
   - branch displacement calculation
   - machine-word encoding
6. Emit:
   - intermediate
   - listing
   - symbol table
   - text object
   - binary object
   - diagnostics

## Emulator pipeline
1. Load object file
2. Place words in memory
3. Initialize CPU state
4. Fetch-decode-execute loop
5. Generate trace
6. Write dump

## Design goal
Clean modular project suitable for viva and GitHub display.
