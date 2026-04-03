/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: cpu.hpp
 */

#ifndef CPU_HPP
#define CPU_HPP

#include "common.hpp"
#include "constants.hpp"
#include "memory.hpp"
#include "opcode_table.hpp"

namespace simplex {

class CPU {
private:
    int32_t A;
    int32_t B;
    int32_t SP;
    int32_t PC;

    bool halted;
    std::string haltReason;

    const OpcodeTable& opcodeTable;

    std::vector<std::string> traceLines;

    int stepCounter;

public:
    explicit CPU(const OpcodeTable& opcodeTable);

    void reset();

    void run(Memory& memory);

    void writeTrace(const std::string& path) const;

    std::string getHaltReason() const;

private:
    void step(Memory& memory);

    void traceState(int32_t word, int opcode, int operand);
};

} // namespace simplex

#endif