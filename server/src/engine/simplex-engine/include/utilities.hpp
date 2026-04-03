/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: utilities.hpp
 */

#ifndef UTILITIES_HPP
#define UTILITIES_HPP

#include "common.hpp"

namespace simplex {
using namespace std;
namespace util {

std::string ltrim(const std::string& s);
std::string rtrim(const std::string& s);
std::string trim(const std::string& s);
std::string toLower(std::string s);
std::string toUpper(std::string s);
bool startsWith(const std::string& s, const std::string& prefix);
std::vector<std::string> splitWhitespace(const std::string& s);
bool isValidLabelName(const std::string& s);
bool parseNumber(const std::string& text, int& value);
std::string hex8(int32_t value);
int32_t signExtend24(int32_t value24);
int32_t encodeWord(int opcode, int operand);
int parseOpcodePart(int32_t word);
int parseOperandPart(int32_t word);
std::string join(const std::vector<std::string>& items, const std::string& sep);
void ensureDirectory(const std::string& path);

} // namespace util
} // namespace simplex

#endif
