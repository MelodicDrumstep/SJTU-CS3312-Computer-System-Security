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


/* ===================================================================== */
/*! @file
  Replace an original function with a custom function defined in the tool. The
  new function can have either the same or different signature from that of its
  original function.
*/

/* ===================================================================== */
#include "pin.H"
#include <iostream>
#include <stdlib.h>

using namespace std;

/* ===================================================================== */
static void (*pf_bar)();

/* ===================================================================== */
VOID Boo(  CONTEXT * ctxt, AFUNPTR pf_Blue )
{
    cout << "Jitting Blue() with no arguments; application address: " << hex <<
        (unsigned long)pf_Blue << dec << endl;

    PIN_CallApplicationFunction( ctxt, PIN_ThreadId(), CALLINGSTD_DEFAULT,
                                 pf_Blue, PIN_PARG_END() );
    
    cout << "Returned from Blue(); Native execution. " << endl;
}


/* ===================================================================== */
VOID ImageLoad(IMG img, VOID *v)
{
    if ( IMG_IsMainExecutable( img ))
    {
        PROTO proto = PROTO_Allocate( PIN_PARG(void), CALLINGSTD_DEFAULT,
                                      "Bar", PIN_PARG_END() );
        VOID * pf_Blue;
        
        RTN rtn1 = RTN_FindByName(img, "Blue");
        if (RTN_Valid(rtn1))
            pf_Blue = reinterpret_cast<VOID *>(RTN_Address(rtn1));
        else
        {
            cout << "Blue1 cannot be found." << endl;
            exit(1);
        }
        
        RTN rtn = RTN_FindByName(img, "Bar");
        if (RTN_Valid(rtn))
        {
            cout << "Replacing " << RTN_Name(rtn) << " in " << IMG_Name(img) << endl;
            
            pf_bar = (void (*)())RTN_ReplaceSignature(
                rtn, AFUNPTR(Boo),
                IARG_PROTOTYPE, proto,
                IARG_CONTEXT,
                IARG_PTR, pf_Blue,
                IARG_END);
            
        }    
        PROTO_Free( proto );
    }
}

/* ===================================================================== */
int main(INT32 argc, CHAR *argv[])
{
    PIN_InitSymbols();

    PIN_Init(argc, argv);

    IMG_AddInstrumentFunction(ImageLoad, 0);
    
    PIN_StartProgram();

    return 0;
}

/* ===================================================================== */
/* eof */
/* ===================================================================== */

