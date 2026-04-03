/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler_pass2.cpp
 */

#include "../include/assembler_pass2.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

AssemblerPass2::AssemblerPass2(const OpcodeTable& opcodeTable, const SymbolTable& symbols, Diagnostics& diagnostics)
    : opcodeTable(opcodeTable), symbols(symbols), diagnostics(diagnostics) {}

int AssemblerPass2::resolveOperand(const IntermediateRecord& record) const {
    if (record.operand.empty()) return 0;

    int val = 0;
    if (util::parseNumber(record.operand, val)) {
        return val;
    }

    if (!symbols.isDefined(record.operand)) {
        throw std::runtime_error("Undefined symbol during pass2: " + record.operand);
    }

    return symbols.valueOf(record.operand);
}

int AssemblerPass2::computeEncodedOperand(const IntermediateRecord& record, int rawValue) const {
    if (opcodeTable.isBranchLike(record.mnemonic)) {
        return rawValue - (record.address + 1);
    }
    return rawValue;
}

std::vector<EncodedRecord> AssemblerPass2::run(const std::vector<IntermediateRecord>& records) {
    std::vector<EncodedRecord> out;

    for (const IntermediateRecord& r : records) {
        if (!r.generatesWord) continue;

        const OpcodeInfo& info = opcodeTable.get(r.mnemonic);

        EncodedRecord e;
        e.lineNumber = r.lineNumber;
        e.address = r.address;
        e.label = r.label;
        e.mnemonic = r.mnemonic;
        e.operandText = r.operand;
        e.raw = r.raw;
        e.generatesWord = true;

        if (r.mnemonic == "data") {
            int dataValue = 0;
            try {
                dataValue = resolveOperand(r);
            } catch (const std::exception& ex) {
                diagnostics.error(r.lineNumber, ex.what());
            }
            e.opcode = -1;
            e.operandValue = dataValue;
            e.machineWord = dataValue;
        } else {
            int rawValue = 0;
            try {
                rawValue = resolveOperand(r);
            } catch (const std::exception& ex) {
                diagnostics.error(r.lineNumber, ex.what());
            }
            int encOperand = computeEncodedOperand(r, rawValue);
            e.opcode = info.opcode;
            e.operandValue = encOperand;
            e.machineWord = util::encodeWord(info.opcode, encOperand);
        }

        out.push_back(e);
    }

    return out;
}

} // namespace simplex