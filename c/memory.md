---
prev:
  text: "Unions"
  link: "./unions"
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
