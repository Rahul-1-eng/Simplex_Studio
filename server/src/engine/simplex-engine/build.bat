@echo off
if not exist bin mkdir bin
if not exist outputs mkdir outputs

echo =========================================
echo Building assembler
echo =========================================
g++ -std=c++17 -Wall -Wextra -Iinclude ^
    src\utilities.cpp src\diagnostics.cpp src\opcode_table.cpp ^
    src\lexer.cpp src\parser.cpp src\symbol_table.cpp ^
    src\intermediate_writer.cpp src\listing_writer.cpp src\object_writer.cpp ^
    src\assembler_pass1.cpp src\assembler_pass2.cpp src\assembler.cpp ^
    src\asm_main.cpp -o bin\asm.exe

if errorlevel 1 (
    echo Assembler build failed.
    exit /b 1
)

echo =========================================
echo Building emulator
echo =========================================
g++ -std=c++17 -Wall -Wextra -Iinclude ^
    src\utilities.cpp src\diagnostics.cpp src\opcode_table.cpp ^
    src\loader.cpp src\memory.cpp src\cpu.cpp src\emulator.cpp ^
    src\emu_main.cpp -o bin\emu.exe

if errorlevel 1 (
    echo Emulator build failed.
    exit /b 1
)

echo =========================================
echo Build successful
echo =========================================
