# coding: utf-8
import random
import time
import datetime
from present_cipher import encrypt, decrypt, parallel_decrypt_search

RANGE = 300000
# key = int(time.time()) # I guess you don't know the exact time!
# iv = random.randint(0, RANGE) # There exist 300,000 possible values!

# # encrypt the "plain" data with a key and an IV
# plain = "https://***********************************" # The important information is replaced by "*", can you recover them?
# cipher = encrypt( key, iv, plain.encode(encoding='ASCII') )

# # write the encrypted data into the "riddle_man.txt" file
# open("riddle_man.txt", "wb").write(cipher)

# Read the encrypted file
with open("riddle_man.txt", "rb") as f:
    cipher = f.read()

print("Starting decryption search...")
start_time = time.time()

# Try to find the key and IV using parallel search
result = parallel_decrypt_search(cipher)

end_time = time.time()
print(f"Search completed in {end_time - start_time:.2f} seconds")

if result:
    key, iv, plain = result
    print(f"\nFound solution:")
    print(f"Key (timestamp): {key}")
    print(f"IV: {iv}")
    print(f"Plaintext: {plain.decode('ascii')}")
    
    # Print the actual date/time of the key
    key_time = datetime.datetime.fromtimestamp(key)
    print(f"Encryption time: {key_time}")
else:
    print("No solution found")

