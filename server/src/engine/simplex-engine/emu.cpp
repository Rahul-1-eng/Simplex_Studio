/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: emu.cpp
 */

#include <iostream>
#include <string>

#include "include/emulator.hpp"

#include "src/utilities.cpp"
#include "src/diagnostics.cpp"
#include "src/opcode_table.cpp"
#include "src/loader.cpp"
#include "src/memory.cpp"
#include "src/cpu.cpp"
#include "src/emulator.cpp"

using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 4) {
        cerr << "Usage: emu <input.o> <output.trace> <output.dump>\n";
        return 1;
    }

    string objectPath = argv[1];
    string tracePath = argv[2];
    string dumpPath = argv[3];

    simplex::Emulator emulator;
    bool ok = emulator.run(objectPath, tracePath, dumpPath);
    return ok ? 0 : 1;
}
