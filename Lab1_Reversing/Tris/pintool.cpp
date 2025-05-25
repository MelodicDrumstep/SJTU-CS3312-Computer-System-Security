#include <iostream>
#include <fstream>
#include "pin.H"

using namespace std;

ADDRINT new_target = 0x00449268;

VOID MyJump(ADDRINT *eip) {
    *eip = new_target;
}

VOID Instruction(INS ins, VOID *v)
{
    if (INS_Address(ins) == 0x00449263 || INS_Address(ins) == 0x00449266) {
        INS_InsertCall(ins, IPOINT_BEFORE, (AFUNPTR)MyJump, IARG_REG_REFERENCE, REG_EIP, IARG_END);
    }
}

/* ===================================================================== */
/* Print Help Message                                                    */
/* ===================================================================== */

INT32 Usage()
{
    cerr << "This tool counts the number of dynamic instructions executed" << endl;
    cerr << endl << KNOB_BASE::StringKnobSummary() << endl;
    return -1;
}

/* ===================================================================== */
/* Main                                                                  */
/* ===================================================================== */
/*   argc, argv are the entire command line: pin -t <toolname> -- ...    */
/* ===================================================================== */

int main(int argc, char * argv[])
{
    // Initialize pin
    if (PIN_Init(argc, argv)) return Usage();

    // Register Instruction to be called to instrument instructions
    INS_AddInstrumentFunction(Instruction, 0);
    
    // Start the program, never returns
    PIN_StartProgram();
    
    return 0;
}
