---
prev:
    text: "Conditionals"
    link: "./conditionals"
next:
    text: "Functions"
    link: "./functions"
---

# Loops

We use loops in programming to run commands repeatedly. There are two types of loops in Python: `for` loops are used to iterate over an iterable (such as a range, string, or list), while `while` loops run as long as a condition is true.

## Ranges

Before describing the two main types of loops in Python, a short introduction on ranges is needed, because ranges are commonly used when we want to repeat something a specific number of times. The `range()` function returns an iterable sequence of numbers. It can be used with one, two or three parameters. The `range()` function only accepts integers.

```python
range(stop) # numbers from 0 up to but not including stop
range(start, stop) # numbers from start (included) up to but not including stop
range(start, stop, step) # numbers from start to stop (excluded) incremented by step
```

::: info Negative step

Negative step values are allowed to create a decreasing sequence of integers.

```python
for i in range(5):
    print(i)    # 0, 1, 2, 3, 4

for i in range(2, 5):
    print(i)    # 2, 3, 4

for i in range(0, 10, 2):
    print(i)    # 0, 2, 4, 6, 8

for i in range(5, 0, -1):
    print(i)    # 5, 4, 3, 2, 1
```

## For loops

For loops can be used to execute a block of code a specific number of times or once for each item in an iterable.

The values can be (among others)

- a [range](#ranges) of integers
- characters of a [string](./strings)
- items in a [list](./lists) or [tuple](./tuples)

```python
for i in range(3):
    print(i) # 0, 1, 2 will be printed

for char in "Python is awesome!":
    print(char)

for friend in ["Peter", "Tom", "Sarah", "Alice"]:
    print(f"Hello, {friend}!")
```

## While loops

While loops are used to run a block of code based on a condition. While the condition is true, the block of code is executed. Typically, we don't know how many times the loop will run. Beware of infinite loops: if the condition cannot be changed to `False`, the loop will keep running until the program crashes. You can avoid this by changing the value in each iteration or by breaking out of the loop if some other condition is met.

::: info

The code below relies on the `random` package for random generation.
`health` and `enemy_health` need to be set before running the loop.

`options` is a list of possible options (strings) from which the user can choose.

:::

```python
while health > 0 and enemy_health > 0: # [!code highlight]
    damage_dealt = random.randint(1, 10)
    print(f"You attack and deal {damage_dealt} to your enemy.")
    enemy_health -= damage_dealt
    if enemy_health <= 0:
        print("You win!")
    else:
        damage_taken = random.randint(1, 10)
        print(f"Enemy attacks and causes {damage_taken} damage.")
        health -= damage_taken
        if health <= 0:
            print("You died! GAME OVER")

while True: # [!code highlight]
    print("You have the following options:")
    for i in range(len(options)):
        print(f"{i + 1}: {options[i]}")
    choice = int(input("What do you choose?"))

    if choice == 0:
        print("Good bye!")
        break
```

## break and continue

In loops, we may want to skip certain iterations or exit the loop early based on a condition.

```python
shopping_list = ["milk", "pasta", "eggs", "spam", "bread", "rice"]

for item in shopping_list:
    if item == "spam":
        # [!code highlight]
        continue    # Skips the execution of the following lines and continues straight to the next value

    print("Buy " + item) # prints for "milk", "pasta", "eggs", "bread" and "rice"

for item in shopping_list:
    if item == "spam":
        # [!code highlight]
        break    # Breaks out of the loop entirely

    print("Buy " + item) # prints only for "milk", "pasta", and "eggs"
```

`break` can be used to finish loops that run `while True`.

## else with loops

Loops can include an `else` statement that runs if the loop finishes normally (i.e. without encountering a `break`).

```python
numbers = [1, 45, 32, 12, 60]

for number in numbers:
    if number % 8 == 0:
        # reject the list
        print("The numbers are unacceptable")
        break
# [!code highlight]
else:    # Only if there was no number that is divisible by 8
    print("All those numbers are fine")

available_exits = ["north", "south", "east", "west"]

chosen_exit = ""
while chosen_exit not in available_exits:
    chosen_exit = input("Please choose a direction: ")
    if chosen_exit.casefold() == "quit":
        print("Game over")
        break
# [!code highlight]
else: # This does not run if we quit
    print("aren't you glad you got out of there")
```

## Pass

Code blocks of loops (and conditional statements and function bodies) cannot be empty. If we for any reason (for example, we want to implement something later) want to leave a block empty, we can use the `pass` keyword.

```python
for item in my_list:
    pass

while condition:
    pass
```

## Nested Loops

Loops can be nested inside each other. In this case, indentation determines which loop a line of code belongs to.

```python
for i in range(10):
    # This inside the outer loop
    print("Outer loop")

    for j in range(3):
        # This is inside the inner loop
        print("Inner loop")

    # This is again inside the outer loop
    print("Outer loop again")
```

This will print first "Outer loop", then "Inner loop" three times, and then the "Outer loop again" string, and then return to the beginning and repeat this process nine more times (10 times in total).

## Enumerate and Zip

You can iterate over an iterable and keep track of the index at the same time using the `enumerate()` function, which returns an enumerate object of `(index, value)` tuples to iterate over. An optional `start` parameter can be used to specify the starting value for the count.

`zip()` can be used to iterate over multiple iterables in parallel. It combines the elements of the two lists and returns an iterator of tuples of pairs.

```python
for i, choice in enumerate(menu, start=1):
    print(f"{i}: {choice}")

names = ["Peter", "Susan", "Jim"]
pets = ["dog", "cat", "hamster"]

for name, pet in zip(names, pets):
    print(f"{name} has a {pet}")
```
