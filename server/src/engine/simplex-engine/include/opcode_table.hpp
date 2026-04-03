/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: opcode_table.hpp
 */

#ifndef OPCODE_TABLE_HPP
#define OPCODE_TABLE_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

struct OpcodeInfo {
    std::string mnemonic;
    int opcode;
    bool takesOperand;
    bool isDirective;
    bool isSet;
    bool isBranchLike;
};

class OpcodeTable {
private:
    std::map<std::string, OpcodeInfo> table;

public:
    OpcodeTable();
    bool exists(const std::string& mnemonic) const;
    const OpcodeInfo& get(const std::string& mnemonic) const;
    bool isBranchLike(const std::string& mnemonic) const;
};

} // namespace simplex

#endif
