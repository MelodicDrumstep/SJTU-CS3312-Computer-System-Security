import time
import datetime
from tqdm import tqdm
from present_cipher import decrypt

def decrypt_search(cipher):
    # Calculate total iterations
    key_range = range(1655999720 - 120, 1655999720 + 30)
    iv_range = range(0, 300000)
    total_iterations = len(key_range) * len(iv_range)
    
    # Create progress bar
    pbar = tqdm(total=total_iterations, desc="Decrypting", unit="combinations")
    
    for key in key_range:
        for iv in iv_range:
            plain = decrypt(key, iv, cipher)
            pbar.update(1)  # Update progress bar
            if plain.startswith(b"https://"):
                pbar.close()
                return (key, iv, plain)
    
    pbar.close()
    return None

if __name__ == "__main__":
    # Read encrypted file
    with open("riddle_man.txt", "rb") as f:
        cipher = f.read()
    
    print("Starting decryption search...")
    start_time = time.time()
    
    # Try to find the key and IV
    result = decrypt_search(cipher)
    
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