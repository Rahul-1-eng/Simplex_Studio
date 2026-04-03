/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: diagnostics.cpp
 */

#include "../include/diagnostics.hpp"

using namespace std;

namespace simplex {

void Diagnostics::add(const std::string& level, int lineNumber, const std::string& message) {
    items.push_back(Diagnostic{level, lineNumber, message});
}

void Diagnostics::error(int lineNumber, const std::string& message) {
    add("ERROR", lineNumber, message);
}

void Diagnostics::warning(int lineNumber, const std::string& message) {
    add("WARNING", lineNumber, message);
}

bool Diagnostics::hasErrors() const {
    for (const Diagnostic& d : items) {
        if (d.level == "ERROR") return true;
    }
    return false;
}

int Diagnostics::errorCount() const {
    int c = 0;
    for (const Diagnostic& d : items) {
        if (d.level == "ERROR") ++c;
    }
    return c;
}

int Diagnostics::warningCount() const {
    int c = 0;
    for (const Diagnostic& d : items) {
        if (d.level == "WARNING") ++c;
    }
    return c;
}

const std::vector<Diagnostic>& Diagnostics::all() const {
    return items;
}

void Diagnostics::write(const std::string& path) const {
    std::ofstream out(path.c_str());

    out << "ASSEMBLER LOG FILE\n";
    out << "==================\n\n";

    if (items.empty()) {
        out << "Compiled successfully.\n";
        out << "Errors   : 0\n";
        out << "Warnings : 0\n";
        return;
    }

    out << "Errors   : " << errorCount() << "\n";
    out << "Warnings : " << warningCount() << "\n\n";

    for (const Diagnostic& d : items) {
        out << d.level << " line " << d.lineNumber << ": " << d.message << "\n";
    }

    if (!hasErrors()) {
        out << "\nCompiled successfully.\n";
        if (warningCount() > 0) {
            out << "Warnings only (no errors).\n";
        }
    } else {
        out << "\nCompilation failed due to errors.\n";
    }
}

} // namespace simplex