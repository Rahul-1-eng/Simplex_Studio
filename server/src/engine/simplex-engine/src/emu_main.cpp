/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: emu_main.cpp
 */

#include "../include/emulator.hpp"

using namespace std;
int main(int argc, char* argv[]) {
    if (argc < 4) {
        std::cerr << "Usage: emu <input.o> <output.trace> <output.dump>\n";
        return 1;
    }

    simplex::Emulator emulator;
    bool ok = emulator.run(argv[1], argv[2], argv[3]);
    return ok ? 0 : 1;
}