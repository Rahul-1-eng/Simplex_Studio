/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler_pass1.cpp
 */

#include "../include/assembler_pass1.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

AssemblerPass1::AssemblerPass1(const OpcodeTable& opcodeTable, SymbolTable& symbols, Diagnostics& diagnostics)
    : opcodeTable(opcodeTable), symbols(symbols), diagnostics(diagnostics) {}

std::vector<IntermediateRecord> AssemblerPass1::run(const std::vector<SourceLine>& source) {
    std::vector<IntermediateRecord> out;
    int lc = 0;

    for (const SourceLine& line : source) {
        if (line.empty) continue;

        if (line.hasLabel) {
            if (!util::isValidLabelName(line.label)) {
                diagnostics.error(line.lineNumber, "Invalid label name: " + line.label);
            } else if (symbols.isDefined(line.label)) {
                diagnostics.error(line.lineNumber, "Duplicate label definition: " + line.label);
            }
        }

        if (!line.hasMnemonic) {
            if (line.hasLabel && util::isValidLabelName(line.label) && !symbols.isDefined(line.label)) {
                symbols.define(line.label, lc, line.lineNumber);
            }
            continue;
        }

        if (!opcodeTable.exists(line.mnemonic)) {
            diagnostics.error(line.lineNumber, "Unknown mnemonic: " + line.mnemonic);
            continue;
        }

        const OpcodeInfo& info = opcodeTable.get(line.mnemonic);

        if (line.hasLabel && util::isValidLabelName(line.label) && !symbols.isDefined(line.label)) {
            if (info.isSet) {
                int val = 0;
                if (!line.hasOperand) {
                    diagnostics.error(line.lineNumber, "SET requires operand");
                } else if (!util::parseNumber(line.operand, val)) {
                    diagnostics.error(line.lineNumber, "SET operand is not a valid number");
                } else {
                    symbols.define(line.label, val, line.lineNumber);
                }
            } else {
                symbols.define(line.label, lc, line.lineNumber);
            }
        }

        if (info.takesOperand && !line.hasOperand) {
            diagnostics.error(line.lineNumber, "Missing operand for " + line.mnemonic);
        }

        if (!info.takesOperand && line.hasOperand) {
            diagnostics.error(line.lineNumber, "Unexpected operand for " + line.mnemonic);
        }

        if (line.hasExtra) {
            diagnostics.error(line.lineNumber, "Extra tokens after operand: " + util::join(line.extraTokens, " "));
        }

        if (line.hasOperand) {
            int val = 0;
            if (!util::parseNumber(line.operand, val)) {
                if (util::isValidLabelName(line.operand)) {
                    symbols.markUse(line.operand, line.lineNumber);
                } else {
                    diagnostics.error(line.lineNumber, "Invalid operand: " + line.operand);
                }
            }
        }

        IntermediateRecord rec;
        rec.lineNumber = line.lineNumber;
        rec.address = lc;
        rec.label = line.label;
        rec.mnemonic = line.mnemonic;
        rec.operand = line.operand;
        rec.raw = line.raw;
        rec.generatesWord = !info.isSet;
        rec.isDirective = info.isDirective;
        rec.isSet = info.isSet;
        out.push_back(rec);

        if (!info.isSet) {
            ++lc;
        }
    }

    for (const auto& kv : symbols.all()) {
        const SymbolEntry& s = kv.second;
        if (!s.defined) {
            diagnostics.error(s.usedAtLines.empty() ? 0 : s.usedAtLines.front(),
                              "Undefined symbol: " + s.name);
        }
    }

    return out;
}

} // namespace simplex