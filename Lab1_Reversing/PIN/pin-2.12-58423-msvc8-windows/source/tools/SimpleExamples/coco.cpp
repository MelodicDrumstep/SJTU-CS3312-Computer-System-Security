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
/*
  @ORIGINAL_AUTHOR: Robert Cohn
*/

/* ===================================================================== */
/*! @file
 *  This file contains a code coverage analyzer
 */



#include "pin.H"
#include <set>
#include <list>
#include <vector>
#include <iostream>
#include <fstream>


/* ===================================================================== */
/* Commandline Switches */
/* ===================================================================== */

KNOB<string> KnobOutputFile(KNOB_MODE_WRITEONCE,   "pintool",
    "o", "coco.out", "specify profile file name");
KNOB<BOOL>   KnobNoSharedLibs(KNOB_MODE_WRITEONCE, "pintool",
    "no_shared_libs", "0", "do not instrument shared libraries");

/* ===================================================================== */
/* Print Help Message                                                    */
/* ===================================================================== */

INT32 Usage()
{
    cerr <<
        "This pin tool computes code coverage\n"
        "\n";

    cerr << KNOB_BASE::StringKnobSummary() << endl;
    return -1;
}

/* ===================================================================== */
/* Global Variables */
/* ===================================================================== */

typedef UINT64 COUNTER;


class BBLSTATS
{
  public:
    BBLSTATS(ADDRINT start, USIZE size) : _start(start),_size(size),_executed(0) {};

    const ADDRINT _start;
    const USIZE _size;
    BOOL _executed;
};

list<const BBLSTATS*> statsList;

std::ofstream out;

/* ===================================================================== */

VOID docount(BOOL * counter)
{
    *counter = 1;
}

/* ===================================================================== */

VOID Trace(TRACE trace, VOID *v)
{
    if ( KnobNoSharedLibs.Value()
         && IMG_Type(SEC_Img(RTN_Sec(TRACE_Rtn(trace)))) == IMG_TYPE_SHAREDLIB)
        return;
    
    for (BBL bbl = TRACE_BblHead(trace); BBL_Valid(bbl); bbl = BBL_Next(bbl))
    {
        // Insert instrumentation to count the number of times the bbl is executed
        BBLSTATS * bblstats = new BBLSTATS(BBL_Address(bbl), BBL_Size(bbl));
        INS_InsertCall(BBL_InsHead(bbl), IPOINT_BEFORE, AFUNPTR(docount), IARG_PTR, &(bblstats->_executed), IARG_END);

        // Remember the counter and stats so we can compute a summary at the end
        statsList.push_back(bblstats);
    }
}

/* ===================================================================== */


/* ===================================================================== */

VOID Fini(int, VOID * v)
{   
    out << "# eof" <<  endl;
    out.close();
}

/* ===================================================================== */

VOID PrintUntouchedRanges(SEC sec)
{
    // Make a bool vector big enough to describe the whole section, 1 bool per byte
    vector<bool> touched(SEC_Size(sec));

    // Put the rtn's that are touched in a set
    set<RTN> rtnSet;

    // Mark the ranges for bbls that have been executed
    for (list<const BBLSTATS*>::const_iterator bi = statsList.begin(); bi != statsList.end(); bi++)
    {
        const BBLSTATS * stats = *bi;
        
        // Is this bbl contained in the section?
        if (stats->_start < SEC_Address(sec) || stats->_start >= SEC_Address(sec) + SEC_Size(sec))
            continue;
        
        // Is the bbl executed?
        if (!stats->_executed)
            continue;
        
        RTN rtn = RTN_FindByAddress(stats->_start);
        if (RTN_Valid(rtn))
            rtnSet.insert(rtn);
        
        // Mark all the bytes of the bbl as executed
        for (ADDRINT i = stats->_start - SEC_Address(sec); i < stats->_start + stats->_size - SEC_Address(sec); i++)
        {
            ASSERTX(i < SEC_Size(sec));
            
            touched[i] = true;
        }
    }

    // Print the routines that are not touched
    out << "    Routines that are not executed" << endl;
    for (RTN rtn = SEC_RtnHead(sec); RTN_Valid(rtn); rtn = RTN_Next(rtn))
    {
        if (rtnSet.find(rtn) == rtnSet.end())
        {
            out << "      " << RTN_Name(rtn) << endl;
        }
    }
    
    // Print the ranges of untouched addresses
    out << "    Code ranges that are not executed" << endl;
    string rtnName = "";
    for (UINT32 i = 0; i < SEC_Size(sec);)
    {
        // Find the first not touched address
        while(touched[i])
        {
            i++;
            
            if (i == SEC_Size(sec))
                return;
        }
        UINT32 start = i;
        
        // Find the first touched address
        while(!touched[i] && i < SEC_Size(sec)) i++;

        ADDRINT startAddress = SEC_Address(sec) + start;

        // Print the rtn name, if it has changed
        IMG img = IMG_FindByAddress(startAddress);
        string imgName = (IMG_Valid(img) ? IMG_Name(img) : "InvalidImg");
        RTN rtn = RTN_FindByAddress(startAddress);
        string newName = (RTN_Valid(rtn) ? RTN_Name(rtn) : "InvalidRtn");
        if (rtnName != newName)
        {
            out << " Image: " << imgName <<  "  Rtn: " << newName << endl;
            rtnName = newName;
        }

        out << "        " << SEC_Address(sec) + start << ":" << SEC_Address(sec) + i - 1 << endl;
    }
}
    

/* ===================================================================== */

VOID ImageUnload(IMG img, VOID * v)
{
    if ( KnobNoSharedLibs.Value()
         && IMG_Type(img) == IMG_TYPE_SHAREDLIB)
        return;
    
    out << "Image: " << IMG_Name(img) << endl;
    
    // Visit all the sections of the image that are executable
    for (SEC sec = IMG_SecHead(img); SEC_Valid(sec); sec = SEC_Next(sec))
    {
        if (SEC_Type(sec) != SEC_TYPE_EXEC)
            continue;
        
        out << "  Section: " << SEC_Name(sec) << endl;
        
        // Print the addresses of instructions that were not executed
        PrintUntouchedRanges(sec);
    }
}

/* ===================================================================== */
/* Main                                                                  */
/* ===================================================================== */

int main(int argc, CHAR *argv[])
{
    PIN_InitSymbols();

    if( PIN_Init(argc,argv) )
    {
        return Usage();
    }
    
    TRACE_AddInstrumentFunction(Trace, 0);

    PIN_AddFiniFunction(Fini, 0);

    IMG_AddUnloadFunction(ImageUnload, 0);

    out.open(KnobOutputFile.Value().c_str());
    out.setf(ios::showbase);
    out << hex;

    // Never returns

    PIN_StartProgram();
    
    return 0;
}

/* ===================================================================== */
/* eof */
/* ===================================================================== */
