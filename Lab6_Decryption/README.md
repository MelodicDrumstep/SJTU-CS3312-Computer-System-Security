# Lab Report : Decryption

## Answer

```
Key (timestamp): 1655999718
IV: 293141
Plaintext: https://crypto.sjtu.edu.cn/riddleman_answer
Encryption time: 2022-06-23 23:55:18
```

## Solution

Just brute-force search. Notice that the modification time of "riddle_man.txt" is 2022/6/23 23:55:20. Therefore I search for these parameter ranges:

```python
    key_range = range(1655999720 - 120, 1655999720 + 30)
    iv_range = range(0, 300000)
```

For source code, please refer to [decrypt.py](decrypt.py).