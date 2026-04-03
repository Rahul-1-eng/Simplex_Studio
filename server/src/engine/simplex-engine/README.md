# SIMPLEX Assembler & Emulator

**Author:** Rahul Kumar Sahoo  
**User ID:** 2401CS09  
**Language:** C++

Two-pass assembler and emulator for the **SIMPLEX Instruction Set Architecture** developed for the **CS2206 Systems Programming Mini Project**.

---

## How to Build and Run

### Build

```bat
build.bat
```

This creates:

```text
binsm.exe
bin\emu.exe
```

### Assemble a program

```bat
binsm.exe tests	est01.asm outputs	est01
```

Verbose mode:

```bat
binsm.exe tests	est01.asm outputs	est01 -v
```

Generated files:

```text
outputs	est01.int   intermediate file
outputs	est01.lst   listing file
outputs	est01.sym   symbol table
outputs	est01.log   diagnostics log
outputs	est01.o     text object file
outputs	est01.bin   binary object file
```

### Run the emulator

```bat
bin\emu.exe outputs	est01.o outputs	est01.trace outputs	est01.dump
```

Generated files:

```text
outputs	est01.trace execution trace
outputs	est01.dump  final memory dump
```

---

## Project Flow

```text
.asm source
   ↓
lexer + parser
   ↓
pass-1  → symbol table + intermediate file
   ↓
pass-2  → machine code generation
   ↓
.o / .bin object file
   ↓
loader
   ↓
emulator (CPU + memory)
   ↓
.trace + .dump
```

---

## SIMPLEX Machine Architecture

The SIMPLEX machine uses four 32-bit registers:

- **A** – accumulator
- **B** – secondary register
- **PC** – program counter
- **SP** – stack pointer

Each instruction contains:

- **8-bit opcode**
- **24-bit signed operand**

Some instructions take no operand and some take one operand.

---

## Important Components

### Lexer
Breaks each assembly line into label, mnemonic and operand fields.

### Parser
Validates the structure of each assembly line and prepares records for assembly.

### Pass-1
Builds the symbol table, checks label issues and assigns addresses.

### Pass-2
Resolves symbols, computes branch displacements and encodes instructions.

### Loader
Reads the object file and places machine words into emulator memory.

### Emulator
Simulates the SIMPLEX CPU using the fetch-decode-execute cycle.

---

## File Description

### Root files

- `build.bat` – Windows build script
- `Makefile` – build support for g++/make
- `claims.txt` – list of implemented features
- `README.md` – project documentation
- `asm.cpp` – root wrapper for assembler main
- `emu.cpp` – root wrapper for emulator main

### `src/`

- `assembler.cpp` – main assembler driver
- `assembler_pass1.cpp` – first pass of assembler
- `assembler_pass2.cpp` – second pass of assembler
- `lexer.cpp` – lexical processing of source lines
- `parser.cpp` – source file parsing into internal records
- `symbol_table.cpp` – symbol table management
- `opcode_table.cpp` – instruction table and operand rules
- `intermediate_writer.cpp` – writes intermediate file
- `listing_writer.cpp` – writes listing file
- `object_writer.cpp` – writes `.o`, `.bin`, `.sym`
- `loader.cpp` – loads object program for emulator
- `memory.cpp` – SIMPLEX memory model
- `cpu.cpp` – SIMPLEX CPU execution logic
- `emulator.cpp` – emulator driver
- `asm_main.cpp` – assembler entry point
- `emu_main.cpp` – emulator entry point
- `diagnostics.cpp` – error/warning handling and log generation
- `utilities.cpp` – helper functions

### `include/`

Header files for the above modules.

### `tests/`

Assembler and emulator validation programs:

- `test01.asm` – valid basic program
- `test02.asm` – invalid program for diagnostics
- `test03.asm` – `SET` directive test
- `test04.asm` – branch and loop test
- `test05.asm` – larger structured program
- `test06.asm` to `test11.asm` – extra success/failure cases

### `samples/`

Algorithm-oriented SIMPLEX programs:

- `bubble_sort.asm`
- `factorial.asm`
- `fibonacci.asm`
- `linear_search.asm`
- `max_in_array.asm`

### `outputs/`

Sample generated files from assembler/emulator runs.

---

## Testing

### Suggested demo

1. `build.bat`
2. `binsm.exe tests	est01.asm outputs	est01 -v`
3. inspect `outputs	est01.lst`, `outputs	est01.sym`, `outputs	est01.log`
4. `bin\emu.exe outputs	est01.o outputs	est01.trace outputs	est01.dump`
5. inspect `outputs	est01.trace` and `outputs	est01.dump`

### Bubble sort result

The included `samples/bubble_sort.asm` sorts the demo array:

```text
9 3 7 2 1
```

In the memory dump, the sorted array appears in the `arr` region as:

```text
1 2 3 7 9
```

---

## Learning Outcomes

This project helped in understanding:

- assembler design
- lexical analysis and parsing
- symbol tables and label resolution
- instruction encoding
- object file generation
- emulator design
- CPU execution and memory updates
- low-level systems programming in C++

---

## Author

**Rahul Kumar Sahoo**  
**2401CS09**  
Indian Institute of Technology Patna
