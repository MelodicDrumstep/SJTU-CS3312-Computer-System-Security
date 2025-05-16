# Set PIN_ROOT
PIN_ROOT ?= /mnt/d/CS3312_wltu/Lab1_Reversing/PIN/pin-3.28-98749-g6643ecee5-gcc-linux

# Include common rules
include makefile.rules

# Target files
TARGET = unsafe_func_replacer
TEST_TARGET = test_program

# Default target
all: $(TARGET).so $(TEST_TARGET)

# Compilation rules
$(TARGET).so: $(TARGET).o
	$(LINK.cxx) $(LINK_EXE)$@ $(TARGET).o $(LDFLAGS) $(LIBS)

$(TARGET).o: $(TARGET).cpp
	$(COMPILE.cxx) $(COMP_OBJ)$@ $<

# Test program
$(TEST_TARGET): $(TEST_TARGET).c
	$(CC) -o $@ $< -fno-stack-protector

# Clean rule
clean:
	rm -f *.o *.so $(TEST_TARGET) 