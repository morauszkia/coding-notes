---
prev:
  text: "Memory Management"
  link: "./memory"
---

# Complex Data Structures in C

C does not have built in complex data structures, but they can be built using [structs](./structs). These are [allocated on the heap](./memory#the-heap). These typically hold not only their values, but also metainformation, e.g. a string or enum describing the type of value it stores, their capacity, etc.

For example a [Stack](/dsa/stacks) in C would be a struct with fields representing the number of elements in the stack (`count`), the number of elements that the stack can hold (`capacity`), and a pointer to the data stored in the stack (`data`). You would use regular functions to create and interact with the stack (push, pop, etc.).

```c
// stack.h
#include <stddef.h>

typedef struct Stack {
  size_t count;
  size_t capacity;
  void **data;
} stack_t;

stack_t *stack_new(size_t capacity);
```

```c
// stack.c
#include "stack.h"
#include <stdlib.h>

stack_t *stack_new(size_t capacity) {
  stack_t *stack = malloc(sizeof(stack_t));
  if (stack == NULL) {
    return NULL;
  }

  stack->count = 0;
  stack->capacity = capacity;
  stack->data = malloc(stack->capacity * sizeof(void *));
  if (stack->data == NULL) {
    free(stack);
    return NULL;
  }

  return stack;
}

void stack_push(stack_t *stack, void *obj) {
  if (stack->count == stack->capacity) {
    stack->capacity *= 2;
    void **temp = realloc(stack->data, stack->capacity * sizeof(void *));
    if (temp == NULL) {
      stack->capacity /= 2;
      return;
    }
    stack->data = temp;
  }
  stack->data[stack->count] = obj;
  stack->count++;
  return;
}

void *stack_pop(stack_t *stack) {
  if (stack->count == 0) {
    return NULL;
  }
  stack->count--;
  return stack->data[stack->count];
}

void stack_free(stack_t *stack) {
  if (stack == NULL) {
    return;
  }

  if (stack->data != NULL) {
    free(stack->data);
  }

  free(stack);
}
```

Objects in C similar to those in Python and other languages, where everything is an object, can also be built using [structs](./structs) that for example hold the value as well as the kind. [Unions](./unions) and [enums](./enums) can be used to make these object generic.
