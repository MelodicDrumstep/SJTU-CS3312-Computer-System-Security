    #include <pin.H>
    #include <iostream>
    #include <cstring>
    #include <stdarg.h>

    using namespace std;

    // Output file
    KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
        "o", "unsafe_func_replacer.out", "specify output file name");

    // 安全实现（签名必须和原函数一致）
    extern "C" {

    char* safe_strcpy(char* dest, const char* src) {
        cout << "[替换] strcpy -> safe_strcpy" << endl;
        return strncpy(dest, src, 10);
    }

    char* safe_strcat(char* dest, const char* src) {
        cout << "[替换] strcat -> safe_strcat" << endl;
        return strncat(dest, src, 10);
    }

    int safe_sprintf(char* dest, const char* fmt, ...) {
        cout << "[替换] sprintf -> safe_sprintf" << endl;
        va_list args;
        va_start(args, fmt);
        int ret = _vsnprintf_s(dest, 10, _TRUNCATE, fmt, args);
        va_end(args);
        return ret;
    }

    char* safe_gets(char* s) {
        cout << "[替换] gets -> safe_gets" << endl;
        return fgets(s, 10, stdin);
    }
    }

    VOID ImageLoad(IMG img, VOID *v)
    {
        RTN rtn;

        rtn = RTN_FindByName(img, "strcpy");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "替换 strcpy in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_strcpy));
        }

        rtn = RTN_FindByName(img, "strcat");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "替换 strcat in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_strcat));
        }

        rtn = RTN_FindByName(img, "sprintf");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "替换 sprintf in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_sprintf));
        }

        rtn = RTN_FindByName(img, "gets");
        if (RTN_Valid(rtn) && RTN_IsSafeForProbedReplacement(rtn)) {
            cout << "替换 gets in " << IMG_Name(img) << endl;
            RTN_ReplaceProbed(rtn, AFUNPTR(safe_gets));
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