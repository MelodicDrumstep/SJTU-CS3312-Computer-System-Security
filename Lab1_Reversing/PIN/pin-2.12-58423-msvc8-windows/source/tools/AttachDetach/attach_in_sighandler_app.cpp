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
// @ORIGINAL_AUTHOR: Elena Demikhovsky

/*! @file
 *  This application attaches Pin in the middle of signal handler.
 * The test verifies RT signal frame save/restore inside Pin
 */
#include <assert.h>
#include <stdio.h>
#include <dlfcn.h>
#include <signal.h>
#include <sys/types.h>
#include <unistd.h>
#include <fstream>
#include <iostream>
#include <sys/wait.h>
#include <stdlib.h>
#include <string.h>
#include <string>
#include <list>
#if defined(TARGET_ANDROID)
#include "android_ucontext.h"
#else
#include <ucontext.h>
#endif
#include <sched.h>
#include <sys/utsname.h>
#include <sys/syscall.h>


using namespace std;

list <string> pinArgs;

/*
 * Get thread Id
 */
pid_t GetTid()
{
     return syscall(__NR_gettid);
}

volatile bool sigHandled = false;

const long xmm1_app = 0x1111;
const long xmm2_app = 0x2222;
const long xmm3_app = 0x3333;

const long xmm1_sig = 0x4444;
const long xmm2_sig = 0x5555;
const long xmm3_sig = 0x6666;

extern "C" void SetXmmRegs(long v1, long v2, long v3);
extern "C" void GetXmmRegs(long *v1, long *v2, long *v3);

#ifdef TARGET_IA32
struct fxsave
{
    unsigned short _fcw;
    unsigned short _fsw;
    unsigned char  _ftw;
    unsigned char  _pad1;
    unsigned short _fop;
    unsigned int _fpuip;
    unsigned short _cs;
    unsigned short _pad2;
    unsigned int _fpudp;
    unsigned short _ds;
    unsigned short _pad3;
    unsigned int _mxcsr;
    unsigned int _mxcsrmask;
    unsigned char  _st[8 * 16];
    unsigned char  _xmm[8 * 16];
    unsigned char  _pad4[56 * 4];
};

struct KernelFpstate
{
    struct _libc_fpstate _fpregs_mem;   // user-visible FP register state (_mcontext points to this)
    struct fxsave _fxsave;           // full FP state as saved by fxsave instruction
};
#else
struct fxsave 
{
    unsigned short   _cwd;
    unsigned short   _swd;
    unsigned short   _twd;    /* Note this is not the same as the 32bit/x87/FSAVE twd */
    unsigned short   _fop;
    unsigned long    _rip;
    unsigned long    _rdp;
    unsigned int     _mxcsr;
    unsigned int     _mxcsrmask;
    unsigned int     _st[32];   /* 8*16 bytes for each FP-reg */
    unsigned char    _xmm[16 * 16];  /* 16*16 bytes for each XMM-reg  */
    unsigned int     _reserved2[24];
};

struct KernelFpstate
{
    struct fxsave _fxsave;   // user-visible FP register state (_mcontext points to this)
};

#endif

void AttachAndInstrument();
extern "C" int ThreadsReady(unsigned int numOfThreads)
{
    return 0;
}
    
void SigUsr1Handler(int signum, siginfo_t *siginfo, void *uctxt)
{    
    AttachAndInstrument();
    
    // Give enough time for all threads to get started 
    while (!ThreadsReady(1))
    {
        sched_yield();
    }
    ucontext_t *frameContext = (ucontext_t *)uctxt;
    
    fpregset_t fpPtr = frameContext->uc_mcontext.fpregs;
    
    KernelFpstate *appFpState = reinterpret_cast < KernelFpstate * > (fpPtr);
    
    long appContextXmm1 = 0;
    memcpy(&appContextXmm1, appFpState->_fxsave._xmm+16, sizeof(appContextXmm1));
    long appContextXmm2 = 0;
    memcpy(&appContextXmm2, appFpState->_fxsave._xmm+32, sizeof(appContextXmm2));
    long appContextXmm3 = 0;
    memcpy(&appContextXmm3, appFpState->_fxsave._xmm+48, sizeof(appContextXmm3));
    
    if ((appContextXmm1 != xmm1_app) || (appContextXmm2 != xmm2_app) || (appContextXmm3 != xmm3_app))
    {
        cerr << "Unexpected xmm values in signal handler: " << hex << endl; 
        cerr << "xmm1 = " << appContextXmm1 << ", Expected " << xmm1_app << endl;
        cerr << "xmm2 = " << appContextXmm2 << ", Expected " << xmm1_app << endl;
        cerr << "xmm3 = " << appContextXmm3 << ", Expected " << xmm1_app << endl;
        exit(-1);
    }

    memcpy(appFpState->_fxsave._xmm+16, &xmm1_sig, sizeof(xmm1_sig));
    memcpy(appFpState->_fxsave._xmm+32, &xmm2_sig, sizeof(xmm2_sig));
    memcpy(appFpState->_fxsave._xmm+48, &xmm3_sig, sizeof(xmm3_sig));
            
    sigHandled = true;
}

void SigUsr2Handler(int signum)
{    
    AttachAndInstrument();
    
    // Give enough time for all threads to get started 
    while (!ThreadsReady(1))
    {
        sched_yield();
    }
    sigHandled = true;
}


