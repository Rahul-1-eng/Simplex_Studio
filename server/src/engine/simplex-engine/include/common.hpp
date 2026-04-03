/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: common.hpp
 */

#ifndef COMMON_HPP
#define COMMON_HPP

#include <algorithm>
#include <cctype>
#include <cstdint>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <map>
#include <set>
#include <sstream>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

namespace simplex {
using namespace std;

struct SourceLine {
    int lineNumber = 0;
    std::string raw;
    std::string codePart;
    std::string commentPart;
    std::string label;
    std::string mnemonic;
    std::string operand;
    bool empty = false;
    bool commentOnly = false;
    bool hasLabel = false;
    bool hasMnemonic = false;
    bool hasOperand = false;
    bool hasExtra = false;
    std::vector<std::string> extraTokens;
};

struct IntermediateRecord {
    int lineNumber = 0;
    int address = 0;
    std::string label;
    std::string mnemonic;
    std::string operand;
    std::string raw;
    bool generatesWord = false;
    bool isDirective = false;
    bool isSet = false;
};

struct EncodedRecord {
    int lineNumber = 0;
    int address = 0;
    std::string label;
    std::string mnemonic;
    std::string operandText;
    int operandValue = 0;
    int opcode = 0;
    int machineWord = 0;
    bool generatesWord = false;
    std::string raw;
};

struct SymbolEntry {
    std::string name;
    int value = 0;
    bool defined = false;
    int definedAtLine = 0;
    std::vector<int> usedAtLines;
};

struct Diagnostic {
    std::string level;
    int lineNumber = 0;
    std::string message;
};

struct ObjectWord {
    int address = 0;
    int machineWord = 0;
    std::string mnemonic;
    std::string operandText;
};

} // namespace simplex

#endif
