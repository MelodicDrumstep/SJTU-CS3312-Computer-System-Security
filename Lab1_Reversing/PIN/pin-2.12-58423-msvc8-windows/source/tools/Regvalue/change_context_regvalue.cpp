/*BEGIN_LEGAL 
Intel Open Source License 

Copyright (c) 2002-2013 Intel Corporation. All rights reserved.
 
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are
met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.  Redistributions
in binary form must reproduce the above copyright notice, this list of
conditions and the following disclaimer in the documentation and/or
other materials provided with the distribution.  Neither the name of
the Intel Corporation nor the names of its contributors may be used to
endorse or promote products derived from this software without
specific prior written permission.
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
``AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE INTEL OR
ITS CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
END_LEGAL */
#include <fstream>
#include <cstring>
#include "context_utils.h"
#include "regvalues.h"

using std::ofstream;


/////////////////////
// GLOBAL VARIABLES
/////////////////////

// A knob for defining which context to test. One of:
// 1. default   - regular CONTEXT passed to the analysis routine using IARG_CONTEXT.
// 2. partial   - partial CONTEXT passed to the analysis routine using IARG_PARTIAL_CONTEXT.
KNOB<string> KnobTestContext(KNOB_MODE_WRITEONCE, "pintool",
    "testcontext", "default", "specify which context to test. One of default|partial.");

// A knob for defining the output file name
KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
    "o", "change_context_regvalue.out", "specify output file name");

// ofstream object for handling the output
ofstream OutFile;

const unsigned char* agprptr = NULL;
const unsigned char* astptr = NULL;
#ifdef TARGET_MIC
const unsigned char* azmmptr = NULL;
const unsigned char* akptr = NULL;
#else
const unsigned char* axmmptr = NULL;
const unsigned char* aymmptr = NULL;
#endif


/////////////////////
// ANALYSIS FUNCTIONS
/////////////////////

static void ReplaceChangeRegs(CONTEXT * ctxt)
{
    OutFile << "Context values before they are changed" << endl;
    StoreContext(ctxt);
    PrintStoredRegisters(OutFile);
    ModifyContext(ctxt);
}

static void ReplaceChangeRegsAndExecute(CONTEXT * ctxt, ADDRINT executeAtAddr)
{
    ReplaceChangeRegs(ctxt);
    PIN_SetContextReg(ctxt, REG_INST_PTR, executeAtAddr);
    PIN_ExecuteAt(ctxt);
}

#ifdef TARGET_MIC
static void ToolSaveAppPointers(void * gprptr, void * stptr, void * zmmptr, void * kptr)
{
    agprptr = (const unsigned char*)gprptr;
    astptr = (const unsigned char*)stptr;
    azmmptr = (const unsigned char*)zmmptr;
    akptr = (const unsigned char*)kptr;
}
#else
static void ToolSaveAppPointers(void * gprptr, void * stptr, void * xmmptr, void * ymmptr)
{
    agprptr = (const unsigned char*)gprptr;
    astptr = (const unsigned char*)stptr;
    axmmptr = (const unsigned char*)xmmptr;
    aymmptr = (const unsigned char*)ymmptr;
}
#endif

static void ChecksAfter(CONTEXT * ctxt)
{
    StoreContext(ctxt);
    PrintStoredRegisters(OutFile);
#ifdef TARGET_MIC
    bool success = CheckExpectedValues(agprptr, astptr, azmmptr, akptr, OutFile);
#else
    bool success = CheckExpectedValues(agprptr, astptr, axmmptr, aymmptr, OutFile);
#endif
    if (!success)
    {
        OutFile << "ERROR: values mismatch" << endl << flush;
        PIN_ExitApplication(1); // never returns
    }
}

/////////////////////
// INSTRUMENTATION FUNCTIONS
/////////////////////

static VOID ImageLoad(IMG img, VOID * v)
{
    if (IMG_IsMainExecutable(img))
    {
        // Find the application's modified values in memory
        RTN SaveAppPointersRtn = RTN_FindByName(img, "SaveAppPointers");
        assert(RTN_Valid(SaveAppPointersRtn));
        RTN_Open(SaveAppPointersRtn);
        RTN_InsertCall(SaveAppPointersRtn, IPOINT_BEFORE, AFUNPTR(ToolSaveAppPointers),
                                                          IARG_FUNCARG_ENTRYPOINT_VALUE, 0,
                                                          IARG_FUNCARG_ENTRYPOINT_VALUE, 1,
                                                          IARG_FUNCARG_ENTRYPOINT_VALUE, 2,
                                                          IARG_FUNCARG_ENTRYPOINT_VALUE, 3,
                                                          IARG_END);
        RTN_Close(SaveAppPointersRtn);

        // Find the placeholder for PIN_ExecuteAt
        RTN executeAtRtn = RTN_FindByName(img, "ExecuteAt");
        assert(RTN_Valid(executeAtRtn));

        // Instrument ChangeRegs
        RTN changeRegsRtn = RTN_FindByName(img, "ChangeRegs");
        assert(RTN_Valid(changeRegsRtn));
        RTN_Open(changeRegsRtn);
        if (KnobTestContext.Value() == "default")
        {
            RTN_InsertCall(changeRegsRtn, IPOINT_AFTER, AFUNPTR(ReplaceChangeRegsAndExecute),
                                                        IARG_CONTEXT,
                                                        IARG_ADDRINT, RTN_Address(executeAtRtn),
                                                        IARG_END);
        }
        else if (KnobTestContext.Value() == "partial")
        {
            REGSET regsin = GetTestRegset();
            REGSET regsout = GetTestRegset();
            RTN_InsertCall(changeRegsRtn, IPOINT_AFTER, AFUNPTR(ReplaceChangeRegs),
                                                        IARG_PARTIAL_CONTEXT, &regsin, &regsout,
                                                        IARG_END);
        }
        else
        {
            OutFile << "ERROR: Unknown context requested for testing: " << KnobTestContext.Value() << endl;
            PIN_ExitApplication(2); // never returns
        }
        RTN_Close(changeRegsRtn);

        // Instrument SaveRegsToMem
        RTN SaveRegsToMemRtn = RTN_FindByName(img, "SaveRegsToMem");
        assert(RTN_Valid(SaveRegsToMemRtn));
        RTN_Open(SaveRegsToMemRtn);
        RTN_InsertCall(SaveRegsToMemRtn, IPOINT_AFTER, AFUNPTR(ChecksAfter), IARG_CONTEXT, IARG_END);
        RTN_Close(SaveRegsToMemRtn);
    }
}

static VOID Fini(INT32 code, VOID *v)
{
    OutFile.close();
}


/////////////////////
// MAIN FUNCTION
/////////////////////

int main(int argc, char * argv[])
{
    // Initialize Pin
    PIN_InitSymbols();
    PIN_Init(argc, argv);

    // Open the output file
    OutFile.open(KnobOutputFile.Value().c_str());

    // Add instrumentation
    IMG_AddInstrumentFunction(ImageLoad, 0);
    PIN_AddFiniFunction(Fini, 0);

    // Start running the application
    PIN_StartProgram(); // never returns

    return 0;
}
