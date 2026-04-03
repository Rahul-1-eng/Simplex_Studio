/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: listing_writer.cpp
 */

#include "../include/listing_writer.hpp"
#include "../include/utilities.hpp"

using namespace std;
namespace simplex {

void ListingWriter::write(
    const std::string& path,
    const std::vector<IntermediateRecord>& intermediate,
    const std::vector<EncodedRecord>& encoded,
    const Diagnostics& diagnostics
) {
    std::ofstream out(path.c_str());

    out << "ADDR      WORD      SOURCE\n";
    out << "----------------------------------------------\n";

    std::size_t j = 0;
    for (const IntermediateRecord& rec : intermediate) {
        if (rec.generatesWord) {
            if (j < encoded.size()) {
                out << util::hex8(encoded[j].address) << "  "
                    << util::hex8(encoded[j].machineWord) << "  "
                    << rec.raw << "\n";
                ++j;
            } else {
                out << util::hex8(rec.address) << "  ????????  " << rec.raw << "\n";
            }
        } else {
            out << util::hex8(rec.address) << "  ........  " << rec.raw << "\n";
        }
    }

    out << "\nDiagnostics\n";
    out << "----------------------------------------------\n";
    for (const Diagnostic& d : diagnostics.all()) {
        out << d.level << " line " << d.lineNumber << ": " << d.message << "\n";
    }
}

} // namespace simplex