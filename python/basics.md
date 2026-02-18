---
prev:
    text: Intro
    link: "../python"
next:
    text: Strings
    link: "./strings"
---

# Python Programming Basics

Python is an interpreted language, which means, that the Python scripts are executed line by line, from top to bottom.

The Python code is just a set of instruction, that the Python interpreter can understand and perform.

::: info Main entry point

This said, Python code is often structured in a way, that the main Python file, often named `main.py` defines a `main()` function, that is used as the main entry point of your program. This is not required, and Python will run your commands line by line if you don't do this. For example, in data science (e.g. if running Python in a Jupyter Notebook) it is typical to run your code line by line. However, having a main entry point makes your code more organized and readable.

:::

::: info `__name__ == "__main__"`

You may encounter the following code in Python applications:

```python
if __name__ == "__main__":
    main()
```

What this code block does, is that it makes sure that the code in the if-block only runs, if the file is executed directly, but it doesn't get executed if it is imported by another file as a module. This is often used in conjunction with a `main` function that is used as the entry point of your program.

Using this is a best practice if you are writing scripts that might double as libraries.

:::

## Printing to the Console

The most basic operation is printing to the console, which is done using the `print()` function. In its simplest form, `print` takes a value, variable name or expression as its argument, and prints the value to the console.

```python
print("Hello, World!")
print(42)
print(3 * 5)
print(2 + 2 == 5)
print(first_name)
print(upper("spam"))
```

:::info
There is no autoprint in Python. If we want to print something to the console, we need to wrap it in the `print()` function.
:::

If a string we want to print is too long, and want to use linebreaks, these can be escaped with the `\` backslash character.

```python
print("This will be \
printed on a single line \
despite being written \
in multiple lines in the \
source code")
```

Print can accept multiple arguments, and it would print them separated by space. The separator can be specified using the `sep` keyword argument. At the end, a new line is inserted, and the next print statements starts on a new line. This can be changed using the `end` keyword argument.

```python
print("Hello", "world")
print("a", "b", "c", sep="-")
print("First part.", end=" ")
print("This will continue in the same line")
```

Printing is also useful for debugging purposes. If the program behaves unexpectedly, and produces strange results, a way to debug is to print the results of individual steps to the console.

## Getting user input

You can use the `input()` function to get user input.

```python
name = input("What is your name? ")
age = input("How old are you? ")
```

::: warning Input is a string
The `input()` function always returns a string. If you want to get a number or any other type, you need to explicitly convert the input.

```python
age = int(input("How old are you? "))
```

:::

## Syntax Error

If you violate the Syntax rules of Python, your program will crash and you will get an error message printed to the console.

There are various types of Errors in Python. These are discussed in greater length in the section on [Error handling](./errors).

## Comments

In Python inline comments can be written after the `#` symbol. These can also be used to comment out a line of code, so it won't run.

Multi-line comments are written between two sets of `"""`. These are also used to document functions and classes. Triple quotation marks can be used to create multi-line strings to assign as values. Line breaks will be preserved.

```python
print("Hello, world!")  # This is a comment
# print("This won't be printed!")

"""
This comment could be extremely long,
and be split into multiple lines.
"""
```

## Variables

As in other programming languages, we store the values used by our program in variables. Value assignment happens with the `=` operator. One or more variables can be declared on one line.

Reassignment happens in the same way, we assign a new value to the same variable name with the `=` operator

```python
name = "Peter"    # name is now the string "Peter"
age = 27          # age is now the integer 27
age = "too old"   # age got reassigned and is now the string "too old"
has_dog = True
friends = ["Sam", "Kate", "Roger"]

product, price = "book", 12.99
# product now holds the string "book" and the price is the float 12.99

a = b = 5
# both a and b hold the number 5
```

### Variable names

In Python variable names may consist of small and capital letters, numbers, and the underscore (`_`), but cannot start with a number. Variable names are _case sensitive_.

The convention is to use the snake_case for variable names. Constants tend to have names in SCREAMING_SNAKE_CASE. Other casing (e.g. camelCase, PascalCase) is acceptable, but not Pythonic, while kebab-case in invalid.

Variable names should be informative and describe what it holds.

:::info No "real" constants

Python does not know constants as variables that cannot change value. It is a convention to indicate that a variable's value should not be changed by using SCREAMING_SNAKE_CASE, but its value can be changed.

:::

```python
first_name = "Peter"
ADULT_AGE = 18

lastName = "Smith"    # works, but not Pythonic
```

### Variable types

The type of the variable is determined automatically at assignment. The type of the variable at any time can be checked using the `type()` function.

Basic variable types are [strings](./strings), [integers, floats](./numbers) and [booleans](./conditionals). More complex data types are for example lists, tuples, dictionaries, and sets.

::: info None

`None` is a special value and type of variable in Python which signifies the absence of a value.

:::

```python
print(type("Hello world!"))   # str
print(type(25.1))             # float
print(type(2))                # int
print(type(False))            # bool
print(type(None))             # NoneType
```

You can use the `isinstance` function to check if a value is of a specific type.

```python
isinstance("Hello world", str)  # True
```

:::info Dynamic and Strong Typing

Python is dynamically and strongly typed. Variables can be reassigned to hold values of different types, than when they were first declared. However, there is no automatic type coercion, we need to explicitly convert variables to other types, if we want to pass them as arguments to functions that accept other types as parameters or when combining values of different types.

:::

The conversion of one type of value to another is also called _type casting_.

```python
age_string = str(25)   # the string "25"
age_int = int(age_string) # the int 25
age_float = float(age_int)  # the float 25.0
```
