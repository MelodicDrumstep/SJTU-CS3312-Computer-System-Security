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
// <ORIGINAL-AUTHOR>: Greg Lueck
// <COMPONENT>: barecrt
// <FILE-TYPE>: component public header

#ifndef BARECRT_PROCESS_HPP
#define BARECRT_PROCESS_HPP

#include "fund.hpp"
#include "barecrt/time.hpp"
#include "barecrt/types.hpp"

#if defined(FUND_HOST_IA32_LINUX)
#   include "barecrt/linux-ia32/resource.hpp"
#elif defined(FUND_HOST_INTEL64_LINUX) || defined(FUND_HOST_MIC_LINUX)
#   include "barecrt/linux-intel64/resource.hpp"
#elif defined(FUND_HOST_IA64_LINUX)
#   include "barecrt/linux-ia64/resource.hpp"
#elif defined(FUND_HOST_IA32_MAC)
#   include "barecrt/mac-ia32/resource.hpp"
#elif defined(FUND_HOST_INTEL64_MAC)
#   include "barecrt/mac-intel64/resource.hpp"
#elif defined(FUND_HOST_INTEL64_BSD)
#   include "barecrt/bsd-intel64/resource.hpp"
#else
#   error "Must define O/S and architecture"
#endif


namespace BARECRT {

/*!
 * Get the caller's process ID.
 *
 *  @param[out] pid     Receives the ID.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE GetPid(PID *pid);

/*!
 * Get the caller's real user ID.
 *
 *  @param[out] uid     Receives the ID.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE GetUid(UID *pid);

/*!
 * Get the caller's thread ID.
 *
 *  @param[out] tid     Receives the ID.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE GetTid(PID *tid);

/*!
 * Get a resource limit for the calling process.
 *
 *  @param[in] resource     The resource limit to get.
 *  @param[out] limit       On success, receives the limit.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE GetRLimit(RESOURCE resource, RLIMIT *limit);

/*!
 * Set a resource limit for the calling process.
 *
 *  @param[in] resource     The resource limit to set.
 *  @param[in] limit        The limit.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE SetRLimit(RESOURCE resource, const RLIMIT *limit);

/*!
 * Yield the processor.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE Yield();

/*!
 * Get the current wall-clock time since some arbitrary reference point
 * that occured at (or before) the start of the calling process.
 *
 *  @param[out] timeval     Receives the current time.
 *
 * @return  0 on success, else a kernel error number.
 */
ECODE GetTime(TIMEVAL *timeval);

} // namespace
#endif // file guard
