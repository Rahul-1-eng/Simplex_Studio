/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler_pass1.hpp
 */

#ifndef ASSEMBLER_PASS1_HPP
#define ASSEMBLER_PASS1_HPP

#include "common.hpp"
#include "diagnostics.hpp"
#include "opcode_table.hpp"
#include "symbol_table.hpp"

namespace simplex {
using namespace std;

class AssemblerPass1 {
private:
    const OpcodeTable& opcodeTable;
    SymbolTable& symbols;
    Diagnostics& diagnostics;

public:
    AssemblerPass1(const OpcodeTable& opcodeTable, SymbolTable& symbols, Diagnostics& diagnostics);
    std::vector<IntermediateRecord> run(const std::vector<SourceLine>& source);
};

} // namespace simplex

#endif
