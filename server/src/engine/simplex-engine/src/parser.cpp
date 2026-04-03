/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: parser.cpp
 */

#include "../include/parser.hpp"

using namespace std;
namespace simplex {

std::vector<SourceLine> Parser::parseFile(const std::string& path) const {
    std::ifstream in(path.c_str());
    if (!in) {
        throw std::runtime_error("Cannot open source file: " + path);
    }

    std::vector<SourceLine> lines;
    std::string raw;
    int lineNumber = 1;
    while (std::getline(in, raw)) {
        lines.push_back(lexer.analyze(raw, lineNumber));
        ++lineNumber;
    }
    return lines;
}

} // namespace simplex