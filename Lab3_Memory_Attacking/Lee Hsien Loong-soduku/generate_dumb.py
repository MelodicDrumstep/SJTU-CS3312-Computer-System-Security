#!/usr/bin/env python3

# Generate 80 bytes of 0x37
dumb_bytes = bytes([0x37] * 80)

# Write to file
with open('dumb.txt', 'wb') as f:
    f.write(dumb_bytes)

print(f"Generated {len(dumb_bytes)} bytes of 0x37 to 'dumb.txt'")