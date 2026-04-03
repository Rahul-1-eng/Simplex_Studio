/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: lexer.hpp
 */

#ifndef LEXER_HPP
#define LEXER_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

class Lexer {
public:
    SourceLine analyze(const std::string& rawLine, int lineNumber) const;
};

} // namespace simplex

#endif
