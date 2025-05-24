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
        cout << "[Replace] strcpy -> safe_strcpy" << endl;
        return strncpy(dest, src, 10);
    }

    char* safe_strcat(char* dest, const char* src) {
        cout << "[Replace] strcat -> safe_strcat" << endl;
        return strncat(dest, src, 10);
    }

    int safe_sprintf(char* dest, const char* fmt, ...) {
        cout << "[Replace] sprintf -> safe_sprintf" << endl;
        va_list args;
        va_start(args, fmt);
        int ret = _vsnprintf_s(dest, 10, _TRUNCATE, fmt, args);
        va_end(args);
        return ret;
    }

    char* safe_gets(char* s) {
        cout << "[Replace] gets -> safe_gets" << endl;
        return fgets(s, 10, stdin);
    }

    int safe_scanf(const char* fmt, ...) {
        cout << "[Replace] scanf -> safe_scanf" << endl;
        char newfmt[256] = {0};
        int j = 0;
        for (int i = 0; fmt[i] && j < 250; ++i) {
            if (fmt[i] == '%' && fmt[i+1] == 's') {
                newfmt[j++] = '%';
                newfmt[j++] = '9';
                newfmt[j++] = 's';
                ++i;
            } else {
                newfmt[j++] = fmt[i];
            }
        }
        newfmt[j] = 0;

        va_list args;
        va_start(args, fmt);
        int ret = vscanf(newfmt, args);
        va_end(args);
        return ret;
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