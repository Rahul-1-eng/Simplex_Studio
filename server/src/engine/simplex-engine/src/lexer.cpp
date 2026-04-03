/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: lexer.cpp
 */

#include "../include/lexer.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

SourceLine Lexer::analyze(const std::string& rawLine, int lineNumber) const {
    SourceLine line;
    line.lineNumber = lineNumber;
    line.raw = rawLine;

    std::string working = rawLine;
    std::size_t pos = working.find(';');
    if (pos != std::string::npos) {
        line.commentPart = working.substr(pos);
        line.codePart = working.substr(0, pos);
    } else {
        line.codePart = working;
    }

    line.codePart = util::trim(line.codePart);

    if (line.codePart.empty()) {
        line.empty = true;
        line.commentOnly = !line.commentPart.empty();
        return line;
    }

    std::string core = line.codePart;
    std::size_t colon = core.find(':');
    if (colon != std::string::npos) {
        line.label = util::trim(core.substr(0, colon));
        line.hasLabel = !line.label.empty();
        core = util::trim(core.substr(colon + 1));
    }

    if (core.empty()) {
        return line;
    }

    std::vector<std::string> parts = util::splitWhitespace(core);
    if (!parts.empty()) {
        line.mnemonic = util::toLower(parts[0]);
        line.hasMnemonic = true;
    }
    if (parts.size() >= 2) {
        line.operand = parts[1];
        line.hasOperand = true;
    }
    if (parts.size() > 2) {
        line.hasExtra = true;
        for (std::size_t i = 2; i < parts.size(); ++i) {
            line.extraTokens.push_back(parts[i]);
        }
    }

    return line;
}

} // namespace simplex