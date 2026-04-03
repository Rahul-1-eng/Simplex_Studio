/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: emulator.cpp
 */

#include "../include/emulator.hpp"

using namespace std;
namespace simplex {

Emulator::Emulator() : opcodeTable(), memory(), cpu(opcodeTable) {}

bool Emulator::run(const std::string& objectPath, const std::string& tracePath, const std::string& dumpPath) {
    try {
        memory.reset();

        std::vector<ObjectWord> words = Loader::loadTextObject(objectPath);
        for (const ObjectWord& w : words) {
            memory.write(w.address, static_cast<int32_t>(w.machineWord));
        }

        cpu.run(memory);
        cpu.writeTrace(tracePath);
        memory.dump(dumpPath, 512);

        std::cout << "Emulation completed.\n";
        std::cout << "Trace: " << tracePath << "\n";
        std::cout << "Dump : " << dumpPath << "\n";
        std::cout << "Reason: " << cpu.getHaltReason() << "\n";
        return true;
    } catch (const std::exception& ex) {
        std::cerr << "Emulator error: " << ex.what() << "\n";
        return false;
    }
}

} // namespace simplex