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
/*
 * This tool just tests that the bufferring code writes the correct length
 * objects into the buffer. It only executes one instruction from the target
 * program before exiting...
 * 
 */
#include "pin.H"
#include <iostream>
#include <stdio.h>
#include <stddef.h>

/*
 * Data file
 */
FILE *outfile;
PIN_LOCK fileLock;
TLS_KEY buf_key;


/*
 * The ID of the buffer
 */
BUFFER_ID bufId;

/*
 * Number of OS pages for the buffer
 */
#define NUM_BUF_PAGES 1

/*
 * 
 */
struct bufferEntry
{
    BOOL    bool0; /* We check that we see the right values for both of these */
    BOOL    bool1;
    UINT32  word0;
    UINT32  word1;
};

/**************************************************************************
 *
 *  Instrumentation routines
 *
 **************************************************************************/


/*
 * Insert code to generate buffer fill. We just instrument one instruction, and then quit.
 */
VOID Instruction(INS ins, VOID *v)
{
    static BOOL first = TRUE;
    
    if (first)
    {
        INS_InsertFillBuffer(ins, IPOINT_BEFORE, bufId,
                             IARG_BOOL, FALSE, offsetof(struct bufferEntry, bool0),
                             IARG_BOOL, TRUE, offsetof(struct bufferEntry, bool1),
                             IARG_UINT32, 0, offsetof(struct bufferEntry, word0),
                             IARG_UINT32, -1, offsetof(struct bufferEntry, word1),
                             IARG_END);

        first = FALSE;
    }
}

/**************************************************************************
 *
 *  Callback Routines
 *
 **************************************************************************/

/*!
 * Called when a buffer fills up, or the thread exits, so we can process it or pass it off
 * as we see fit.
 * @param[in] id		buffer handle
 * @param[in] tid		id of owning thread
 * @param[in] ctxt		application context
 * @param[in] buf		actual pointer to buffer
 * @param[in] numElements	number of records
 * @param[in] v			callback value
 * @return  A pointer to the buffer to resume filling.
 */
VOID * BufferFull(BUFFER_ID id, THREADID tid, const CONTEXT *ctxt, VOID *buf,
                  UINT64 numElements, VOID *v)
{
    GetLock(&fileLock, 1);

    /* Check that the values are the ones we expect. */
    struct bufferEntry * b = (struct bufferEntry *)buf;

    fprintf(outfile, "Bool0 : %d should be 0\n", (int) b->bool0);
    fprintf(outfile, "Bool1 : %d should be 1\n", (int) b->bool1);
    fprintf(outfile, "Word0 : %d should be 0\n", (int) b->word0);
    fprintf(outfile, "Word1 : %d should be 1\n", (int) b->word1);
    

    if ((b->bool0 == FALSE) && (b->bool1 == TRUE) &&
        (b->word0 == 0) && (b->word1 == (UINT32)-1))
    {
        fprintf(outfile, "Test passed\n");
     }
    else
    {
        fprintf(outfile, "Test failed\n");
     }
    fflush(outfile);
    ReleaseLock(&fileLock);

    return buf;
}

/*!
 * Print out analysis results.
 * This function is called when the application exits.
 * @param[in]   code            exit code of the application
 * @param[in]   v               value specified by the tool in the 
 *                              PIN_AddFiniFunction function call
 */
VOID Fini(INT32 code, VOID *v)
{
    GetLock(&fileLock, 1);
    fprintf(outfile, "eof\n");
    fclose(outfile);
    ReleaseLock(&fileLock);
}

void ThreadStart(THREADID tid, CONTEXT * context, int flags, void * v)
{
    // We check that we got the right thing in the buffer full callback
    PIN_SetThreadData(buf_key, PIN_GetBufferPointer(context, bufId), tid);
}


/**************************************************************************
 *
 *  Main
 *
 **************************************************************************/
/*!
 *  Print out help message.
 */
INT32 Usage()
{
    cerr << "This tool checks argument passing into a buffer." << endl << endl;
    return -1;
}

/*!
 * The main procedure of the tool.
 * This function is called when the application image is loaded but not yet started.
 * @param[in]   argc            total number of elements in the argv array
 * @param[in]   argv            array of command line arguments,
 *                              including pin -t <toolname> -- ...
 */
int main(int argc, char *argv[])
{
    // Initialize PIN library. Print help message if -h(elp) is specified
    // in the command line or the command line is invalid
    if( PIN_Init(argc,argv) )
    {
        return Usage();
    }
    
    // Initialize the memory reference buffer;
    // set up the callback to process the buffer.
    //
    bufId = PIN_DefineTraceBuffer(sizeof(struct bufferEntry), NUM_BUF_PAGES,
                                  BufferFull, 0);
    
    if(bufId == BUFFER_ID_INVALID)
    {
        cerr << "Error: could not allocate initial buffer" << endl;
        return 1;
    }

    
    outfile = fopen("buffer-lengths.out", "w");
    if(!outfile){
        cerr << "Couldn't open buffer-lengths.out" << endl;
        return 1;
    }

    InitLock(&fileLock);

    // add an instrumentation function
    INS_AddInstrumentFunction(Instruction, 0);

    // Register function to be called when the application exits
    PIN_AddFiniFunction(Fini, 0);

    buf_key = PIN_CreateThreadDataKey(0);
    PIN_AddThreadStartFunction(ThreadStart, 0);
    
    // Start the program, never returns
    PIN_StartProgram();
    
    return 0;
}
