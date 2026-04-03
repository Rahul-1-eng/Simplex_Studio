/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: emulator.hpp
 */

#ifndef EMULATOR_HPP
#define EMULATOR_HPP

#include "cpu.hpp"
#include "loader.hpp"

namespace simplex {
using namespace std;

class Emulator {
private:
    OpcodeTable opcodeTable;
    Memory memory;
    CPU cpu;

public:
    Emulator();
    bool run(const std::string& objectPath, const std::string& tracePath, const std::string& dumpPath);
};

} // namespace simplex

#endif
