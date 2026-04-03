/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: listing_writer.hpp
 */

#ifndef LISTING_WRITER_HPP
#define LISTING_WRITER_HPP

#include "common.hpp"
#include "diagnostics.hpp"

namespace simplex {
using namespace std;

class ListingWriter {
public:
    static void write(
        const std::string& path,
        const std::vector<IntermediateRecord>& intermediate,
        const std::vector<EncodedRecord>& encoded,
        const Diagnostics& diagnostics
    );
};

} // namespace simplex

#endif
