#include "memory.h"
#include <stdio.h>
#include <string.h>

// Custom memory allocation functions
void* custom_malloc(size_t size) {
    void* ptr = malloc(size);
    if (ptr) {
        printf("Allocated %zu bytes at %p\n", size, ptr);
    }
    return ptr;
}

void* custom_realloc(void* ptr, size_t size) {
    void* new_ptr = realloc(ptr, size);
    if (new_ptr) {
        printf("Reallocated %zu bytes at %p\n", size, new_ptr);
    }
    return new_ptr;
}

void custom_free(void* ptr) {
    if (ptr) {
        printf("Freed memory at %p\n", ptr);
        free(ptr);
    }
}

// Memory pool implementation
struct MemoryPool {
    char* memory;
    size_t size;
    size_t used;
};

MemoryPool* create_memory_pool(size_t size) {
    MemoryPool* pool = (MemoryPool*)malloc(sizeof(MemoryPool));
    if (!pool) return NULL;

    pool->memory = (char*)malloc(size);
    if (!pool->memory) {
        free(pool);
        return NULL;
    }

    pool->size = size;
    pool->used = 0;
    printf("Created memory pool of size %zu\n", size);
    return pool;
}

void* pool_alloc(MemoryPool* pool, size_t size) {
    if (!pool || !pool->memory) return NULL;
    if (pool->used + size > pool->size) return NULL;

    void* ptr = pool->memory + pool->used;
    pool->used += size;
    printf("Allocated %zu bytes from pool at %p\n", size, ptr);
    return ptr;
}

void pool_free(MemoryPool* pool, void* ptr) {
    // In this simple implementation, we don't actually free individual blocks
    // The entire pool is freed when destroyed
    printf("Freed block at %p from pool\n", ptr);
}

void destroy_memory_pool(MemoryPool* pool) {
    if (pool) {
        if (pool->memory) {
            free(pool->memory);
        }
        free(pool);
        printf("Destroyed memory pool\n");
    }
} 