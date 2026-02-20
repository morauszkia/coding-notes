---
prev:
    text: Strings
    link: "./strings"
next:
    text: Lists
    link: "./lists"
---

# Numbers

In Python numbers can be `int`s and `float`s. An `int` (integer) is a whole number that can be positive or negative. A `float` is a floating point number with decimal number. Floats can be positive or negative, too.

## Working with Numbers

The most important operations with numbers are the basic mathematical operations.

### Mathematical operations

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

### Most common functions

The most important built-in functions are `round()` (to round a number to specified number of decimal spaces), `abs()` (to get the absolute value) and `pow()` (for exponentiation).

```python
round(2.793)    # 3
round(2.793, 1) # 2.8
abs(-5)         # 5
pow(2, 3)       # same as 2 ** 3 = 8
```
