/*
 * SIMPLEX Assembler and Emulator
 * CS2206 Systems Programming Mini Project
 * Author: Rahul Kumar Sahoo
 * User ID: 2401CS09
 * Declaration of authorship: This file is part of my CS2206 SIMPLEX assembler-emulator mini project submission.
 * File: utilities.cpp
 */

#include "../include/utilities.hpp"

using namespace std;
#ifdef _WIN32
#include <direct.h>
#else
#include <sys/stat.h>
#endif

namespace simplex {
namespace util {

std::string ltrim(const std::string& s) {
    std::size_t i = 0;
    while (i < s.size() && std::isspace(static_cast<unsigned char>(s[i]))) {
        ++i;
    }
    return s.substr(i);
}

std::string rtrim(const std::string& s) {
    std::size_t j = s.size();
    while (j > 0 && std::isspace(static_cast<unsigned char>(s[j - 1]))) {
        --j;
    }
    return s.substr(0, j);
}

std::string trim(const std::string& s) {
    return rtrim(ltrim(s));
}

std::string toLower(std::string s) {
    for (char& c : s) {
        c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
    }
    return s;
}

std::string toUpper(std::string s) {
    for (char& c : s) {
        c = static_cast<char>(std::toupper(static_cast<unsigned char>(c)));
    }
    return s;
}

bool startsWith(const std::string& s, const std::string& prefix) {
    return s.size() >= prefix.size() && s.substr(0, prefix.size()) == prefix;
}

std::vector<std::string> splitWhitespace(const std::string& s) {
    std::stringstream ss(s);
    std::vector<std::string> out;
    std::string token;
    while (ss >> token) {
        out.push_back(token);
    }
    return out;
}

bool isValidLabelName(const std::string& s) {
    if (s.empty()) return false;
    if (!std::isalpha(static_cast<unsigned char>(s[0])) && s[0] != '_') return false;
    for (char c : s) {
        if (!std::isalnum(static_cast<unsigned char>(c)) && c != '_') return false;
    }
    return true;
}

bool parseNumber(const std::string& text, int& value) {
    std::string s = trim(text);
    if (s.empty()) return false;

    int sign = 1;
    if (s[0] == '+') {
        s = s.substr(1);
    } else if (s[0] == '-') {
        sign = -1;
        s = s.substr(1);
    }

    if (s.empty()) return false;

    int base = 10;
    if (s.size() > 2 && s[0] == '0' && (s[1] == 'x' || s[1] == 'X')) {
        base = 16;
        s = s.substr(2);
        if (s.empty()) return false;
        for (char c : s) {
            if (!std::isxdigit(static_cast<unsigned char>(c))) return false;
        }
    } else if (s.size() > 1 && s[0] == '0') {
        base = 8;
        for (char c : s) {
            if (c < '0' || c > '7') return false;
        }
    } else {
        for (char c : s) {
            if (!std::isdigit(static_cast<unsigned char>(c))) return false;
        }
    }

    long long temp = 0;
    std::stringstream ss;
    if (base == 16) ss << std::hex;
    else if (base == 8) ss << std::oct;
    else ss << std::dec;
    ss << s;
    ss >> temp;
    if (ss.fail()) return false;

    temp *= sign;
    value = static_cast<int>(temp);
    return true;
}

std::string hex8(int32_t value) {
    std::ostringstream out;
    out << std::uppercase << std::hex << std::setw(8) << std::setfill('0')
        << static_cast<uint32_t>(value);
    return out.str();
}

int32_t signExtend24(int32_t value24) {
    if (value24 & 0x00800000) {
        value24 |= 0xFF000000;
    }
    return value24;
}

int32_t encodeWord(int opcode, int operand) {
    int32_t op24 = operand & 0x00FFFFFF;
    return (op24 << 8) | (opcode & 0xFF);
}

int parseOpcodePart(int32_t word) {
    return word & 0xFF;
}

int parseOperandPart(int32_t word) {
    int32_t raw24 = static_cast<int32_t>((static_cast<uint32_t>(word) >> 8) & 0x00FFFFFF);
    return signExtend24(raw24);
}

std::string join(const std::vector<std::string>& items, const std::string& sep) {
    std::ostringstream out;
    for (std::size_t i = 0; i < items.size(); ++i) {
        if (i) out << sep;
        out << items[i];
    }
    return out.str();
}

void ensureDirectory(const std::string& path) {
#ifdef _WIN32
    _mkdir(path.c_str());
#else
    mkdir(path.c_str(), 0777);
#endif
}

} // namespace util
} // namespace simplex