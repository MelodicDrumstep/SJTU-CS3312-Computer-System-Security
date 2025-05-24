#include <pin.H>
#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <cstring>
#include <stdarg.h>

using namespace std;

// Output file
KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
    "o", "unsafe_func_replacer.out", "specify output file name");

// Map of unsafe functions to their safe versions
std::map<string, string> unsafeToSafeMap;

// Initialize the map in main function
void InitializeUnsafeToSafeMap() {
    unsafeToSafeMap.insert(std::make_pair("strcpy", "strcpy_s"));
    unsafeToSafeMap.insert(std::make_pair("strcat", "strcat_s"));
    unsafeToSafeMap.insert(std::make_pair("sprintf", "sprintf_s"));
    unsafeToSafeMap.insert(std::make_pair("scanf", "scanf_s"));
    unsafeToSafeMap.insert(std::make_pair("gets", "fgets"));
}

// File to record replaced function calls
std::ofstream OutFile;

// Safe version of strcpy_s implementation
size_t strcpy_s_safe(char* dest, size_t destSize, const char* src) {
    if (!dest || !src || destSize == 0) {
        OutFile << "Error: Invalid parameters in strcpy_s" << std::endl;
        return 0;
    }
    
    size_t srcLen = strlen(src);
    if (srcLen >= destSize) {
        OutFile << "Error: Buffer overflow prevented in strcpy_s" << std::endl;
        dest[0] = '\0';
        return 0;
    }
    
    strncpy(dest, src, destSize - 1);
    dest[destSize - 1] = '\0';
    return srcLen;
}

// Safe version of strcat_s implementation
size_t strcat_s_safe(char* dest, size_t destSize, const char* src) {
    if (!dest || !src || destSize == 0) {
        OutFile << "Error: Invalid parameters in strcat_s" << std::endl;
        return 0;
    }
    
    size_t destLen = strlen(dest);
    size_t srcLen = strlen(src);
    
    if (destLen + srcLen >= destSize) {
        OutFile << "Error: Buffer overflow prevented in strcat_s" << std::endl;
        return 0;
    }
    
    strncat(dest, src, destSize - destLen - 1);
    return destLen + srcLen;
}

// Safe version of sprintf_s implementation
int sprintf_s_safe(char* dest, size_t destSize, const char* format, ...) {
    if (!dest || !format || destSize == 0) {
        OutFile << "Error: Invalid parameters in sprintf_s" << std::endl;
        return -1;
    }
    
    va_list args;
    va_start(args, format);
    int result = vsnprintf(dest, destSize, format, args);
    va_end(args);
    
    if (result < 0 || (size_t)result >= destSize) {
        OutFile << "Error: Buffer overflow prevented in sprintf_s" << std::endl;
        dest[0] = '\0';
        return -1;
    }
    
    return result;
}

// Safe version of scanf_s implementation
int scanf_s_safe(const char* format, ...) {
    if (!format) {
        OutFile << "Error: Invalid format string in scanf_s" << std::endl;
        return -1;
    }
    
    va_list args;
    va_start(args, format);
    int result = scanf(format, va_arg(args, char*));  // 只处理第一个参数
    va_end(args);
    
    if (result < 0) {
        OutFile << "Error: scanf_s failed" << std::endl;
    }
    
    return result;
}

// Safe version of gets_s implementation
char* gets_s_safe(char* dest, size_t destSize) {
    if (!dest || destSize == 0) {
        OutFile << "Error: Invalid parameters in gets_s" << std::endl;
        return NULL;
    }
    
    if (fgets(dest, destSize, stdin) == NULL) {
        return NULL;
    }
    
    // Remove newline if present
    size_t len = strlen(dest);
    if (len > 0 && dest[len-1] == '\n') {
        dest[len-1] = '\0';
    }
    
    return dest;
}

