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
// This tool demonstrates the use of the REGVAL struct and matching APIs.
// It is used with the regval_app application.

#include <fstream>
#include <cassert>
#include "pin.H"

using std::ofstream;


/////////////////////
// GLOBAL VARIABLES
/////////////////////

// A knob for defining the output file name
KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE, "pintool",
    "o", "regval.out", "specify output file name");

// ofstream object for handling the output
ofstream OutFile;

// We don't want to print the registers too many times, so we put placeholders in the application to tell the tool
// when to start and stop printing.
volatile bool printRegsNow = false;

#ifdef TARGET_MAC
const char* startRtnName = "_Start";
const char* stopRtnName = "_Stop";
#else
const char* startRtnName = "Start";
const char* stopRtnName = "Stop";
#endif


/////////////////////
// ANALYSIS FUNCTIONS
/////////////////////

// Once this is called, the registers will be printed until EndRoutine is called.
static void StartRoutine()
{
    printRegsNow = true;
}

// After this is called, the registers will no longer be printed.
static void StopRoutine()
{
    printRegsNow = false;
}

static void PrintRegisters(const CONTEXT * ctxt)
{
    if (!printRegsNow) return;
    for (int reg = (int)REG_GR_BASE; reg <= (int)REG_GR_LAST; ++reg)
    {
        REGVAL regval;
        PIN_GetContextRegval(ctxt, (REG)reg, &regval);
        UINT64 val;
        PIN_ReadRegvalQWord(&regval, &val, 0);
        OutFile << REG_StringShort((REG)reg) << ": 0x" << hex << val << endl;
    }
    for (int reg = (int)REG_ST_BASE; reg <= (int)REG_ST_LAST; ++reg)
    {
        REGVAL regval;
        PIN_GetContextRegval(ctxt, (REG)reg, &regval);
        UINT64 val[2]; // the x87 registers are 80-bit long,
        PIN_ReadRegvalQWord(&regval, &val[0], 0);
        PIN_ReadRegvalQWord(&regval, &val[1], 1);
        // print in reverse order since index zero specifies the least significant word
        OutFile << REG_StringShort((REG)reg) << ": 0x" << hex << val[1] << val[0] << endl;
    }
}


/////////////////////
// INSTRUMENTATION FUNCTIONS
/////////////////////

static VOID ImageLoad(IMG img, VOID * v)
{
    if (IMG_IsMainExecutable(img))
    {
        RTN StartRtn = RTN_FindByName(img, startRtnName);
        assert(RTN_Valid(StartRtn));
        RTN_Open(StartRtn);
        RTN_InsertCall(StartRtn, IPOINT_BEFORE, (AFUNPTR)StartRoutine, IARG_END);
        RTN_Close(StartRtn);

        RTN StopRtn = RTN_FindByName(img, stopRtnName);
        assert(RTN_Valid(StopRtn));
        RTN_Open(StopRtn);
        RTN_InsertCall(StopRtn, IPOINT_AFTER, (AFUNPTR)StopRoutine, IARG_END);
        RTN_Close(StopRtn);
    }
}

static VOID Trace(TRACE trace, VOID *v)
{
    TRACE_InsertCall(trace, IPOINT_BEFORE, (AFUNPTR)PrintRegisters, IARG_CONST_CONTEXT, IARG_END);
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
    TRACE_AddInstrumentFunction(Trace, 0);
    PIN_AddFiniFunction(Fini, 0);

    // Start running the application
    PIN_StartProgram(); // never returns

    return 0;
}
