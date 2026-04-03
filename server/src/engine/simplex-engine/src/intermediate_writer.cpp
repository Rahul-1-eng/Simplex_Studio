/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: intermediate_writer.cpp
 */

#include "../include/intermediate_writer.hpp"

using namespace std;
namespace simplex {

void IntermediateWriter::write(const std::string& path, const std::vector<IntermediateRecord>& records) {
    std::ofstream out(path.c_str());
    out << "LINE  ADDR      LABEL           MNEMONIC    OPERAND         RAW\n";
    out << "--------------------------------------------------------------------------\n";
    for (const IntermediateRecord& r : records) {
        out << std::setw(4) << r.lineNumber << "  "
            << std::setw(8) << r.address << "  "
            << std::left << std::setw(14) << r.label
            << std::left << std::setw(12) << r.mnemonic
            << std::left << std::setw(16) << r.operand
            << r.raw << "\n";
    }
}

} // namespace simplex