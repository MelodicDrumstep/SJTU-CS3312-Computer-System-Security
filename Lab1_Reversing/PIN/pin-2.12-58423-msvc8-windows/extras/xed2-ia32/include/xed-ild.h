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

/// @file xed-ild.h
/// instruction length decoder
    
#if !defined(_XED_ILD_H_)
# define _XED_ILD_H_
#include "xed-common-hdrs.h"
#include "xed-common-defs.h"
#include "xed-portability.h"
#include "xed-types.h"
#include "xed-decoded-inst.h"

#include "xed-operand-accessors.h"
    
/* ILD-related defines:
 *
 * XED_ILD - for building ILD module 
 * XED_ILD_CHECK  for using ILD module in decoding and checking 
 *                results against regular decode
 * XED_ILD_ONLY - for using only ILD for length decoding, without
 *                regular decoding. This is for performance measurements.
 */

static XED_INLINE xed_uint_t xed_modrm_mod(xed_uint8_t m) { return m>>6; }
static XED_INLINE xed_uint_t xed_modrm_reg(xed_uint8_t m) { return (m>>3)&7; }
static XED_INLINE xed_uint_t xed_modrm_rm(xed_uint8_t m) { return m&7; }
static XED_INLINE xed_uint_t xed_sib_scale(xed_uint8_t m) { return m>>6; }
static XED_INLINE xed_uint_t xed_sib_index(xed_uint8_t m) { return (m>>3)&7; }
static XED_INLINE xed_uint_t xed_sib_base(xed_uint8_t m) { return m&7; }
static XED_INLINE xed_uint_t bits2bytes(xed_uint_t bits) { return bits>>3; }

/*
 * To allow the ILD to record information for nonpublic extensions, we
 * allow adding fields to the xed_ild_extended_t at compile time by
 * generating xed-ild-extension.h that defines
 * xed_ild_extended_t type.  The implication of this model, is that
 * downstream extension models must be supersets of all the extensions that
 * they compose with. FIXME: cook up a way to synthesize/generate the
 * xed-ild-extension.h file and type definition from all the fields in
 * relevant models at compile time.
 */

#include "xed-ild-extension.h"


typedef enum {
    XED_ILD_MAP0=0,
    XED_ILD_MAP1=1,
    XED_ILD_MAP2=2,
    XED_ILD_MAP3=3,
    XED_ILD_MAPAMD=4, /* 3dnow */
    XED_ILD_MAP_XOP8=5,
    XED_ILD_MAP_XOP9=6,
    XED_ILD_MAP_XOPA=7, 
    /* FIXME:we might have invalid map (TNI maps) - in this case
     * we should check for it before looking up in tables for
     * modrm/imm/disp/static decoding
     * Also invalid map value cannot be 0xFF - we allocate 3 bits
     * for MAP operand in key for static lookup.
     */
    XED_ILD_INVALID_MAP
} xed_ild_map_enum_t;

#define ILD_ITEXT_MAX_BYTES 15

#define XED_GRAMMAR_MODE_64 2
#define XED_GRAMMAR_MODE_32 1
#define XED_GRAMMAR_MODE_16 0

typedef struct  {
    /* init/configuration variables */
    xed_bits_t mmode;  /* machine mode in XED GRAMMAR format: 0/1/2 */
    const xed_uint8_t* itext;
    xed_uint_t  max_bytes; 
    xed_uint_t out_of_bytes; /* 1 if max_bytes bound was reached while
                              * scanning itext 
                              */

    /* observed variables */
    xed_uint_t  length;    /* the observed length */
    
    /* to get the count of real legacy prefixes, subtract the number of rex
       prefixes from nprefixes.  There is only one rex prefix that is used;
       but any rex-s that are mixed-in with the legacy prefixes are
       ignored! We must count them. */
    xed_uint_t  nprefixes; /* count of legacy and rex prefixes */
    xed_uint_t  nrexes;    /* count of rex prefixes */
    
    xed_uint_t  nseg_prefexies; /* count of segment prefixes */

    
    xed_uint8_t found; /* NDY - found a valid inst */
    xed_uint8_t osz;  /* if 66 was observed */
    xed_uint8_t asz;  /* if 67 was observed */
    xed_uint8_t seg;  /* the last seg prefix */
    xed_uint8_t lock; /* 1 or 0 */
    xed_uint8_t f2;  /* 1 or 0 */
    xed_uint8_t f3;  /* 1 or 0 */

    xed_uint8_t modep5; /* 0, 1. XED_OPERAND_MODEP5
                         * If 1 the first f2/f3 prefix is taken*/
    xed_uint8_t p4; /* 0,1, XED_OPERAND_P4  */
    xed_uint8_t vv; /* XED_OPERAND_VEXVALID 0 for legacy, 1 for AVX */
    
    xed_uint8_t last_f2f3; /* f2 or f3 */
    xed_uint8_t first_f2f3;  /* f2 or f3 */
    xed_uint8_t rex; /* rex value */
    xed_uint8_t vex; /* c4 or c5 */
    xed_uint8_t nominal_opcode;
    xed_uint8_t nominal_opcode_position; /* 0 is first ... */

     /* required for sib processing */
    xed_uint8_t modrm; /* value of byte if has_modrm is nonzero*/
    
    xed_ild_map_enum_t map; 
    xed_uint8_t amd3dnow; /* 1 or 0 */
    xed_uint8_t rex_w;
    xed_uint8_t rex_r;
    xed_uint8_t rex_x;
    xed_uint8_t rex_b;

    xed_uint8_t vexdest3;
    xed_uint8_t vexdest210;
    xed_uint8_t vex_l;
    xed_uint8_t vex_pp;
    xed_uint8_t vex_w;

    /* decode-time derived variables */
    xed_bool_t has_modrm;
    xed_bool_t has_sib;
    xed_uint8_t imm_bytes;   /* 0=none, else 1,2,4,8 */
    /*has_imm1 is for AMD's double immediate insstructions */
    xed_uint8_t imm1_bytes;   /* 0=none, else 1,2 */
    xed_uint8_t disp_bytes;  /* 0=none, else 1,2,4,8 */

    /* position of the back-end bytes */
    xed_uint8_t pos_modrm;
    xed_uint8_t pos_sib;
    xed_uint8_t pos_imm;
    xed_uint8_t pos_imm1; //for AMD's second immediate
    xed_uint8_t pos_disp;


    xed_ild_extended_t ext;
} xed_ild_t;

