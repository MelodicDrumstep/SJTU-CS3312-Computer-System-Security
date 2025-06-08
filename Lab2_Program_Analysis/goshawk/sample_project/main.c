#include <stdio.h>
#include <stdlib.h>
#include "memory.h"

int main() {
    // Test custom memory allocation
    int* arr = custom_malloc(10 * sizeof(int));
    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Use the allocated memory
    for (int i = 0; i < 10; i++) {
        arr[i] = i;
    }

    // Test custom memory reallocation
    int* new_arr = custom_realloc(arr, 20 * sizeof(int));
    if (new_arr == NULL) {
        printf("Memory reallocation failed\n");
        custom_free(arr);
        return 1;
    }
    arr = new_arr;

    // Test custom memory free
    custom_free(arr);

    // Test memory pool
    void* pool = create_memory_pool(1024);
    if (pool == NULL) {
        printf("Memory pool creation failed\n");
        return 1;
    }

    // Allocate from pool
    int* pool_arr = pool_alloc(pool, 5 * sizeof(int));
    if (pool_arr == NULL) {
        printf("Pool allocation failed\n");
        destroy_memory_pool(pool);
        return 1;
    }

    // Free from pool
    pool_free(pool, pool_arr);
    destroy_memory_pool(pool);

    return 0;
} 