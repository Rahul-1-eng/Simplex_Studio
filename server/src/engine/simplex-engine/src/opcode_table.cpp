/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: opcode_table.cpp
 */

#include "../include/opcode_table.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

OpcodeTable::OpcodeTable() {
    auto add = [&](const std::string& mnemonic, int opcode, bool takesOperand, bool isDirective, bool isSet, bool isBranchLike) {
        table[util::toLower(mnemonic)] = OpcodeInfo{
            util::toLower(mnemonic), opcode, takesOperand, isDirective, isSet, isBranchLike
        };
    };

    add("data",   -1, true,  true,  false, false);
    add("ldc",     0, true,  false, false, false);
    add("adc",     1, true,  false, false, false);
    add("ldl",     2, true,  false, false, false);
    add("stl",     3, true,  false, false, false);
    add("ldnl",    4, true,  false, false, false);
    add("stnl",    5, true,  false, false, false);
    add("add",     6, false, false, false, false);
    add("sub",     7, false, false, false, false);
    add("shl",     8, false, false, false, false);
    add("shr",     9, false, false, false, false);
    add("adj",    10, true,  false, false, false);
    add("a2sp",   11, false, false, false, false);
    add("sp2a",   12, false, false, false, false);
    add("call",   13, true,  false, false, true);
    add("return", 14, false, false, false, false);
    add("brz",    15, true,  false, false, true);
    add("brlz",   16, true,  false, false, true);
    add("br",     17, true,  false, false, true);
    add("halt",   18, false, false, false, false);
    add("set",    -2, true,  true,  true,  false);
}

bool OpcodeTable::exists(const std::string& mnemonic) const {
    return table.find(util::toLower(mnemonic)) != table.end();
}

const OpcodeInfo& OpcodeTable::get(const std::string& mnemonic) const {
    auto it = table.find(util::toLower(mnemonic));
    if (it == table.end()) {
        throw std::runtime_error("Unknown mnemonic: " + mnemonic);
    }
    return it->second;
}

bool OpcodeTable::isBranchLike(const std::string& mnemonic) const {
    return get(mnemonic).isBranchLike;
}

} // namespace simplex