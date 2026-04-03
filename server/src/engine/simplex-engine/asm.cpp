/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: asm.cpp
 */

#include <iostream>
#include <string>

#include "include/assembler.hpp"

#include "src/utilities.cpp"
#include "src/diagnostics.cpp"
#include "src/opcode_table.cpp"
#include "src/lexer.cpp"
#include "src/parser.cpp"
#include "src/symbol_table.cpp"
#include "src/intermediate_writer.cpp"
#include "src/listing_writer.cpp"
#include "src/object_writer.cpp"
#include "src/assembler_pass1.cpp"
#include "src/assembler_pass2.cpp"
#include "src/assembler.cpp"

using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cerr << "Usage: asm <input.asm> <output_prefix> [-v|--verbose]\n";
        return 1;
    }

    bool verbose = false;
    string inputPath = argv[1];
    string outputPrefix = argv[2];

    if (argc >= 4) {
        string arg3 = argv[3];
        if (arg3 == "-v" || arg3 == "--verbose") {
            verbose = true;
        }
    }

    simplex::Assembler assembler;
    bool ok = assembler.assemble(inputPath, outputPrefix, verbose);
    return ok ? 0 : 1;
}
