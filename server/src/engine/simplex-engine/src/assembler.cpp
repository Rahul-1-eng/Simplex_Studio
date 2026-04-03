/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: assembler.cpp
 */

#include "../include/assembler.hpp"
#include "../include/utilities.hpp"

using namespace std;

namespace simplex {

bool Assembler::assemble(const std::string& inputPath, const std::string& outputPrefix, bool verbose) {
    util::ensureDirectory("outputs");

    if (verbose) std::cout << "[asm] Input: " << inputPath << " output: " << outputPrefix << "\n";

    std::vector<SourceLine> source;
    try {
        source = parser.parseFile(inputPath);
    } catch (const std::exception& ex) {
        std::cerr << "Assembler error: " << ex.what() << "\n";
        return false;
    }

    if (verbose) std::cout << "[asm] Running pass1\n";
    AssemblerPass1 pass1(opcodeTable, symbols, diagnostics);
    std::vector<IntermediateRecord> intermediate = pass1.run(source);

    if (verbose) std::cout << "[asm] Running pass2\n";
    AssemblerPass2 pass2(opcodeTable, symbols, diagnostics);
    std::vector<EncodedRecord> encoded = pass2.run(intermediate);

    if (verbose) std::cout << "[asm] Generating object words\n";
    std::vector<ObjectWord> objectWords;
    for (const EncodedRecord& e : encoded) {
        objectWords.push_back(ObjectWord{e.address, e.machineWord, e.mnemonic, e.operandText});
    }

    IntermediateWriter::write(outputPrefix + ".int", intermediate);
    ListingWriter::write(outputPrefix + ".lst", intermediate, encoded, diagnostics);
    ObjectWriter::writeTextObject(outputPrefix + ".o", objectWords);
    ObjectWriter::writeBinaryObject(outputPrefix + ".bin", objectWords);
    ObjectWriter::writeSymbolTable(outputPrefix + ".sym", symbols);
    diagnostics.write(outputPrefix + ".log");

if (diagnostics.hasErrors()) {
    std::cout << "Compilation failed.\n";
    std::cout << "Errors   : " << diagnostics.errorCount() << "\n";
    std::cout << "Warnings : " << diagnostics.warningCount() << "\n";
    std::cout << "Check log file: " << outputPrefix << ".log\n";
    return false;
}

std::cout << "Compiled successfully.\n";
std::cout << "Errors   : 0\n";
std::cout << "Warnings : " << diagnostics.warningCount() << "\n";
std::cout << "Generated files:\n";
std::cout << "  " << outputPrefix << ".int\n";
std::cout << "  " << outputPrefix << ".lst\n";
std::cout << "  " << outputPrefix << ".sym\n";
std::cout << "  " << outputPrefix << ".log\n";
std::cout << "  " << outputPrefix << ".o\n";
std::cout << "  " << outputPrefix << ".bin\n";
return true;

} 
}// namespace simplex
