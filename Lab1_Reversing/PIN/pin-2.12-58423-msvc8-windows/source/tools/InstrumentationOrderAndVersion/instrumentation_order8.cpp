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
#include <iostream>
#include <fstream>
#include <assert.h>
#include "pin.H"


#include "instrumentation_order_app.h"



static ofstream outstream("instrumentation_order8.out");
    


void Emit(char const* message)
{
    outstream << message << endl;
}

static VOID Trace(TRACE trace, VOID *v)
{
    RTN rtn = TRACE_Rtn(trace);
    
    if (!RTN_Valid(rtn) || RTN_Name(rtn) != watch_rtn)
    {
        return;
    }

    if (TRACE_Address(trace) == RTN_Address(rtn)) 
    {
        INS ins = BBL_InsHead(TRACE_BblHead(trace));
        INS_InsertCall(ins, IPOINT_BEFORE, AFUNPTR(Emit),
                             IARG_PTR, "Trace instrumentation", IARG_CALL_ORDER, CALL_ORDER_FIRST+1, IARG_END);
        printf("Trace Instrumenting %s\n", watch_rtn);
    }
}


static VOID Ins(INS ins, VOID *v)
{
    RTN rtn = INS_Rtn(ins);
    
    if (!RTN_Valid(rtn) || RTN_Name(rtn) != watch_rtn)
    {
        return;
    }

    if (INS_Address(ins) == RTN_Address(rtn)) 
    {
        INS_InsertCall(ins, IPOINT_BEFORE, AFUNPTR(Emit),
                       IARG_PTR, "Ins instrumentation", IARG_CALL_ORDER, CALL_ORDER_FIRST, IARG_END);
        printf("Ins Instrumenting %s\n", watch_rtn);
    }
}


static VOID Rtn(RTN rtn, VOID *v)
{
    if (!RTN_Valid(rtn) || RTN_Name(rtn) != watch_rtn)
    {
        return;
    }
    printf("Rtn Instrumenting %s\n", watch_rtn);
    RTN_Open(rtn);
    INS ins = RTN_InsHeadOnly(rtn);
    ASSERTX (INS_Valid(ins));
    
    INS_InsertCall(ins, IPOINT_BEFORE, AFUNPTR(Emit),
                             IARG_PTR, "RTN instrumentation",  IARG_CALL_ORDER, CALL_ORDER_FIRST+3, IARG_END);
    RTN_Close(rtn);
}

static VOID Image(IMG img, VOID *v)
{
    RTN rtn = RTN_FindByName(img, watch_rtn);

    if (!RTN_Valid(rtn))
    {
        return;
    }
    printf("Image Instrumenting %s\n", watch_rtn);
    RTN_Open(rtn);
    INS ins = RTN_InsHeadOnly(rtn);
    ASSERTX (INS_Valid(ins));
    
    INS_InsertCall(ins, IPOINT_BEFORE, AFUNPTR(Emit),
                             IARG_PTR, "IMG instrumentation",  IARG_CALL_ORDER, CALL_ORDER_FIRST+2, IARG_END);
    RTN_Close(rtn);
    
}

static VOID Fini(INT32 code, VOID *v)
{
    outstream.close();
}

int main(int argc, char * argv[])
{
    PIN_InitSymbols();
    PIN_Init(argc, argv);

    TRACE_AddInstrumentFunction(Trace, 0);

    INS_AddInstrumentFunction(Ins, 0);

    RTN_AddInstrumentFunction(Rtn, 0);

    IMG_AddInstrumentFunction(Image, 0);

    PIN_AddFiniFunction(Fini, 0);

    // Start the program, never returns
    PIN_StartProgram();
    
    return 0;
}
