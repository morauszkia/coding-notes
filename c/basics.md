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
