---
prev:
  text: "Unions"
  link: "./unions"
next:
  text: "Advanced Data Structures"
  link: "./objects"
---

# Memory: Stack and Heap

While it is true that memory is just an array of bytes with addresses at various offsets, it is also divided into two main regions: the stack and the heap.

## The Stack

The stack is where local variables are stored. Calling a function creates a new _stack frame_ in memory to store its parameters and local variables. When the function returns, its stack frame is _deallocated_.

Each time a function is called a new frame is pushed onto the stack: the _stack pointer_ is moved to make room for the return address, arguments and local variables.
When the function returns its stack is popped off the stack (the stack pointer is reset to where the frame began).

The stack is faster and simpler than the heap:

- Allocation happens simply by incrementing or decrementing the stack pointer
- Stack memory is stored in a contiguous block: related values live next to each other, so the CPU can access them more quickly
- Stack memory is managed automatically as functions are called and as they return
- Heap allocations require synchronization mechanisms when used concurrently, while each thread has its own stack.

::: info Languages

Different programming languages use memory differently: for example Go uses stack allocation when possible. Python on the other hand allocates most objects on the heap, which can impact performance.

:::

### Stack overflow

However, the stack is limited. If you continue to push frames onto the stack without popping them, you might get a _stack overflow_. For example, using recursion without [tail-call optimization](/advanced-concepts/functional#recursion) may lead to one. Pushing too many recursive calls to the stack may cause us to run out of stack space.

### Pointers to the Stack

As a result of stack frames always being pushed and popped from the stack, memory addresses on the stack change constantly.

::: warning Safe use

The stack is only safe to use within the context of the current function. Accessing a point of memory after the function creating the pointer returned is not safe, because the memory was likely reallocated: it might have been already overwritten by another function call.

:::

::: tip Return structs instead of pointers

Returning structs from functions instead of pointers to structs forces the compiler to copy the struct to the `main` functions stack frame, making the memory safe to access.

:::

## The Heap

C always needs to know, how large the data will be, and where it should be put. For simple data, and variables that we only need inside a function are allocated to the stack. However, if we don't know ahead of time what size the data will be, and if we use variables that we want to persist after a function returns, these can be allocated to the heap. Heap is a pool of long-lived memory shared across the entire program. It is slower and more complex to work with, but it allows us to create [more complex data structures](./objects).

In C the `malloc` (*m*emory *alloc*ation) function is used to allocate memory on the heap.

```c
void* malloc(size size_t);
```

It takes a number of bytes to allocate as its argument and returns a pointer to the allocated memory. The pointer can be cast to the necessary type of pointer. If the allocation fails, it returns `NULL`.

```c
// Allocates memory for an array of 4 integers
int *ptr = (int *)malloc(4 * sizeof(int));
if (ptr == NULL) {
  // Handle memory allocation failure
  printf("Memory allocation failed\n");
  exit(1);
}
// use the memory here
// ...
free(ptr);
```

The new memory is _uninitialized_, and contains the data that was previously stored at that location. It is the programmers responsibility to _initialize_ the data properly before it is accessed, and to eventually deallocate it using `free` to avoid memory leaks. If the memory isn't freed, it is never (at least not until the program exits) returned to the operating system to be used by other programs. It is a waste of resources, and if the program does not free up memory that it doesn't use anymore, but continues to allocate new memory, it may run out of memory and crash.

::: warning free

`free` does not change the value stored in the memory, and neither does it change the address stored in the pointer. It simply informs the operating system that the memory is free to be used again by other programs.

:::

The `calloc` function can be used to allocate the specified amount of bytes _and_ to initialize the memory to zero.

::: info Big and Little Endian

Endianness is the order in which bytes are stored in memory. A big-endian systems store the most significant byte ("the biggest part of the number") first, while little-endian systems store the least significant byte first. Most modern systems use little-endian, and the compiler takes care of how data is stored and accessed, so we don't have to worry (at least) about this.

:::

### Reallocation

The `realloc` function is used to resize a previously allocated block of memory without losing its contents. It enables dynamic resizing based on the changing program requirements. It takes the pointer to the current data as the first, and the new size as the second argument, and returns a pointer to the new memory location. If the reallocation fails, for example due to insufficient memory, a NULL pointer is returned.

::: warning Old data

To prevent losing access to the existing data, you should use temporary variables to store the new pointer, and only replace the old pointer to the data in memory, if the reallocation was successful!

:::
