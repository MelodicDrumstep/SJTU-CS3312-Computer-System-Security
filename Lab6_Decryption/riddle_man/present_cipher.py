# coding: utf-8
from __future__ import print_function

s_box = (0xC, 0x5, 0x6, 0xB, 0x9, 0x0, 0xA, 0xD, 0x3, 0xE, 0xF, 0x8, 0x4, 0x7, 0x1, 0x2)

inv_s_box = (0x5, 0xE, 0xF, 0x8, 0xC, 0x1, 0x2, 0xD, 0xB, 0x4, 0x6, 0x3, 0x0, 0x7, 0x9, 0xA)

p_layer_order = [0, 16, 32, 48, 1, 17, 33, 49, 2, 18, 34, 50, 3, 19, 35, 51, 4, 20, 36, 52, 5, 21, 37, 53, 6, 22, 38,
				 54, 7, 23, 39, 55, 8, 24, 40, 56, 9, 25, 41, 57, 10, 26, 42, 58, 11, 27, 43, 59, 12, 28, 44, 60, 13,
				 29, 45, 61, 14, 30, 46, 62, 15, 31, 47, 63]

block_size = 64
ROUND_LIMIT = 32

def round_function(state, key):
	new_state = state ^ key
	state_nibs = []
	for x in range(0, block_size, 4):
		nib = (new_state >> x) & 0xF
		sb_nib = s_box[nib]
		state_nibs.append(sb_nib)

	state_bits = []
	for y in state_nibs:
		nib_bits = [1 if t == '1'else 0 for t in format(y, '04b')[::-1]]
		state_bits += nib_bits

	state_p_layer = [0 for _ in range(64)]
	for p_index, std_bits in enumerate(state_bits):
		state_p_layer[p_layer_order[p_index]] = std_bits

	round_output = 0
	for index, ind_bit in enumerate(state_p_layer):
		round_output += (ind_bit << index)

	return round_output


def key_function_80(key, round_count):
	r = [1 if t == '1'else 0 for t in format(key, '080b')[::-1]]
	h = r[-61:] + r[:-61]

	round_key_int = 0
	for index, ind_bit in enumerate(h):
		round_key_int += (ind_bit << index)
	upper_nibble = round_key_int >> 76
	upper_nibble = s_box[upper_nibble]
	xor_portion = ((round_key_int >> 15) & 0x1F) ^ round_count
	round_key_int = (round_key_int & 0x0FFFFFFFFFFFFFF07FFF) + (upper_nibble << 76) + (xor_portion << 15)

	return round_key_int

def encrypt_block(key, block):
	key_schedule = []
	current_round_key = key
	round_state = block

	# Key schedule
	for counter in range(ROUND_LIMIT):
		key_schedule.append(current_round_key >> 16)
		current_round_key = key_function_80(current_round_key, counter + 1)

	for rnd in range(ROUND_LIMIT - 1):
		round_state = round_function(round_state, key_schedule[rnd])

	round_state ^= key_schedule[31]
	return round_state

def encrypt(key, iv, plain):
	cipher = bytes()
	for i in range(0, len(plain), 8):
		blk = plain[i : i + 8]
		bn = int.from_bytes(blk, "little")
		bn ^= encrypt_block(key, iv)
		blk = bn.to_bytes(8, "little")
		cipher += blk
		iv += 1
	return cipher[0:len(plain)]

def decrypt(key, iv, cipher):
	plain = bytes()
	for i in range(0, len(cipher), 8):
		blk = cipher[i : i + 8]
		bn = int.from_bytes(blk, "little")
		bn ^= encrypt_block(key, iv)
		blk = bn.to_bytes(8, "little")
		plain += blk
		iv += 1
	return plain[0:len(cipher)]

from concurrent.futures import ProcessPoolExecutor, as_completed
import itertools
import time
from typing import Tuple, Optional
import datetime
from tqdm import tqdm
import multiprocessing

def try_decrypt(params: Tuple[int, int], cipher: bytes, known_prefix: bytes) -> Optional[Tuple[int, int, bytes]]:
    """
    Try to decrypt with given key and IV.
    
    Args:
        params: Tuple of (key, iv)
        cipher: The encrypted data
        known_prefix: Known prefix of the plaintext
    
    Returns:
        Tuple of (key, iv, plaintext) if successful, None otherwise
    """
    key, iv = params
    try:
        test_plain = decrypt(key, iv, cipher)
        if test_plain.startswith(known_prefix):
            return (key, iv, test_plain)
    except Exception:
        pass
    return None

def parallel_decrypt_search(cipher: bytes, known_prefix: bytes = b"https://", 
                          max_workers: int = None) -> Optional[Tuple[int, int, bytes]]:
    """
    Parallel search for the correct key and IV using multiple processes.
    The key is a timestamp and IV is a random number between 0 and 300000.
    
    Args:
        cipher: The encrypted data
        known_prefix: Known prefix of the plaintext (default: "https://")
        max_workers: Number of worker processes (default: CPU count)
    
    Returns:
        Tuple of (key, iv, plaintext) if found, None otherwise
    """
    # Use CPU count if max_workers not specified
    if max_workers is None:
        max_workers = multiprocessing.cpu_count()

    # Generate possible key-IV pairs with optimized time range
    time_range = range(1655999720 - 2100, 1655999720 - 1800)  # +1 to include the end value
    iv_range = range(0, 300000)  # All possible IV values
    
    total_combinations = len(time_range) * len(iv_range)
    print(f"Starting search with {len(time_range)} timestamps and {len(iv_range)} IVs")
    print(f"Total combinations: {total_combinations}")
    print(f"Using {max_workers} processes")
    
    # Create parameter combinations
    params = itertools.product(time_range, iv_range)
    
    # Use process pool for parallel processing
    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        # Submit tasks in batches to avoid memory issues
        batch_size = 10000  # Increased batch size for better performance
        param_batches = [list(itertools.islice(params, i, i + batch_size)) 
                        for i in range(0, total_combinations, batch_size)]
        
        # Create progress bar
        pbar = tqdm(total=total_combinations, desc="Decrypting", unit="combinations")
        
        for batch in param_batches:
            # Submit batch of tasks
            future_to_params = {
                executor.submit(try_decrypt, param, cipher, known_prefix): param 
                for param in batch
            }
            
            # Process results as they complete
            for future in as_completed(future_to_params):
                result = future.result()
                pbar.update(1)  # Update progress bar
                if result is not None:
                    # Cancel all other tasks if we found a solution
                    print(f"\ntry_decrypt: Found solution: {result}")
                    for f in future_to_params:
                        f.cancel()
                    pbar.close()
                    return result
        
        pbar.close()
    
    return None

# Example usage:
if __name__ == "__main__":
    # Read encrypted file
    with open("riddle_man.txt", "rb") as f:
        cipher = f.read()
    
    print("Starting decryption search...")
    start_time = time.time()
    
    # Try to find the key and IV
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