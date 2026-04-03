CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Iinclude

ASM_SRCS = \
    src/utilities.cpp \
    src/diagnostics.cpp \
    src/opcode_table.cpp \
    src/lexer.cpp \
    src/parser.cpp \
    src/symbol_table.cpp \
    src/intermediate_writer.cpp \
    src/listing_writer.cpp \
    src/object_writer.cpp \
    src/assembler_pass1.cpp \
    src/assembler_pass2.cpp \
    src/assembler.cpp \
    src/asm_main.cpp

EMU_SRCS = \
    src/utilities.cpp \
    src/diagnostics.cpp \
    src/opcode_table.cpp \
    src/loader.cpp \
    src/memory.cpp \
    src/cpu.cpp \
    src/emulator.cpp \
    src/emu_main.cpp

all: asm emu

asm:
	$(CXX) $(CXXFLAGS) $(ASM_SRCS) -o bin/asm

emu:
	$(CXX) $(CXXFLAGS) $(EMU_SRCS) -o bin/emu

asm-root:
	$(CXX) $(CXXFLAGS) asm.cpp -o bin/asm-root

emu-root:
	$(CXX) $(CXXFLAGS) emu.cpp -o bin/emu-root

clean:
	rm -f bin/asm bin/emu bin/asm-root bin/emu-root
