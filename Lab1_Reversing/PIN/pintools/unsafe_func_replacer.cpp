    #include <pin.H>
    #include <iostream>
    #include <cstring>
    #include <stdarg.h>

    using namespace std;

    // Constants for string length limits and buffer sizes
    const size_t MAX_STRCPY_LENGTH = 10;
    const size_t MAX_STRCAT_LENGTH = 5;
    const size_t MAX_SPRINTF_LENGTH = 10;
    const size_t MAX_GETS_LENGTH = 20;
    const size_t MAX_SCANF_LENGTH = 20;
    const size_t FORMAT_BUFFER_SIZE = 256;
    const size_t FORMAT_BUFFER_LIMIT = 250;

    // Output file
    KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
        "o", "unsafe_func_replacer.out", "specify output file name");

    extern "C" {

    char* safe_strcpy(char* dest, const char* src) {
        cout << "[Replace] strcpy -> safe_strcpy" << endl;
        return strncpy(dest, src, MAX_STRCPY_LENGTH);
    }

    char* safe_strcat(char* dest, const char* src) {
        cout << "[Replace] strcat -> safe_strcat" << endl;
        return strncat(dest, src, MAX_STRCAT_LENGTH);
    }

    int safe_sprintf(char* dest, const char* fmt, ...) {
        cout << "[Replace] sprintf -> safe_sprintf" << endl;
        va_list args;
        va_start(args, fmt);
        int ret = _vsnprintf_s(dest, MAX_SPRINTF_LENGTH, _TRUNCATE, fmt, args);
        va_end(args);
        return ret;
    }

    char* safe_gets(char* s) {
        cout << "[Replace] gets -> safe_gets" << endl;
        return fgets(s, MAX_GETS_LENGTH, stdin);
    }

    int safe_scanf(const char* fmt, ...) {
        cout << "[Replace] scanf -> safe_scanf" << endl;
        char input[FORMAT_BUFFER_SIZE] = {0};
        
        // Read input safely using fgets
        if (fgets(input, FORMAT_BUFFER_SIZE, stdin) == NULL) {
            return EOF;
        }
        
        // Remove newline if present
        size_t len = strlen(input);
        if (len > 0 && input[len-1] == '\n') {
            input[len-1] = '\0';
        }
        
        // For simplicity, we'll only handle string input
        // This is a basic implementation that can be extended
        va_list args;
        va_start(args, fmt);
        char* dest = va_arg(args, char*);
        strncpy(dest, input, MAX_SCANF_LENGTH);
        va_end(args);
        
        return 1; // Return number of items successfully read
    }
}

    VOID ImageLoad(IMG img, VOID *v)
    {
        RTN rtn;

        rtn = RTN_FindByName(img, "strcpy");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "Replace strcpy in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_strcpy));
        }

        rtn = RTN_FindByName(img, "strcat");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "Replace strcat in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_strcat));
        }

        rtn = RTN_FindByName(img, "sprintf");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "Replace sprintf in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_sprintf));
        }

        rtn = RTN_FindByName(img, "gets");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "Replace gets in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_gets));
        }

        rtn = RTN_FindByName(img, "scanf");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "Replace scanf in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_scanf));
        }
    }

    VOID Fini(INT32 code, VOID *v) {}

    INT32 Usage() {
        cout << "This tool replaces unsafe C functions with safe versions." << endl;
        cout << KNOB_BASE::StringKnobSummary() << endl;
        return -1;
    }

    int main(int argc, char *argv[]) {
        PIN_InitSymbols();
        if (PIN_Init(argc, argv)) return Usage();
        IMG_AddInstrumentFunction(ImageLoad, 0);
        PIN_AddFiniFunction(Fini, 0);
        PIN_StartProgramProbed();
        return 0;
    } 