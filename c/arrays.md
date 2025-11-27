---
prev:
  text: "Pointers"
  link: "./pointers"
next:
  text: "Strings"
  link: "./strings"
---

# Arrays

An array in C is a fixed-size, ordered collection of elements. The elements are indexed by integers, starting at zero. Unlike array implementations in some other languages (e.g. Python Lists or JavaScript Arrays), C arrays can only hold elements of the same type.

Arrays are stored in contiguous memory.

You can access elements in the array using square brackets, and you can reassign this way, too.

```c
int numbers[5] = {1, 2, 3, 4, 5};
int first_number = numbers[0];
numbers[4] = 10;
```

::: info Pass by reference

Arrays are passed to functions by reference. Updating elements of an array within a function will change the elements in the original array, not just a copy.

:::

## Pointer Arithmetic with Arrays

An array name acts as a [pointer](./pointers) to the first element. This means, that we can also use pointer arithmetic to move between the elements in the array.

```c
int numbers[5] = {1, 2, 3, 4, 5};
int three = numbers[2];
// another way to access elements
int five = *(numbers + 4);
```

::: info Multibyte Arrays

The arithmetic above works with multibyte arrays, too. If we for example store structs in an array, a pointer offset by one will point to the memory location of the first member of the second struct, etc.

As both arrays and structs are contiguous in memory, we can even cast an array of structs holding integers to an array of integers.

:::

## Iterate over Arrays

In C the only way to iterate over arrays is using a [for lopp](./flow#for-loop) with an index or some other conditional loop.

```c
#include <stdio.h>

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\n");

    return 0;
}
```

::: warning Out of bounds

Unlike other programming languages, C will let you go out of bounds of an array, and access the memory locations coming after the end of the array, so you must make sure that you only iterate up to the end of the array.

:::

## Array Size and Decay

While an array is a pointer to the first element, the size of the array differs from what we see in the case of simple pointers: an array keeps track of the size of its elements, and the number of elements. So an array is not _just_ a pointer, but also a contiguous block of memory.

In many contexts, however, arrays _decay_ to pointers, which means, that the array name _becomes "just" a pointer_ to the first element. For example when we use _pointer arithmetics_ to access an element, the array name decays to a pointer. This happens when arrays are _passed to functions_.

```c
int arr[5];
int *ptr = arr;          // 'arr' decays to 'int*'
int value = *(arr + 2);  // 'arr' decays to 'int*'
```

Arrays don't decay when we use `sizeof()`, which returns the size of the entire array, or `&`, which gives a pointer to the whole array: its type will be a pointer to the array type, and not to the type held in the array.

When an array is initialized, it is fully allocated in memory.

::: tip Array length

An array's length can be calculated by dividing the `sizeof` the whole array by the `sizeof` the first element.

:::
