#include <pin.H>
#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <cstring>

using namespace std;

// Output file
KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
    "o", "unsafe_func_replacer.out", "specify output file name");

// Map of unsafe functions to their safe versions
std::map<string, string> unsafeToSafeMap = {
    {"strcpy", "strcpy_s"},
    {"strcat", "strcat_s"},
    {"sprintf", "sprintf_s"},
    {"scanf", "scanf_s"},
    {"gets", "gets_s"}
};

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
    OutFile << "Replacing unsafe function: " << funcName << " with " << unsafeToSafeMap[funcName] << std::endl;
    
    if (funcName == "strcpy") {
        char* dest = (char*)args[0];
        const char* src = (const char*)args[1];
        size_t destSize = 0;
        
        // Try to get destination buffer size
        if (args[2]) {
            destSize = (size_t)args[2];
        } else {
            // If size cannot be determined, use a safe value
            destSize = 1024;
        }
        
        strcpy_s_safe(dest, destSize, src);
    }
    else if (funcName == "strcat") {
        char* dest = (char*)args[0];
        const char* src = (const char*)args[1];
        size_t destSize = 0;
        
        if (args[2]) {
            destSize = (size_t)args[2];
        } else {
            destSize = 1024;
        }
        
        strcat_s_safe(dest, destSize, src);
    }
    else if (funcName == "sprintf") {
        char* dest = (char*)args[0];
        const char* format = (const char*)args[1];
        size_t destSize = 0;
        
        if (args[2]) {
            destSize = (size_t)args[2];
        } else {
            destSize = 1024;
        }
        
        sprintf_s_safe(dest, destSize, format);
    }
    else if (funcName == "gets") {
        char* dest = (char*)args[0];
        size_t destSize = 0;
        
        if (args[1]) {
            destSize = (size_t)args[1];
        } else {
            destSize = 1024;
        }
        
        gets_s_safe(dest, destSize);
    }
}

// Instruction instrumentation callback
VOID Instruction(INS ins, VOID *v) {
    if (INS_IsCall(ins)) {
        // Get call target address
        ADDRINT target = INS_Address(ins);
        RTN rtn = RTN_FindByAddress(target);
        
        if (RTN_Valid(rtn)) {
            string funcName = RTN_Name(rtn);
            if (unsafeToSafeMap.find(funcName) != unsafeToSafeMap.end()) {
                // Insert our replacement function before the call
                INS_InsertCall(ins, IPOINT_BEFORE, (AFUNPTR)ReplaceUnsafeFunction,
                             IARG_ADDRINT, target,
                             IARG_PTR, new string(funcName),
                             IARG_FUNCARG_ENTRYPOINT_REFERENCE, 0,
                             IARG_FUNCARG_ENTRYPOINT_REFERENCE, 1,
                             IARG_FUNCARG_ENTRYPOINT_REFERENCE, 2,
                             IARG_END);
            }
        }
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
    if (PIN_Init(argc, argv)) return Usage();
    
    OutFile.open(KnobOutputFile.Value().c_str());
    
    INS_AddInstrumentFunction(Instruction, 0);
    PIN_AddFiniFunction(Fini, 0);
    
    PIN_StartProgram();
    
    return 0;
} 