XED_DLL_EXPORT void xed_ild_init(xed_ild_t* x,
                                 xed_machine_mode_enum_t mmode,
                                 const xed_uint8_t* itext,
                                 const xed_uint_t  max_bytes);


/// Initialize internal data structures of the ILD.
void xed_ild_init_decoder(void);

/// An instruction length decoder. This does not indicate if instructions
/// are valid or not. It only attempts to guess the overall length of the
/// instruction. The ild structure is modified.
///  @param d - should be initialized 
/// @return the length in bytes of the instruction, valid or not. 
///
/// @ingroup ILD
XED_DLL_EXPORT xed_uint_t
xed_instruction_length_decode(xed_decoded_inst_t* d);



/// Convert xed_machine_mode_enum_t to a corresponding xed_bits_t value
/// for MODE operand
///  @param mmode - machine mode in xed_machine_mode_enum_t type
/// @return mode value for MODE operand in xed_bits_t type 
///
/// @ingroup ILD
XED_DLL_EXPORT 
xed_bits_t xed_ild_cvt_mode(xed_machine_mode_enum_t mmode);

/* Special getter for RM  */
static XED_INLINE xed_uint_t
xed_ild_get_rm(const xed_decoded_inst_t* ild) {
    /* Sometimes we don't have modrm, but grammar still
     * likes to use RM operand - in this case it is first
     * 3 bits of the opcode.
     */
    xed_uint8_t modrm;
    if (xed3_operand_get_has_modrm(ild))
        return xed3_operand_get_rm(ild);
    else 
        modrm = xed3_operand_get_nominal_opcode(ild);
        return xed_modrm_rm(modrm);
}

/* compressed operand getters */

static XED_INLINE xed_uint_t
xed3_operand_get_mod3(const xed_decoded_inst_t* ild) {
    return xed3_operand_get_mod(ild) == 3;
}

static XED_INLINE xed_uint_t
xed3_operand_get_rm4(const xed_decoded_inst_t* ild) {
    return xed3_operand_get_rm(ild) == 4;
}

static XED_INLINE xed_uint_t
xed3_operand_get_vexdest210_7(const xed_decoded_inst_t* ild) {
    return xed3_operand_get_vexdest210(ild) == 7; 
}

static XED_INLINE void 
xed3_check_set_ia_map(xed_decoded_inst_t* d, xed_uint8_t c4byte1){
    xed_uint8_t map = c4byte1 & 0x1F;
    if (map > XED_ILD_MAP3){
        xed3_operand_set_map(d,XED_ILD_INVALID_MAP);
    }
    else{
        xed3_operand_set_map(d,map);
    }
}

/*
static XED_INLINE xed_uint_t
xed_ild_get_refining(xed_decoded_inst_t* d) {
    if (ild->modep5)
        return ild->first_f2f3 & 0x3;
    return ild->last_f2f3 & 0x3;
}

//FIXME: REP always has the same value as REFINING, right?
static XED_INLINE xed_uint_t
xed_ild_get_rep(xed_ild_t* ild) {
    return xed_ild_get_refining(ild);
}



static XED_INLINE xed_uint_t
xed_ild_get_reg(xed_ild_t* ild) {
    return xed_modrm_reg(ild->modrm);
}*/

/*




static XED_INLINE xed_uint_t
xed_ild_get_vex_prefix(xed_ild_t* ild) {
    grammars' VEX_PREFIX has funny values 
    static const xed_uint8_t vex_prefix_lu[4] = {0,1,3,2};
    return vex_prefix_lu[ild->vex_pp]; 
}



static XED_INLINE xed_uint_t
xed_ild_get_vexvalid(xed_ild_t* ild) {
#if defined(XED3_GUARD)
    return ild->xed3_ops.vexvalid;
#else
    return ild->vv;
#endif
}

static XED_INLINE xed_uint_t
xed_ild_get_vl(xed_ild_t* ild) {
    * If VL is overriden in extensions, vex_l should be set
     * in extensions' scanners.
     * This makes the getter simpler *
    return ild->vex_l;
}
*/
#endif

