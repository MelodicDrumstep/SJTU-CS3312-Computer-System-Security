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
#ifndef _PAGETABLE_H_
#define _PAGETABLE_H_

#include <stdint.h>
#include <stdlib.h>
#include <stdio.h>

///////////////////////// Class Page //////////////////////////////////////////

template<typename Data_T,
	 const uint32_t _PageSizeBits,
	 const uint32_t _DataAlignment>
class Page
{
public:
  static const uint32_t PAGE_SHIFT = _PageSizeBits;
  static const uint32_t PAGE_SIZE = 1<<PAGE_SHIFT;
  static const uint32_t ENTRIES = PAGE_SIZE/_DataAlignment;

  static const uintptr_t PAGE_MASK = ~((uintptr_t)(PAGE_SIZE - 1));
  static const uintptr_t OFFSET_MASK = (uintptr_t)(PAGE_SIZE - 1);

  Data_T data[ENTRIES];
  
  Page(uintptr_t _addr) :
    addr(_addr),
    valid(true)
  {
    memset(data, 0, sizeof(data));
  }

  static const uint32_t
  getOffset(uintptr_t addr)
  {
    return (addr & OFFSET_MASK) / _DataAlignment;
  }

  uintptr_t addr;
  bool valid;
};

///////////////////////// Class PageTable /////////////////////////////////////

template<typename Data_T, 
	 const uint32_t _PageSizeBits, 
	 const uint32_t _BucketsBits,
	 const uint32_t _DataAlignment>
class PageTable
{
public:
  typedef Page<Data_T, _PageSizeBits, _DataAlignment> Page_T;

  static const uint32_t BUCKETS = 1<<_BucketsBits;
  static const uintptr_t BUCKET_MASK = BUCKETS - 1;

  inline Page_T *get(uintptr_t addr)
  {
    uint32_t key = getKey(addr);
    return buckets[key].get(addr);
  }


  inline Page_T *getFast(uintptr_t addr)
  {
    uint32_t key = getKey(addr);
    return buckets[key].getFast();
  }

  PageTable()
  {
    Page_T *dummy = new Page_T(0);

    if (dummy == NULL) {
      perror(__FUNCTION__);
      exit(EXIT_FAILURE);
    }
    dummy->valid = false;

    for (uint32_t i = 0; i < BUCKETS; i++) {
      buckets[i].setDummy(dummy);
    }      
  }
  
  static inline uint32_t 
  getKey(uintptr_t addr)
  {
    uint32_t ret = addr >> Page_T::PAGE_SHIFT;

    // this branch should compile away on 32bit if PAGE_SHIFT == 16
    // and BUCKETS == 16.  if the page size is small, or the address
    // space is big, we want to use the upper bits in the hash as well

    if (Page_T::PAGE_SHIFT/8 < sizeof(ret)/2) {
      // This produces the same code as >> 2*PAGE_SHIFT, but the
      // compiler doesn't whine on 32bit.
      addr >>= Page_T::PAGE_SHIFT;
      ret ^= addr >> (Page_T::PAGE_SHIFT);
    }
    
    return ret & BUCKET_MASK;
  }

  ///////////////////////// Class MRUVector ///////////////////////////////////

  class MRUVector
  {
  public:
    size_t size;
    size_t maxSize;
    Page_T **vec;

    void growVec()
    {
      maxSize *= 2;
      vec = (Page_T **)realloc(vec, maxSize * sizeof(Page_T *));
      if (vec == NULL) {
	perror(__FUNCTION__);
	exit(EXIT_FAILURE);
      }

      for (size_t i = size; i < maxSize; i++) {
	vec[i] = NULL;
      }
    }

    Page_T *add(uintptr_t pageAddr)
    {
      Page_T *p;
      if( (p = new Page_T(pageAddr)) == NULL ) {
	perror(__FUNCTION__);
	exit(EXIT_FAILURE);
      }

      if (size == maxSize) {
	growVec();
      }

      vec[size++] = p;
      
      return p;
    }
    
  public:
    
    MRUVector() :
      size(0),
      maxSize(4),
      vec(NULL)
    {
      growVec();
    }
    
    inline Page_T *
    get(uintptr_t _addr)
    {
      uintptr_t pageAddr = _addr & Page_T::PAGE_MASK;

      if( vec[0]->valid && vec[0]->addr == pageAddr ) {
	return vec[0];
      }

      for (size_t i = 1; i < size; i++) {
	if (vec[i]->addr == pageAddr) {
	  int newIndex = i / 2;
	  Page_T *tmp = vec[i];
	  vec[i] = vec[newIndex];
	  vec[newIndex] = tmp;
	  return tmp;
	}
      }
      
      return add(pageAddr);
    }

    inline Page_T *
    getFast()
    {
      return vec[0];
    }

    inline void
    setDummy(Page_T *page)
    {
      vec[0] = page;
    }

  }; // MRUVector

  MRUVector buckets[BUCKETS];
}; // HashTable

#endif
