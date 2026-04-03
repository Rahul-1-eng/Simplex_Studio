/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: memory.cpp
 */

#include "../include/memory.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

Memory::Memory() : cells(MEMORY_SIZE, 0) {}

void Memory::reset() {
    std::fill(cells.begin(), cells.end(), 0);
}

int32_t Memory::read(int address) const {
    if (address < 0 || address >= static_cast<int>(cells.size())) {
        throw std::runtime_error("Memory read out of range: " + std::to_string(address));
    }
    return cells[address];
}

void Memory::write(int address, int32_t value) {
    if (address < 0 || address >= static_cast<int>(cells.size())) {
        throw std::runtime_error("Memory write out of range: " + std::to_string(address));
    }
    cells[address] = value;
}

int Memory::size() const {
    return static_cast<int>(cells.size());
}

void Memory::dump(const std::string& path, int usedLimit) const {
    std::ofstream out(path.c_str());
    int limit = std::min(usedLimit, static_cast<int>(cells.size()));
    for (int i = 0; i < limit; ++i) {
        out << util::hex8(i) << " " << util::hex8(cells[i]) << "\n";
    }
}

} // namespace simplex