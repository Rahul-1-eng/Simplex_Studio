/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: diagnostics.hpp
 */

#ifndef DIAGNOSTICS_HPP
#define DIAGNOSTICS_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

class Diagnostics {
private:
    std::vector<Diagnostic> items;

public:
    void add(const std::string& level, int lineNumber, const std::string& message);
    void error(int lineNumber, const std::string& message);
    void warning(int lineNumber, const std::string& message);
    bool hasErrors() const;
    int errorCount() const;
    int warningCount() const;
    const std::vector<Diagnostic>& all() const;
    void write(const std::string& path) const;
};

} // namespace simplex

#endif
