#define _GNU_SOURCE
#include <stdio.h>
#include <string.h>

int main() {
    char buffer[10];
    char input[10];
    
    // // Test strcpy
    // strcpy(buffer, "Hello");  // Safe usage
    // printf("After strcpy: %s\n", buffer);
    
    // // Test strcat
    // strcat(buffer, " World");  // Safe usage
    // printf("After strcat: %s\n", buffer);
    
    // Test sprintf
    sprintf(buffer, "This is a very long string that will cause buffer overflow");  // Buffer overflow risk
    printf("After sprintf: %s\n", buffer);
    
    // // Test gets
    // printf("Enter a string: ");
    // gets(input);  // Buffer overflow risk
    // printf("You entered: %s\n", input);
    
    return 0;
} 