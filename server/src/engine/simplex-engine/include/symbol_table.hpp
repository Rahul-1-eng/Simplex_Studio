/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: symbol_table.hpp
 */

#ifndef SYMBOL_TABLE_HPP
#define SYMBOL_TABLE_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

class SymbolTable {
private:
    std::map<std::string, SymbolEntry> entries;

public:
    bool contains(const std::string& name) const;
    bool isDefined(const std::string& name) const;
    void define(const std::string& name, int value, int lineNumber);
    void markUse(const std::string& name, int lineNumber);
    int valueOf(const std::string& name) const;
    const std::map<std::string, SymbolEntry>& all() const;
};

} // namespace simplex

#endif
