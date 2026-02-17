---
prev:
    text: Basics
    link: "./basics"
next:
    text: Numbers
    link: "./numbers"

---

# Strings

Strings in Python are sequences of characters surrounded by double, single quotes or a set of three single or double quotes (these latter are multi-line strings)

```python
string1 = "Hello, World!"
string2 = 'Single quotes can be used too'
multi_line = """The line
breaks will be preserved
in this string"""
multi_line2 = '''This works,
too.'''
```

If you want to include single of double quotes in a string, you either need to escape the character using `\` or use the other quotation mark:

```python
msq = "It's great to see you!"
quote = 'Peter said, "Hello, can anyone hear me?"'

escaped = "Peter said, \"Hello\""
escaped_msg = 'It\'s great to see you!'
```

## Working with Strings

### Immutability

Strings are immutable data types in Python. You can reassign a string variable to some other value, but you cannot add to a string, remove or replace its parts directly. There are ways to concatenate strings, replace substrings with other substrings, but these don't _mutate_ the string, but return a new string, and reassign the variable.

```python
greeting = "Hi"
greeting = "Hello"  # reassignment
greeting[0] = "J"   # [!code error]
```

### Concatenation and interpolation

A typical task is to concatenate shorter strings to form a longer string. The easiest way to do that is to use the `+` operator, which concatenates the two strings. If one of the operands isn't a string, you need to [cast it](./basics#variable-types) to a string first with the `str()` function.

Another typical task is to insert values or expressions into strings. This way you can create templates for strings and insert some parts dynamically. In modern Python (starting with version 3.6) f-strings are the most straightforward and popular way to do that.

```python
greeting = "Hello " + "world"
desc = "Peter is " + str(age) + " years old."

new_greeting = "Hello "
new_greeting += first_name

description = f"My name is {name}. I am {age} years old."
```

### Strings as sequences

Strings are treated in Python as sequences. You can use the membership operator (`in`) to check if a substring or character is part of a longer string. You can use the `len()` function to get the length of the string. Also, you can access characters or substrings using their indexes. You can also iterate over the characters of a string.

Slicing a string is done using square brackets. Inside these a single number will access a single character at the specified index. But you can define an interval with a start and an end (not inclusive) to access all characters from `start` up to, but not including `end`. You can also provide a third value (`step`) to only select every nth character.

::: info Indexes

In Python indexes start from `0`. You can use positive indexes to reference elements starting from the start of the string, and _negative_ indexes to count from the end of the string. Negative indexes start with `-1`

:::

You can omit any of the three values. If you don't specify `start`, the slicing will happen from the start of the string. If you omit `end`, all the characters to the end of the string will be selected. The default value of step is `1`. If you don't specify a `step`, every character will be included. A negative step value will reverse the string.

```python
"e" in "Hello"  # True
"bye" in "Goodbye" # True
len("Hello")  # 5

my_str = "Hello, world!"
my_str[0]   # "H"
my_str[4]   # "o"
my_str[-1]  # "!"
my_str[3:5] # "lo"
my_str[:3]  # "Hel"
my_str[:-1] # Hello, world"
my_str[7:]  # "world!"
my_str[:]   # "Hello, world!"
my_str[::2] # "Hlo ol!"
my_str[::-1] # "!dlrow ,olleH"
```

### Common string methods

upper, lower, casefold, capitalize, title strip, split, join, startswith, endswith, find, count, isupper, islower, replace
