# coding: utf-8
import random
import time
import datetime
from present_cipher import encrypt
from present_cipher import decrypt

RANGE = 300000
key = int(time.time()) # I guess you don't know the exact time!
iv = random.randint(0, RANGE) # There exist 300,000 possible values!

# encrypt the "plain" data with a key and an IV
plain = "https://***********************************" # The important information is replaced by "*", can you recover them?
cipher = encrypt( key, iv, plain.encode(encoding='ASCII') )

# write the encrypted data into the "riddle_man.txt" file
open("riddle_man.txt", "wb").write(cipher)

# CAN YOU DECRYPT THE RIDDLE MAN'S FILE??
# TIPS: use the provided decrypt functionS!
#
# plain = decrypt(key, iv, cipher)
# if plain[0:5] == "https".encode(encoding='ASCII'): print(plain)

