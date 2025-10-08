---
prev:
  text: "Intro"
  link: "./"
next:
  text: "Functions"
  link: "./functions"
---

# Basics of C

C code lives in two types of files.

- `.c` files contain implementation
- `.h` files are header files that contain function prototypes

To import code from other files, you need to `#include` the header file. You include the `.h` file in the corresponding `.c` file as well.

## Entry point

In C the main entry point of your program is the `main()` function. This is different, than for example in Python, in which a program starts at the top of your script file.

A simple "Hello World" program in C would look like the following:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

As said, the `main()` function is your programs entry point. It returns an integer (`int`): the exit code of the program. `0` means success, anything else would mean failure.
As it used to matter a lot, how many bytes your source code was, many things in C are abbreviated.

In C you _must_ end your statements with a `;`. It is not optional as in JavaScript. The C compiler ignores whitespace, which is only added for readability.

The `#include` statement at the top makes the `stdio` library available to your code. You need this to use the `printf()` function to print something to the console. You have to end your strings with the `\n` newline character to add line breaks.

C is a _compiled_ language, therefore, if there is a bug in the code, it crashes at compile time.

## Pragma Once

In a complex program, you might end up with including the same header file in multiple places. To avoid issues, you can tell the compiler to only include the file once, even if it's referenced multiple times. Add the line `#pragma once` to the top of your header file.

Another way would be to use include guards.

```c
#ifndef MY_HEADER_H
#define MY_HEADER_H

// some cool code

#endif
```

## Comments

In C, inline comments start with `//`, and multi-line comments can be written between `/*` and `*/`.

```c
// This is a single-line comment

int main() {
    printf("Hello World!") // This is also a single-line comment
    return 0;
}

/*
This is a multi-line comment
I can just keep adding lines
and it will still be a comment
*/
```

## Variables

Variables are containers for storing data values. Variables and return values of function have a type. The four main types in C are

- Integer (`int`) - whole numbers, e.g. `5` or `-10`
- Floating point number (`float`) - e.g. `3.14`
- Character (`char`) - e.g. `'a'` (surrounded by single quotes)
- Array of characters (`char *`) - e.g. `"Hello World!"` (surrounded by double quotes)

Variables are identified with unique names. As a best practice, use descriptive names. Names can contain letters, digits and underscores, must begin with a letter or underscore, and are case sensitive. Reserved words cannot be used as variable names.

Variables are declared with their types. You can declare variables with or without initial values. You can assign values, or reassign variables later using the `=` operator. You don't need to, and you can't redeclare its type.

You can declare multiple variables of the same type in a comma-separated list. You can also assign the same value to multiple variables.

```c
int age = 32;
float pi = 3.14;
char grade = 'A';
char *msg = "Hello World!"

int myNum;
myNum = 42;

int x = 1, y = 2, z = 3;
int a, b, c;
a = b = c = 42;
```

C is statically typed, therefore, changing the type of an existing variable is not allowed.

### Type sizes

Different types occupy different amount of memory. For example, a `char` has the size of 1 byte. A `float` (single-precision floating-point number) is typically 4 bytes, while a `double` (double-precision floating-point number) takes up 8 bytes. However, the size of some types also depends on your system's architecture. An `int` is typically 4 bytes on a 32-bit system and 8 bytes on a 64-bit system. You can use the `sizeof` operator to determine the actual size of a type.

```c
#include <stdbool.h>
#include <stdio.h>

int main() {
  // Use %zu is for printing `sizeof` result
  printf("sizeof(char)   = %zu\n", sizeof(char));
  printf("sizeof(bool)   = %zu\n", sizeof(bool));
  printf("sizeof(int)    = %zu\n", sizeof(int));
  printf("sizeof(float)  = %zu\n", sizeof(float));
  printf("sizeof(double) = %zu\n", sizeof(double));
  printf("sizeof(size_t) = %zu\n", sizeof(size_t));
}
```

### Constants

You can use the `const` qualifier to create constants.

```c
int main() {
    const int x = 5; // [!code highlight]
    x = 10; // [!code error]
}
```

### Format Specifiers

Unlike in other programming languages, you cannot simply print the value of a variable in C. You must use a format specifier for that.

```c
int myNum = 42;
printf(myNum);  // This won't print
printf("%d", myNum) // Outputs 42
```

Common format specifiers are

- `%d` - digit (integer)
- `%c` - character
- `%f` - floating point number
- `%s` - string

```c
printf("My name is %s, and I am %d years old.\n", name, age)
```

### Casting

You can cast values to other types

## Operators

C has the usual arithmetic operators, and also knows the augmented assignment operators. Furthermore, C uses the increment and decrement operator as a prefix or as a suffix.

The arithmetic operators if performed with two `int`s will return an `int`. To get a `float`, at least on of the operands must be a `float`.

```c
int x = 7, y = 2;
int z;
float w;

// Arithmetic
z = x + y;  // z = 9
z = x - y;  // z = 5
z = x * y;  // z = 14
z = x / y;  // z = 3
z = x % y;  // z = 1
w = (float)x / y; // w = 3.5

// Augmented assignment
x += 2;   // x = 9
x -= 3;   // x = 6
x *= 2;   // x = 12
x /= 4;   // x = 3
x %= 4;   // x = 3

// Increment/decrement
x++       // x = 4
x--       // x = 3
y = x++   // x = 4, y = 3 (assign, then increment)
y = ++x   // x = 5, y = 5 (increment, then assign)
y = x--   // x = 4, y = 5
y = --x   // x = 3, y = 3
```
