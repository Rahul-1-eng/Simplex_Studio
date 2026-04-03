/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: loader.cpp
 */

#include "../include/loader.hpp"

using namespace std;
namespace simplex {

std::vector<ObjectWord> Loader::loadTextObject(const std::string& path) {
    std::ifstream in(path.c_str());
    if (!in) {
        throw std::runtime_error("Cannot open object file: " + path);
    }

    std::vector<ObjectWord> words;
    while (true) {
        ObjectWord w;
        if (!(in >> w.address >> w.machineWord >> w.mnemonic)) {
            break;
        }
        std::getline(in, w.operandText);
        if (!w.operandText.empty() && w.operandText[0] == ' ') {
            w.operandText.erase(w.operandText.begin());
        }
        words.push_back(w);
    }
    return words;
}

} // namespace simplex