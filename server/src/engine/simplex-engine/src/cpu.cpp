/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: cpu.cpp
 */

#include "../include/cpu.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

CPU::CPU(const OpcodeTable& opcodeTable)
    : A(0), B(0), SP(0), PC(0), halted(false), haltReason(""), opcodeTable(opcodeTable), stepCounter(0) {}

void CPU::reset() {
    A = 0;
    B = 0;
    SP = 0;
    PC = 0;
    halted = false;
    haltReason.clear();
    traceLines.clear();
    stepCounter = 0;
}

void CPU::traceState(int32_t word, int opcode, int operand) {
    std::ostringstream out;
    out << "STEP=" << stepCounter
        << " PC=" << PC
        << " WORD=" << util::hex8(word)
        << " OPCODE=" << opcode
        << " OPERAND=" << operand
        << " A=" << A
        << " B=" << B
        << " SP=" << SP;
    traceLines.push_back(out.str());
}

void CPU::step(Memory& memory) {
    if (PC < 0 || PC >= memory.size()) {
        halted = true;
        haltReason = "PC out of range";
        return;
    }

    int32_t word = memory.read(PC);
    int opcode = util::parseOpcodePart(word);
    int operand = util::parseOperandPart(word);

    traceState(word, opcode, operand);

    int32_t nextPC = PC + 1;

    switch (opcode) {
        case 0:  B = A; A = operand; break;
        case 1:  A = A + operand; break;
        case 2:  B = A; A = memory.read(SP + operand); break;
        case 3:  memory.write(SP + operand, A); A = B; break;
        case 4:  A = memory.read(A + operand); break;
        case 5:  memory.write(A + operand, B); break;
        case 6:  A = B + A; break;
        case 7:  A = B - A; break;
        case 8:  A = B << A; break;
        case 9:  A = B >> A; break;
        case 10: SP = SP + operand; break;
        case 11: SP = A; A = B; break;
        case 12: B = A; A = SP; break;
        case 13: B = A; A = nextPC; nextPC = nextPC + operand; break;
        case 14: nextPC = A; A = B; break;
        case 15: if (A == 0) nextPC = nextPC + operand; break;
        case 16: if (A < 0) nextPC = nextPC + operand; break;
        case 17: nextPC = nextPC + operand; break;
        case 18: halted = true; haltReason = "HALT instruction"; break;
        default:
            halted = true;
            haltReason = "Invalid opcode";
            break;
    }

    PC = nextPC;
    ++stepCounter;
}

void CPU::run(Memory& memory) {
    reset();
    while (!halted) {
        if (stepCounter >= MAX_EXECUTION_STEPS) {
            halted = true;
            haltReason = "Execution step limit exceeded";
            break;
        }
        step(memory);
    }

    std::ostringstream out;
    out << "HALT_REASON=" << haltReason
        << " FINAL_A=" << A
        << " FINAL_B=" << B
        << " FINAL_SP=" << SP
        << " FINAL_PC=" << PC;
    traceLines.push_back(out.str());
}

void CPU::writeTrace(const std::string& path) const {
    std::ofstream out(path.c_str());
    for (const std::string& line : traceLines) {
        out << line << "\n";
    }
}

std::string CPU::getHaltReason() const {
    return haltReason;
}

} // namespace simplex