#define DECSTR(buf, num) { buf = (char *)malloc(10); sprintf(buf, "%d", num); }

inline void PrintArguments(char **inArgv)
{
    fprintf(stderr, "Going to run: ");
    for(unsigned int i=0; inArgv[i] != 0; ++i)
    {
        fprintf(stderr, "%s ", inArgv[i]);
    }
    fprintf(stderr, "\n");
}


/* AttachAndInstrument()
 * a special routine that runs $PIN
 */
void AttachAndInstrument()
{
    list <string >::iterator pinArgIt = pinArgs.begin();

    string pinBinary = *pinArgIt;
    pinArgIt++;

    pid_t parent_pid = getpid();
    
    pid_t child = fork();

    if (child) 
    {
        fprintf(stderr, "Pin injector pid %d\n", child);
        // inside parent
        return;  
    }
    else
    {
        // inside child

        char **inArgv = new char*[pinArgs.size()+10];

        unsigned int idx = 0;
        inArgv[idx++] = (char *)pinBinary.c_str(); 
        inArgv[idx++] = (char*)"-pid"; 
        inArgv[idx] = (char *)malloc(10);
        sprintf(inArgv[idx++], "%d", parent_pid);

        for (; pinArgIt != pinArgs.end(); pinArgIt++)
        {
            inArgv[idx++]= (char *)pinArgIt->c_str();
        }
        inArgv[idx] = 0;
        
        PrintArguments(inArgv);

        execvp(inArgv[0], inArgv);
        fprintf(stderr, "ERROR: execv %s failed\n", inArgv[0]);
        kill(parent_pid, 9);
        return; 
    }
}


/*
 * Expected command line: <this exe> [-test NUM] -pin $PIN -pinarg <pin args > -t tool <tool args>
 */

void ParseCommandLine(int argc, char *argv[], list < string>* pinArgs, unsigned int *testNo)
{
    string pinBinary;
    for (int i=1; i<argc; i++)
    {
        string arg = string(argv[i]);
        if (arg == "-test")
        {
            *testNo = atoi(argv[++i]);
        }
        else if (arg == "-pin")
        {
            pinBinary = argv[++i];
        }
        else if (arg == "-pinarg")
        {
            for (int parg = ++i; parg < argc; parg++)
            {
                pinArgs->push_back(string(argv[parg]));
                ++i;
            }
        }
    }
    assert(!pinBinary.empty());
    pinArgs->push_front(pinBinary);
}

int TestRtSigframe();
int TestSigframe();

int main(int argc, char *argv[])
{
    unsigned int testNo = 0;
    ParseCommandLine(argc, argv, &pinArgs, &testNo);
    
    if (testNo == 0)
    {
        return TestRtSigframe();
    }
    else
    {
        return TestSigframe();
    }
    return 0;
}
   
int TestRtSigframe()
{
    struct sigaction sSigaction;
    
    /* Register the signal hander using the siginfo interface*/
    sSigaction.sa_sigaction = SigUsr1Handler;
    sSigaction.sa_flags = SA_SIGINFO;
    
    /* mask all other signals */
    sigfillset(&sSigaction.sa_mask);
    
    int ret = sigaction(SIGUSR1, &sSigaction, NULL);
    if(ret) 
    {
        perror("ERROR, sigaction failed");
        exit(-1);
    }

    SetXmmRegs(xmm1_app, xmm2_app, xmm3_app);
    kill(getpid(), SIGUSR1);
    
    while (!sigHandled)
    {
        sched_yield();
    }
    
    long xmm1, xmm2, xmm3;
    GetXmmRegs(&xmm1, &xmm2, &xmm3);
    
    if ((xmm1 != xmm1_sig) || (xmm2 != xmm2_sig) || (xmm3 != xmm3_sig))
    {
        cerr << "Unexpected xmm values after return from signal handler: " << hex << endl; 
        cerr << "xmm1 = " << xmm1 << ", Expected " << xmm1_sig << endl;
        cerr << "xmm2 = " << xmm2 << ", Expected " << xmm2_sig << endl;
        cerr << "xmm3 = " << xmm3 << ", Expected " << xmm3_sig << endl;
        return -1;
    }
    cout << "All xmm values are correct" << endl;

    return 0;
}

int TestSigframe()
{
    signal(SIGUSR2, SigUsr2Handler);
    
    SetXmmRegs(xmm1_app, xmm2_app, xmm3_app);
    kill(getpid(), SIGUSR2);
    
    while (!sigHandled)
    {
        sched_yield();
    }
    long xmm1, xmm2, xmm3;
    GetXmmRegs(&xmm1, &xmm2, &xmm3);
    
    if ((xmm1 != xmm1_app) || (xmm2 != xmm2_app) || (xmm3 != xmm3_app))
    {
        cerr << "Unexpected xmm values after return from signal handler: " << hex << endl; 
        cerr << "xmm1 = " << xmm1 << ", Expected " << xmm1_app << endl;
        cerr << "xmm2 = " << xmm2 << ", Expected " << xmm2_app << endl;
        cerr << "xmm3 = " << xmm3 << ", Expected " << xmm3_app << endl;
        return -1;
    }
    
    cout << "All xmm values are correct" << endl;

    return 0;
}
