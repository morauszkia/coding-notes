---
prev:
  text: "Structs"
  link: "./structs"
next:
  text: "Arrays"
  link: "./arrays"
---

# Pointers

**Variables** are _named references_ to some data in memory.
[**Memory**](./memory) is a big _array of bytes_, in which data is stored.
A **memory address** is an index into the big array of bytes. It is just a large number, written in _hexadecimal_ format.
A **Pointer** is just a _variable_ that stores a memory address.

In C you can use the address-of-operator `&` to access the memory address that a variable is pointing to. You can print memory addresses with the `%p` format specifier.

```c
#include <stdio.h>

int main() {
  int age = 37;
  // [!code highlight]
  printf("The address of age is: %p\n", &age);
  return 0;
}
```

You can create a pointer using `*` after the type.

```c
int age = 37;
int *pointer_to_age = &age;
```

## Virtual Memory

There might be exceptions, but most of the time your code does not have direct access to the actual physical memory, but the OS provides access to a layer of abstraction called virtual memory. The OS manages the access to the physical memory (the RAM sticks in the computer). The running program becomes a process and is given access to a chunk of virtual memory.

This has several benefits like

- isolation: one process can't access the memory of another process
- security: the OS can prevent access to certain parts of the memory
- simplicity: developers don't have to think about managing physical memory and the memory of other processes
- performance: the OS can optimize memory access depending on the hardware and the needs of the program

Everything said above stands for virtual memory: it is a large array of bytes, where each byte has its memory address.

## Pass by Reference

It is a typical situation that we want to pass a collection of data to a function, and we want the function _to modify_ the data. However, in C, [structs](./structs) are passed _by value_. Therefore, updating a field in the struct does not change the original struct. If we want the change _to persist_ we need to return the new struct from the function, which will be a new copy of the original struct with the updated field value. The address of the struct that wass passed to the function and that was returned from it _is not the same_.

## Dereferencing

If we want to get access to the data the pointer is pointing to, we use the `*` dereferencing operator.

```c
int ageVal = *pointer_to_age;
```

With structs you can use the `->` operator to access the fields of a struct that the pointer references. This dereferences the pointer and accesses the field in one step.

```c
coordinate_t point = {10, 20, 30};
coordinate_t *ptrToPoint = &point;
printf("X: %d\n", ptrToPoint->x); // X: 10
// same as (*ptrToPoint).x
```

## Pointer Size

As a pointer is only a reference to a location in the memory, its size does not depend on the type of data it is pointing to. Its size only depends on the system's architecture.

## Pointer-pointers

Pointers can store the address of values (pointers), or even store pointers to pointers to pointers, etc. This can be useful for example, if you want to have an array of pointers. Type declaration and dereferencing works by adding the necessary number of asterisks to get to the level you want.

```c
int value = 42;
int *pointer = &value;
int **pointer_pointer;
// pointer_pointer will hold the address of the value
*pointer_pointer = pointer;

// set new value
**pointer_pointer = 13;
```

As strings are represented as pointers to chars in C, an array of strings [on the heap](./memory#the-heap) is accessed using a pointer to the pointers (strings).

```c
char **string_array = malloc(sizeof(char *) * 3);
```

## Void Pointers

A `void *` pointer, for example that returned by [`malloc`](./memory#the-heap) tells the compiler, that this pointer can point to _anything_. These are also known as _generic pointers_. They cannot be directly dereferenced or used in pointer arithmetic without casting them to another pointer type first.

```c
int number = 42;
void *generic_ptr = &number;

// This doesn't work
printf("Value of number: %d\n", *generic_ptr);

// This works: Cast to appropriate type before dereferencing
printf("Value of number: %d\n", *(int*)generic_ptr);
```

It is a common pattern to store the value of generic data in one variable and its type in another to be used by functions that can process variables whose type we don't know in advance.

```c
typedef enum DATA_TYPE {
  INT,
  FLOAT
} data_type_t;

void printValue(void *ptr, data_type_t type) {
  if (type == INT) {
    printf("Value: %d\n", *(int*)ptr);
  } else if (type == FLOAT) {
    printf("Value: %f\n", *(float*)ptr);
  }
}

int number = 42;
printValue(&number, INT);

float decimal = 3.14;
printValue(&decimal, FLOAT);
```

::: warning Casting&Dereferencing

When casting and dereferencing pointers, parentheses determine what is cast:

```c
// casting applied to ptr
((some_struct_t*)ptr)->field
// casting applied to field
(some_struct_t*)ptr->field
```

:::
