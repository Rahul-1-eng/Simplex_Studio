/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: parser.hpp
 */

#ifndef PARSER_HPP
#define PARSER_HPP

#include "common.hpp"
#include "lexer.hpp"

namespace simplex {
using namespace std;

class Parser {
private:
    Lexer lexer;

public:
    std::vector<SourceLine> parseFile(const std::string& path) const;
};

} // namespace simplex

#endif
