import angr

filename = "./tris.exe"

start = 0x0042c58D
target = 0x00449268  # Success path
avoid = 0x00449295  # Failure path

# Load binary file with specified architecture
project = angr.Project(filename, auto_load_libs=False, arch='x86_64')

# Create a symbolic execution engine
state = project.factory.entry_state(addr=start)
state.memory.store(0xdf1fA8, b"123456")
input_string = state.solver.BVS("input", 8 * 7)
state.memory.store(0xdf6730, input_string)

simgr = project.factory.simulation_manager(state)

# Perform symbolic execution
simgr.explore(find=target, avoid=avoid)
# Check if target state is found
if simgr.found:
    found_state = simgr.found[0]
    solution = found_state.solver.eval(input_string, cast_to=bytes)
    print("Found state: ", found_state)
    print("Flag: ", solution)
else:
    print("Target not found")