# Unsafe Function Replacer PIN Tool

## Overview
The Unsafe Function Replacer is a PIN tool designed to enhance program security by replacing unsafe C functions with their safer alternatives. This tool intercepts and replaces potentially dangerous functions like `strcpy`, `strcat`, `sprintf`, `gets`, and `scanf` with safer versions that implement proper bounds checking.

## Features
- Replaces unsafe string functions with safer alternatives:
  - `strcpy` → `safe_strcpy` (using `strncpy` with length limit)
  - `strcat` → `safe_strcat` (using `strncat` with length limit)
  - `sprintf` → `safe_sprintf` (using `_vsnprintf_s` with length limit)
  - `gets` → `safe_gets` (using `fgets` with length limit)
  - `scanf` → `safe_scanf` (modifying format string to limit string input)

## Usage
```bash
pin -t unsafe_func_replacer.so -- <target_program> [program_args]
```

### Options
- `-o <filename>`: Specify output file name (default: unsafe_func_replacer.out)

## Implementation Details
The tool uses PIN's probe mode to replace unsafe functions at runtime. Each replacement function:
- Logs when it is called
- Implements proper bounds checking
- Limits string operations to prevent buffer overflows
- Maintains the original function's behavior while adding safety checks

## Example Output
When the tool intercepts unsafe function calls, it will output messages like:
```
[Replace] strcpy -> safe_strcpy
[Replace] strcat -> safe_strcat
[Replace] sprintf -> safe_sprintf
[Replace] gets -> safe_gets
[Replace] scanf -> safe_scanf
```

## Security Considerations
- The tool provides basic protection against buffer overflow attacks
- String operations are limited to 10 characters by default
- Format string vulnerabilities are mitigated in scanf operations
- All unsafe functions are replaced with bounds-checked versions

## Limitations
- The tool only protects against the specified unsafe functions
- The 10-character limit is a default value and may need adjustment for specific use cases
- Some programs may not work correctly if they rely on the unsafe behavior of these functions