// Function replacement callback
VOID ReplaceUnsafeFunction(ADDRINT funcAddr, const string& funcName, ADDRINT* args) {
    OutFile << "==========================================" << std::endl;
    OutFile << "Function Replacement Detected:" << std::endl;
    OutFile << "  Unsafe Function: " << funcName << std::endl;
    OutFile << "  Safe Version: " << unsafeToSafeMap[funcName] << std::endl;
    OutFile << "  Function Address: 0x" << std::hex << funcAddr << std::dec << std::endl;
    
    if (funcName == "strcpy") {
        char* dest = (char*)args[0];
        const char* src = (const char*)args[1];
        OutFile << "  Parameters:" << std::endl;
        OutFile << "    Destination: " << (dest ? dest : "NULL") << std::endl;
        OutFile << "    Source: " << (src ? src : "NULL") << std::endl;
        strcpy_s_safe(dest, strlen(dest) + 1, src);
    }
    else if (funcName == "strcat") {
        char* dest = (char*)args[0];
        const char* src = (const char*)args[1];
        OutFile << "  Parameters:" << std::endl;
        OutFile << "    Destination: " << (dest ? dest : "NULL") << std::endl;
        OutFile << "    Source: " << (src ? src : "NULL") << std::endl;
        size_t destSize = strlen(dest) + strlen(src) + 1;
        strcat_s_safe(dest, destSize, src);
    }
    else if (funcName == "sprintf") {
        char* dest = (char*)args[0];
        const char* format = (const char*)args[1];
        OutFile << "  Parameters:" << std::endl;
        OutFile << "    Destination: " << (dest ? dest : "NULL") << std::endl;
        OutFile << "    Format: " << (format ? format : "NULL") << std::endl;
        size_t destSize = strlen(dest) + 1;
        sprintf_s_safe(dest, destSize, format);
    }
    else if (funcName == "scanf") {
        const char* format = (const char*)args[0];
        OutFile << "  Parameters:" << std::endl;
        OutFile << "    Format: " << (format ? format : "NULL") << std::endl;
        scanf_s_safe(format);
    }
    else if (funcName == "gets") {
        char* dest = (char*)args[0];
        OutFile << "  Parameters:" << std::endl;
        OutFile << "    Destination: " << (dest ? dest : "NULL") << std::endl;
        size_t destSize = strlen(dest) + 1;
        gets_s_safe(dest, destSize);
    }
    
    OutFile << "  Replacement Completed" << std::endl;
    OutFile << "==========================================" << std::endl;
}

// ImageLoad callback
VOID ImageLoad(IMG img, VOID *v) {
    // 替换 strcpy
    RTN rtn = RTN_FindByName(img, "strcpy");
    if (RTN_Valid(rtn)) {
        OutFile << "替换 strcpy in " << IMG_Name(img) << endl;
        RTN_Replace(rtn, AFUNPTR(ReplaceUnsafeFunction));
    }
    // 替换 strcat
    rtn = RTN_FindByName(img, "strcat");
    if (RTN_Valid(rtn)) {
        OutFile << "替换 strcat in " << IMG_Name(img) << endl;
        RTN_Replace(rtn, AFUNPTR(ReplaceUnsafeFunction));
    }
    // 替换 sprintf
    rtn = RTN_FindByName(img, "sprintf");
    if (RTN_Valid(rtn)) {
        OutFile << "替换 sprintf in " << IMG_Name(img) << endl;
        RTN_Replace(rtn, AFUNPTR(ReplaceUnsafeFunction));
    }
    // 替换 gets
    rtn = RTN_FindByName(img, "gets");
    if (RTN_Valid(rtn)) {
        OutFile << "替换 gets in " << IMG_Name(img) << endl;
        RTN_Replace(rtn, AFUNPTR(ReplaceUnsafeFunction));
    }
}

// Program finish callback
VOID Fini(INT32 code, VOID *v) {
    OutFile.close();
}

// Program initialization
INT32 Usage() {
    std::cerr << "This tool detects and replaces unsafe function calls with their safe versions." << std::endl;
    std::cerr << std::endl << KNOB_BASE::StringKnobSummary() << std::endl;
    return -1;
}

int main(int argc, char *argv[]) {
    PIN_InitSymbols();
    if (PIN_Init(argc, argv)) return Usage();
    
    OutFile.open(KnobOutputFile.Value().c_str());
    
    // Initialize the map
    InitializeUnsafeToSafeMap();
    
    IMG_AddInstrumentFunction(ImageLoad, 0);
    PIN_AddFiniFunction(Fini, 0);
    
    PIN_StartProgram();
    
    return 0;
} 