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
// Test an analysis routine that does an fxsave/fxstore. 

#include <iostream>
#include <stdio.h>
#include "pin.H"

void my_print(int x)
{
#if defined(TARGET_IA32) || defined(TARGET_IA32E)
    static char buffer[2048];
    static char* aligned_bufp =reinterpret_cast<char*> 
                               (((reinterpret_cast<ADDRINT>(buffer) + 16) >> 4)<<4);

#if defined(PIN_GNU_COMPATIBLE)
    cerr << "Pin GNU compatible" << endl;
    asm volatile ("fxsave %0\n\t"
                  "emms"
                  : "=m"(*aligned_bufp));
#else
    __asm {
            push eax
            
            mov  eax, aligned_bufp
            fxsave [eax]
            
            pop eax
          }
#endif
#endif
    
    cerr << "my_print: " << x << endl;
    double y = x * 0.33445;
    cerr << "Done initializing y" << endl;
    cerr << y << endl;
    cerr << "Done with my_print" << endl;
    
#if defined(TARGET_IA32) || defined(TARGET_IA32E)
#if defined(PIN_GNU_COMPATIBLE)
    asm volatile ("fxrstor %0" :: "m"(*aligned_bufp));
#else
    __asm {
            push eax
            
            mov  eax, aligned_bufp
            fxrstor [eax]
            
            pop eax
          }
#endif
#endif
}

VOID ImageLoad(IMG img, VOID * v)
{
    RTN rtn;
    
    rtn = RTN_FindByName(img, "print");
    if (RTN_Valid(rtn))
    {
        RTN_Open(rtn);
        
        RTN_InsertCall(rtn, IPOINT_BEFORE,
                       (AFUNPTR)my_print,
                       IARG_FUNCARG_ENTRYPOINT_VALUE, 0,
                       IARG_END);

        RTN_Close(rtn);
    }
}

int main(int argc, char *argv[])
{
    PIN_InitSymbols();
    PIN_Init(argc, argv);
    
    IMG_AddInstrumentFunction(ImageLoad, 0);
    
    PIN_StartProgram();
    return 0;
}

