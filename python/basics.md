---
prev:
  text: Intro
  link: "../python"
next:
  text: Conditional Statements
  link: "./conditionals"
---

# Python Programming Basics

Python is an interpreted language, which means, that the Python scripts are executed line by line, from top to bottom.

The Python code is just a set of instruction, that the Python interpreter can understand and perform.

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

:::info
Python does not know constants as variables that cannot change value. It is a convention to indicate that a variable's value should not be changed by using SCREAMING_SNAKE_CASE, but its value can be changed.
:::

```python
first_name = "Peter"
ADULT_AGE = 18

lastName = "Smith"    # works, but not Pythonic
```

### Variable types

The type of the variable is determined automatically at assignment. The type of the variable at any time can be checked using the `type()` function.

Basic variable types are strings, integers, floats and booleans. More complex data types are for example lists, tuples, dictionaries, and sets.

```python
print(type("Hello world!"))   # str
print(type(25.1))             # float
print(type(2))                # int
print(type(False))            # bool
```

:::info
Python is dynamically and strongly typed. Variables can be reassigned to hold values of different types, than when they were first declared. However, there is no automatic type coercion, we need to explicitly convert variables to other types, if we want to pass them as arguments to functions that accept other types as parameters or when combining values of different types.
:::

The conversion of one type of value to another is also called _type casting_.

```python
age_string = str(25)   # the string "25"
age_int = int(age_string) # the int 25
age_float = float(age_int)  # the float 25.0
```

## Mathematical operations

Python supports the most important mathematical operations, and the `math` module has functions for more complex operations (e.g. `sqrt()`). Python handles operator precedence the usual way (_PEMDAS_) for mathematical operators.

```python
s = 5 + 7   # addition (becomes 12)
d = 7 - 3   # subtraction (becomes 4)
p = 2 * 4   # multiplication (becomes 8)
d = 8 / 2   # division (becomes the float 4.0)
i = 9 // 2  # floor division (becomes the int 4)
m = 10 % 3  # modulus (becomes 1)
e = 2 ** 3  # exponentiation (becomes 8)
```

For [bitwise operations](https://en.wikipedia.org/wiki/Bitwise_operation) Python offers the bitwise and, or, xor and not operators and left/right shift operators.

::: info Precedence
Mathematical operators have a higher precedence than bitwise operators
:::

```python
x << n      # shifts the bits of x left by n places (= x * 2**n)
x >> n      # shifts the bits of x right by n places (= x // 2**n)
x & y       # bitwise and (sets each bit to 1 if both bits are 1)
x | y       # bitwise or (sets each bit to 1 if any of the bits is 1)
x ^ y       # bitwise xor (sets each bit to 1 if and only if one of the bits is 1)
~x         # bitwise not (sets each bit to 1 if it was 0, and to 0 if it was 1)
```

::: info Comparison & Logical operators
Python also has comparison and logical operators. You can read about them more in the section on [Conditional Statements](./conditionals#operators)
:::

### Augmented Assignment

If we want to reassign a variable based on the current value (e.g. we want to increment the value by a specific amount), we can use augmented assignment.

```python
num = 10
num += 1  # Same as num = num + 1: num is 11
num -= 2  # num is 9
num *= 2  # num is 18
num /= 3  # num is 6.0
num //= 2 # num is 3
num **= 3 # num is 27
num %= 2  # num is 1
```
