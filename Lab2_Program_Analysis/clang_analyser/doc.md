# CryptoStreamChecker - A Clang Static Analyzer Plugin

## Overview
CryptoStreamChecker is a static analysis plugin for Clang that detects potential security vulnerabilities in cryptographic code. It helps identify common cryptographic misuses and insecure practices in C/C++ code.

## Features
- Detects null key usage in encryption functions
- Identifies usage of deprecated cryptographic functions
- Analyzes cryptographic API usage patterns
- Provides detailed bug reports with source locations

## Requirements
- Clang/LLVM (version 15.0.0 or later)
- CMake (version 3.10 or later)
- C++ compiler with C++17 support

## Installation
1. Clone the LLVM repository with this plugin

2. Create a build directory:
```bash
mkdir build && cd build
```

3. Configure and build:
```bash
cmake ..
make -j 12 # (or ninja -j 12)
```

## Usage
To analyze your code using CryptoStreamChecker:

```bash
./build/bin/clang -cc1 -load ./build/lib/CryptoStreamCheckerPlugin.so -analyze -analyzer-checker=plugin.CryptoStreamChecker example.cpp
```

### Command Line Options
- `-cc1`: Run the compiler frontend
- `-load`: Load the plugin
- `-analyze`: Enable static analysis
- `-analyzer-checker`: Specify the checker to use

## Bug Types Detected
1. **Null Key Usage**
   - Detects when encryption functions are called with null keys
   - Severity: High
   - Example: `encrypt(data, nullptr)`

2. **Deprecated Crypto Functions**
   - Identifies usage of deprecated or unsafe cryptographic functions
   - Severity: Medium
   - Example: `deprecated_crypto()`