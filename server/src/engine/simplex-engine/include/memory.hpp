/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: memory.hpp
 */

#ifndef MEMORY_HPP
#define MEMORY_HPP

#include "common.hpp"
#include "constants.hpp"

namespace simplex {
using namespace std;

class Memory {
private:
    std::vector<int32_t> cells;

public:
    Memory();
    void reset();
    int32_t read(int address) const;
    void write(int address, int32_t value);
    int size() const;
    void dump(const std::string& path, int usedLimit = 256) const;
};

} // namespace simplex

#endif
