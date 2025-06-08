# Lab Report : Angr

## Solution

I have written a angr script [angr_tris.py](angr_tris.py). But angr is so hard to use and my angr program just cannot give me the right answer. In the end I choose to read the assembly code to reverse engineering the registration algorithm manually.

## Registration Algorithm

The registration algorithm is simple. 

Assume we have username $U$, which is a string "$U_0, U_1, ..., U_n$".

Then we compute string $S$, $S_i = U_i * i + i - 1$.

And we take the first 6 bytes of the string to form the password.

## How did I find it

I just try with a fixed username, read the assembly code and watch the value in the register.

Here's what I found:

1. The number of the iterations of the critical loop is equal to the size of $U$ (username string).

2. Inside the critical loop, the value in ebx register is served as the indicator of the iteration. That is to say, it starts from 1, and increment 1 each iteration. 

3. `MOVZX EAX BYTE PTR [EAX + EBX - 0x1]` will load the $i$-th element of $U$ to eax register at the $i$-th iteration.

4. `IMUL EBX` is a short for $EAX = EBX * EAX$. Then we apply `ADD EAX, EBX` and `DEC EAX`. Therefore what we did is $EAX = EAX * EBX + EBX - 1$. That is to say, $EAX = U_i * (i + 1) + i$ for the $i$-th iteration($i$ is 0-indexed here).

5. Then after a lot of strange instructions which are not important, the value of $U_i * (i + 1) + i$ is stored somewhere.

6. And after the critial loop, we take the first 6 bytes of the computed string $S$ and compare it with the serial number which user entered. 

It's funny!