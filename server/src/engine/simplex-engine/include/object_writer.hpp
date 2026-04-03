/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: object_writer.hpp
 */

#ifndef OBJECT_WRITER_HPP
#define OBJECT_WRITER_HPP

#include "common.hpp"
#include "symbol_table.hpp"

namespace simplex {
using namespace std;

class ObjectWriter {
public:
    static void writeTextObject(const std::string& path, const std::vector<ObjectWord>& words);
    static void writeBinaryObject(const std::string& path, const std::vector<ObjectWord>& words);
    static void writeSymbolTable(const std::string& path, const SymbolTable& table);
};

} // namespace simplex

#endif
