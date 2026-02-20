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

## Escaped characters

As seen with quotation marks, Python treats `\` in a string as an escape operator. It tells the interpreter that the next character should be treated differently. For example, you can use `\n` to insert a new line or `\t` to insert a tab.

If you want to actually insert a backslash in your string, you need to escape it with another backslash (see below).

```python
print("This will be\nin two lines")
print("There's a tab\tin this string")
print("C:\\Users\\username")
```

You can also use raw strings:

```python
print(r"C:\Users\username")
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

You can use the `*` operator with an integer to print the string a specified number of times in a row.

Another typical task is to insert values or expressions into strings. This way you can create templates for strings and insert some parts dynamically. In modern Python (starting with version 3.6) f-strings are the most straightforward and popular way to do that.

```python
greeting = "Hello " + "world"
desc = "Peter is " + str(age) + " years old."

new_greeting = "Hello "
new_greeting += first_name

description = f"My name is {name}. I am {age} years old."
```

You can add [optional format specifiers](https://docs.python.org/3/library/string.html#formatspec) after the expressions.

These follow the template:

```text
:[[<fill>]<align>][<sign>][#][0][<width>][<group>][.<prec>][<type>]
```

The most commonly used parts are:

- _fill_: can be any character
- _align_: can be `<` for left, `>` for right, `^` for center alignment or `=` for numbers, to place the sign at the edge of the available space
- _sign_: can be `+` to show the sign for both positive and negative numbers, `-` to only show the sign for negative numbers and ` ` (space) to put a space before positive numbers
- _width_: positive integer that specifies the minimum total field width
- _precision_: how many digits should be displayed after the decimal point
- _group_: `,` or `_` specifies digit group separator
- _type_: presentation types - useful types are:
  - integers
    - `b`: binary
    - `d`: decimal integer
    - `o`: octal format
    - `x` or `X`: hex format using lower or upper case
    - `n`: using current locale settings to determine digit group separators
  - floats
    - `e` or `E`: scientific notation
    - `f`: fixed point notation
    - `n`: use locale settings
    - `%`: multiplies by 100 and displays fixed format followed by a percent sign

```python
print(f'The value of pi is approximately {math.pi:.3f}.')
# The value of pi is approximately 3.142.

```

### Older ways of interpolation

Besides _f-strings_ (formatted string literals), in older Python code you might encounter other ways to interpolate values.

One is [printf-style string formatting](https://docs.python.org/3/library/stdtypes.html#old-string-formatting) similar to that used in [C](/c/basics#format-specifiers) or [Go](/go/variables#formatting-strings).

```python
print("Pi is approx. %.2f" % (22 / 7))
# Pi is approx. 3.14
print('%s has %d quote types.' % ('Python', 2))
# Python has 2 quote types.
print('%(language)s has %(number)03d quote types.' %
      {'language': "Python", "number": 2})
# Python has 002 quote types.
```

Another is to use the [`str.format()` method](https://docs.python.org/3/tutorial/inputoutput.html#the-string-format-method), which uses curly braces with optional numbers that indicate position or keyword arguments to assign values to placeholders. You can even use a dictionary to provide the values.

```python
print('We are the {} who say "{}!"'.format('knights', 'Ni'))
# We are the knights who say "Ni!"
print('{0} and {1}'.format('spam', 'eggs'))
# spam and eggs
print('This {food} is {adjective}.'.format(
      food='spam', adjective='absolutely horrible'))
# This spam is absolutely horrible.

person = {
  "name": "Eric Idle",
  "birthdate": 1943,
  "profession": "actor",
}
print("{name}, born in {birthdate} is a famous {profession}".format(**person))
# Eric Idle, born in 1943 is a famous actor
```

::: tip

The Python documentation suggests using the newer f-string or `.format()` for string interpolation. you can find additional advanced use cases [in the Python docs](https://docs.python.org/3/tutorial/inputoutput.html#formatted-string-literals).

:::

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

For common tasks involving strings there are methods defined on the string class. The most important are

- `str.upper()`: returns a string where all characters are in upper case
- `str.lower()` and `str.casefold()`: return a string with all characters in lower case
- `str.capitalize()`: returns the string where the first character is in upper case and all the others are in lower case
- `str.title()`: returns a string where the first character of every word is in upper case
- `str.strip(chars)`, `str.lstrip(chars)` and `str.rstrip(chars)`: remove characters from the ends of strings (defaults to empty space, but other characters can be passed in as a string)
- `str.split(separator, maxsplit)`: will split the string on every occurence of the substring passed in as an argument, and we can specify how many splits to do (default is all occurrences)
- `str.join(list)`: will join the elements of the list with the string as separator
- `str.startswith(prefix)`, `str.endswith(suffix)`: return a Boolean depending on whether the string starts or ends with the specified substring
- `str.find(sub[, start[, end]])` or `str.rfind(sub[, start[, end]])`: will find the index of the first occurrence of the substring, optionally a start/end can be passed in to limit the search by indices. `rfind` does the same but starts from the end. Return `-1` on failure
- `str.index(sub[, start[, end]])` and `str.rindex(sub[, start[, end]])`: same as above, but raise `ValueError` when _sub_ is not found
- `str.count(sub[, start[, end]])`: will count how many times some substring appears in the string
- `str.isupper()` and `str.islower()`: return a Boolean depending on if the string consists of only upper/lower case characters
- `str.replace(old, new, /, count=-1)`: replaces all occurrences (if count specified, only first occurrence) of _old_ by _new_
- `str.translate(table)`: uses a translation table to replace characters in the string. You can use `str.maketrans(from, to)` static method to create the translation table

For more information visit [the Python docs on string methods](https://docs.python.org/3/library/stdtypes.html#string-methods).
