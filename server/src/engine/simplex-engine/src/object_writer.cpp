/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: object_writer.cpp
 */

#include "../include/object_writer.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

void ObjectWriter::writeTextObject(const std::string& path, const std::vector<ObjectWord>& words) {
    std::ofstream out(path.c_str());
    for (const ObjectWord& w : words) {
        out << w.address << " " << w.machineWord << " " << w.mnemonic;
        if (!w.operandText.empty()) {
            out << " " << w.operandText;
        }
        out << "\n";
    }
}

void ObjectWriter::writeBinaryObject(const std::string& path, const std::vector<ObjectWord>& words) {
    std::ofstream out(path.c_str(), std::ios::binary);
    for (const ObjectWord& w : words) {
        int32_t address = static_cast<int32_t>(w.address);
        int32_t word = static_cast<int32_t>(w.machineWord);
        out.write(reinterpret_cast<const char*>(&address), sizeof(address));
        out.write(reinterpret_cast<const char*>(&word), sizeof(word));
    }
}

void ObjectWriter::writeSymbolTable(const std::string& path, const SymbolTable& table) {
    std::ofstream out(path.c_str());
    out << "SYMBOL           VALUE       DEFINED_AT    USED_AT\n";
    out << "------------------------------------------------------------\n";
    for (const auto& kv : table.all()) {
        const SymbolEntry& s = kv.second;
        std::vector<std::string> used;
        for (int x : s.usedAtLines) used.push_back(std::to_string(x));
        out << std::left << std::setw(16) << s.name
            << std::setw(12) << s.value
            << std::setw(14) << s.definedAtLine
            << simplex::util::join(used, ",") << "\n";
    }
}

} // namespace simplex