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
#ifndef REGVALUES_H
#define REGVALUES_H

const unsigned MAXSIZE = 64;
const unsigned GPRSIZEMAX = 8;
const unsigned GPRSIZE = sizeof(void*);
const unsigned GPR32SIZE = 4;
const unsigned STSIZE = 10;
const unsigned STSIZEALLIGNED = 16;
const unsigned XMMSIZE = 16;
const unsigned YMMSIZE = 32;
const unsigned ZMMSIZE = 64;
const unsigned KSIZE = 2;
const unsigned KSIZEALLIGNED = 8;

const unsigned GPRBITSIZE = GPRSIZE * 8;
const unsigned STBITSIZE = STSIZE * 8;
const unsigned XMMBITSIZE = XMMSIZE * 8;
const unsigned YMMBITSIZE = YMMSIZE * 8;
const unsigned ZMMBITSIZE = ZMMSIZE * 8;
const unsigned KBITSIZE = KSIZE * 8;

// The fpSaveArea includes the fxsave area (512 bytes), the additional xsave area (320 bytes)
// and a 64 byte padding since the (f)xsave instructions require a 64-byte-aligned address
const unsigned FPSAVEAREASIZE = 896;

extern "C"
{
extern unsigned char fpSaveArea[FPSAVEAREASIZE];

// These values will be loaded to registers by the application in the ChangeRegs() function.
extern const unsigned char gprval[GPRSIZEMAX];
extern const unsigned char * gpr32val;
extern const unsigned char * gpr16val;
extern const unsigned char * gprlval;
extern const unsigned char * gprhval;
extern const unsigned char stval[STSIZE];
extern const unsigned char xmmval[XMMSIZE];
extern const unsigned char ymmval[YMMSIZE];
extern const unsigned char zmmval[ZMMSIZE*2];
extern const unsigned char kval[KSIZE];

// These values will be loaded to registers by the tool in the ReplaceChangeRegs() function.
// All values should be 64-bit aligned.
extern const unsigned char tgprval[GPRSIZEMAX];
extern const unsigned char tstval[STSIZEALLIGNED];
extern const unsigned char txmmval[XMMSIZE];
extern const unsigned char tymmval[YMMSIZE];
extern const unsigned char tzmmval[ZMMSIZE*2];
extern const unsigned char tkval[KSIZEALLIGNED];


// These values will be assigned (stored from registers) by the application in the SaveRegsToMem() function.
extern unsigned char agprval[GPRSIZE];
extern unsigned char astval[STSIZE];
extern unsigned char axmmval[XMMSIZE];
extern unsigned char aymmval[YMMSIZE];
extern unsigned char azmmval[ZMMSIZE*2];
extern unsigned char akval[KSIZE];
}

#endif // REGVALUES_H
