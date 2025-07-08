# Control Flow in Python

Under this title two main topics will be discussed: conditional logic and loops.

- Conditional logic makes it possible to run specific lines of code only if a condition is satisfied.
- Loops let us run the same code again and again without code duplication

## Conditional Logic

Conditional statements serve to run certain lines of code only if the condition we specify is true. To define our conditions, we use comparison and logical operators to express a potentially complex condition

### Comparison and Logical operators {#operators}

Python uses the usual operators to compare values.

```python
a == b          # equality
a != b          # not equal
a < b           # less than
a > b           # greater than
a <= b          # less than or equal to
a >= b          # greater than or equal to
```

Also, using logical operators we can reverse a condition or combine multiple conditions

- **not**: is `True` if initial condition was `False` and `False` if initial condition was `True`
- **and**: is `True` if both conditions are `True`, otherwise it is `False`
- **or**: is `True` if any of the conditions is `True`, and `False` if both conditions are `False`

```python
age >= 18 and age < 65
role == "admin" or department == "hr"
not isLoggedIn
```

::: info
In Python comparison, identity and membership operators can also be chained, so the following comparisons are also valid

```python
18 <= age < 65
height_mblanc < height_everest > height_kilimanjaro
```

However, chaining should be used for clarity and to improve readability, so don't overdo it
:::

Python also has identity operators, that do not compare the euality, but the identity of objects (if they are the same object, stored at the same memory location).

```python
x is y
x is not z
```

FInally, membership operators are an easy way to check if a value is present in a sequence (e.g. a List or a string)

```python
"e" in "Peter"                              # True
"Peter" not in ["Anna", "Bob", "Celeste"]   # True
```

::: info Precedence
In terms of operator precedence, comparison operators are evaluated first (after mathematical and bitwise operators), followed by `not`, `and` and finally `or`

```python
not a and b or c            # is the same as
((not a) and b) or c        # but differs for example from
not(a and (b or c))
```

:::

::: tip Best practice
Use parentheses when mixing comparison and logical operators for clarity.
Be careful when mixing `and` and `or` operators without parentheses!
:::

### If-else statements

### Match cases

## Loops
