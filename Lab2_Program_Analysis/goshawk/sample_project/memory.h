#ifndef MEMORY_H
#define MEMORY_H

#include <stdlib.h>

// Custom memory allocation functions
void* custom_malloc(size_t size);
void* custom_realloc(void* ptr, size_t size);
void custom_free(void* ptr);

// Memory pool functions
typedef struct MemoryPool MemoryPool;
MemoryPool* create_memory_pool(size_t size);
void* pool_alloc(MemoryPool* pool, size_t size);
void pool_free(MemoryPool* pool, void* ptr);
void destroy_memory_pool(MemoryPool* pool);

#endif // MEMORY_H 