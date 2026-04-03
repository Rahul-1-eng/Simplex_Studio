/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: intermediate_writer.hpp
 */

#ifndef INTERMEDIATE_WRITER_HPP
#define INTERMEDIATE_WRITER_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

class IntermediateWriter {
public:
    static void write(const std::string& path, const std::vector<IntermediateRecord>& records);
};

} // namespace simplex

#endif
