/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: loader.hpp
 */

#ifndef LOADER_HPP
#define LOADER_HPP

#include "common.hpp"

namespace simplex {
using namespace std;

class Loader {
public:
    static std::vector<ObjectWord> loadTextObject(const std::string& path);
};

} // namespace simplex

#endif
