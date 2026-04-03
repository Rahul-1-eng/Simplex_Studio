/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: symbol_table.cpp
 */

#include "../include/symbol_table.hpp"

using namespace std;
namespace simplex {

bool SymbolTable::contains(const std::string& name) const {
    return entries.find(name) != entries.end();
}

bool SymbolTable::isDefined(const std::string& name) const {
    auto it = entries.find(name);
    return it != entries.end() && it->second.defined;
}

void SymbolTable::define(const std::string& name, int value, int lineNumber) {
    SymbolEntry& e = entries[name];
    e.name = name;
    e.value = value;
    e.defined = true;
    e.definedAtLine = lineNumber;
}

void SymbolTable::markUse(const std::string& name, int lineNumber) {
    SymbolEntry& e = entries[name];
    e.name = name;
    e.usedAtLines.push_back(lineNumber);
}

int SymbolTable::valueOf(const std::string& name) const {
    auto it = entries.find(name);
    if (it == entries.end() || !it->second.defined) {
        throw std::runtime_error("Undefined symbol: " + name);
    }
    return it->second.value;
}

const std::map<std::string, SymbolEntry>& SymbolTable::all() const {
    return entries;
}

} // namespace simplex