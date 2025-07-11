---
prev:
  text: "Basics"
  link: "./basics"
next:
  text: "Loops"
  link: "./loops"
---

# Conditional Logic

Conditional statements serve to run certain lines of code only if the condition we specify is true. To define our conditions, we use comparison and logical operators to express a potentially complex condition

## Comparison and Logical operators {#operators}

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

## Truthy and Falsy values

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

## If-else statements

The classic way to run conditional logic is to use an _if/else_ statement. In Python the indentation distinguishes the if/else blocks from the code that runs outside the if/else statements.

The code indented after the `if` statement only runs, if the condition evaluates to `True`. If it evaluates to `False` the executions moves on to the code after the `if` block. If the block consists of a single line of code, we can write it right after the colon.

```python
if age >= 18: print("You may vote!")
```

If the condition of the `if` statement was `False`, we can use the `elif` keyword. `elif` tells the Python interpreter to try another condition, if all the previous conditions were evaluated to `False`. Any number of `elif` statements can be used. The the first block with a condition that is satisfied will run.

For code that we want to execute if the condition of the `if` block and all `elif` conditions (if there are such) are evaluated to `False`, we can use the `else` keyword. This block will only run, if all the preceding conditions were evaluated to `False`.

```python
if size >= 10:
    return "Large"
elif size >= 5:
    return "Medium"
else:
    return "Small"
```

For simple, one-line `if` and `else` blocks, we can also use the one-liner version also called _ternary operator_ or _conditional expression_.

```python
return "Eligible" if age >= 18 else "Ineligible"
print("A") if a > b else print("B") if b > a else print("Equal")
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

## Match cases

From Python v3.10, the `match` statement can be used as a concise form instead of writing many `if... elif... else` blocks. It is similar, but not identical to the `switch` statement found in C, Java or JavaScript (or other languages).

The expression after `match` is evaluated and then compared with the value of each `case`. If there is a match, the associated block of code will be executed.

Default case can be expressed as `case _` at the end. This value will always match.

In the simplest form, we can match literal values.

```python
match day:
    case 5:
        print("Today is Saturday.")
    case 6:
        print("Today is Sunday")
    case _:
        print("Today is a weekday")
```

We can check for more values in a single `case` statement with the `|` (_or_ or _pipe_) operator.

```python
match month:
    case "Feb":
        print("This month has 28 or 29 days.")
    case "Jan" | "Mar" | "May" | "Jul" | "Aug" | "Oct" | "Dec":
        print("This month has 31 days")
    case "Apr" | "Jun" | "Sep" | "Nov":
        print("This month has 30 days")
    case _:
        print("I have no idea which month you are referring to.")
```

We can check for additional conditions with the `if` keyword.

```python
match month:
    case "Feb" if is_leap_year(year):
        print("This month has 29 days.")
    case "Feb" if not is_leaf_year(year):
        print("This month has 28 days.")
    case "Jan" | "Mar" | "May" | "Jul" | "Aug" | "Oct" | "Dec":
        print("This month has 31 days")
    case "Apr" | "Jun" | "Sep" | "Nov":
        print("This month has 30 days")
    case _:
        print("I have no idea which month you are referring to.")
```

### Advanced uses

We can bind values to variables in the `case` statements. These variables can be used in the `if` clause or the body of the case.

```python
# point is an (x, y) tuple
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"Y={y}")
    case (x, 0):
        print(f"X={x}")
    case (x, y):
        print(f"X={x}, Y={y}")
    case _:
        raise ValueError("Not a point")
```

Match can also be used with classes.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def location(point):
    match point:
        case Point(x=0, y=0):
            print("Origin is the point's location.")
        case Point(x=0, y=y):
            print(f"Y={y} and the point is on the y-axis.")
        case Point(x=x, y=0):
            print(f"X={x} and the point is on the x-axis.")
        case Point():
            print("The point is located somewhere else on the plane.")
        case _:
            print("Not a point")
```

Patterns can be also nested e.g. inside a list

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def location(point):
    match point:
        case Point(x=0, y=0):
            print("Origin is the point's location.")
        case Point(x=0, y=y):
            print(f"Y={y} and the point is on the y-axis.")
        case Point(x=x, y=0):
            print(f"X={x} and the point is on the x-axis.")
        case Point():
            print("The point is located somewhere else on the plane.")
        case _:
            print("Not a point")
```

Patterns of lists or tuples can be matched this way, and combining the various possibilities (if clauses, alternatives, binding to variables, wildcard) enables us to match complex patterns, which makes `match` a powerful tool for pattern matching.

::: tabs

== if

```python
match command.split():
    case ["go", direction] if direction in current_room.exits:
        current_room = current_room.neighbor(direction)
    case ["go", _]:
        print("Sorry, you can't go that way")
```

== alternatives

```python
match command.split():
    case ["go", ("north" | "south" | "east" | "west") as direction]:
        current_room = current_room.neighbor(direction)
```

== wildcard

```python
def describe(seq):
    match seq:
        case ["🐸", *_, "🦋", "🌼"]: return "Starts with frog and ends with a flower, with a butterfly in between"
        case ["🐸", *_, "🦋"]: return "Starts with frog and ends with a butterfly"
        case [*_, "🦋"]: return "Ends with a butterfly"
        case ["🐸", *_, "🌼"]: return "Starts with frog"
        case ["🐸", *_]: return "Starts with frog"
        case []: return "An empty sequence"
        case [*_]: return "A sequence of things"
        case _: return "Not a sequence"
```

:::

## Pass

If blocks (and loops, and function bodies) cannot be empty. If we for any reason (for example, we want to implement something later) want to leave a block empty, we can use the `pass` keyword.

```python
if condition:
    pass
```
