/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler_pass2.hpp
 */

#ifndef ASSEMBLER_PASS2_HPP
#define ASSEMBLER_PASS2_HPP

#include "common.hpp"
#include "diagnostics.hpp"
#include "opcode_table.hpp"
#include "symbol_table.hpp"

namespace simplex {
using namespace std;

class AssemblerPass2 {
private:
    const OpcodeTable& opcodeTable;
    const SymbolTable& symbols;
    Diagnostics& diagnostics;

    int resolveOperand(const IntermediateRecord& record) const;
    int computeEncodedOperand(const IntermediateRecord& record, int rawValue) const;

public:
    AssemblerPass2(const OpcodeTable& opcodeTable, const SymbolTable& symbols, Diagnostics& diagnostics);
    std::vector<EncodedRecord> run(const std::vector<IntermediateRecord>& records);
};

} // namespace simplex

#endif
