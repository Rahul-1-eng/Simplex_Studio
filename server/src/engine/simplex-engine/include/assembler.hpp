/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler.hpp
 */

#ifndef ASSEMBLER_HPP
#define ASSEMBLER_HPP

#include "assembler_pass1.hpp"
#include "assembler_pass2.hpp"
#include "intermediate_writer.hpp"
#include "listing_writer.hpp"
#include "object_writer.hpp"
#include "parser.hpp"

namespace simplex {
using namespace std;

class Assembler {
private:
    OpcodeTable opcodeTable;
    SymbolTable symbols;
    Diagnostics diagnostics;
    Parser parser;

public:
    bool assemble(const std::string& inputPath, const std::string& outputPrefix, bool verbose = false);
};

} // namespace simplex

#endif
