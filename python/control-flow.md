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

### Truthy and Falsy values

Non-boolean values also have their boolean value. Some values are _truthy_ (used in a condition they evaluate to `True`), others _falsy_

Falsy values:

- `False`
- `None`
- the number `0` in any form
- empty sequences and collections: `""`, `[]`, `()`, `{}`, `set()`, `range(0)`

Truthy values:

- strings
- numbers other than 0
- non-empty sequences

```python
if user:
    print(user.name)

if not password:
    raise Exception("Pleas provide your password!")
```

### If-else statements

The classic way to run conditional logic is to use an _if/else_ statement. In Python the indentation distinguishes the if/else blocks from the code that runs outside the if/else statements.

The code indented after the `if` statement only runs, if the condition evaluates to `True`. If it evaluates to `False` the executions moves on to the code after the `if` block.

For code that we want to execute if the condition of the `if` block is evaluated to `False`, we can use the `else` keyword. This block will only run, if the original condition or (in the case of `elif` statements - see below) all the preceding conditions were evaluated to `False`.

Finally, we can use the `elif` keyword to check for other conditions, if the previous conditions were evaluated to `False`. Any number of `elif` statements can be used. The the first block with a condition that is satisfied will run.

```python
if size >= 10:
    return "Large"
elif size >= 5:
    return "Medium"
else:
    return "Small"
```

For simple, one-line `if` and `else` blocks, we can also use the one-liner version.

```python
return "Eligible" if age >= 18 else "Ineligible"
```

There may be nested `if/else` blocks withing any of the blocks to check for other conditions and have complex branching logic, but it is best to not overdo it.

**Guard clauses** and early returns in functions are a great way to simplify the code, and to make nested conditional statement flat.

:::tabs

== bad

```python
def process_user(user):
    if user is not None:
        if user.is_active:
            if user.has_permission("edit"):
                return "Access granted"
            else:
                return "Permission denied"
        else:
            return "User not active"
    else:
        return "No user provided"
```

== good

```python
def process_user(user):
    if user is None:
        return "No user provided"

    if not user.is_active:
        return "User not active"

    if not user.has_permission("edit"):
        return "Permission denied"

    return "Access granted"
```

:::

### Match cases

## Loops
