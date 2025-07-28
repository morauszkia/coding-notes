# Loops

We use loops in programming, to run commands repeatedly. There are two types of loops in Python: `for` loops for when we know, how many times we want to run a block of code, and `while` loops for when we don't know in advance, how many times a block of code will run, but we want to run it while a condition is true.

Loops can be nested inside each other. In this case indentation determines, where a line of code belongs, inside which loop

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

This will print first "Outer loop", then "Inner loop" three times, and then the "Outer loop again" string, and then return to the beginning, and print the same nine additional times (10 times in total).

## For loops

For loops can be used to run a loop for a known number of times. In Python we iterate through an iterable, and perform actions for each value of the iterable.

The values can be (among others)

- a range of numbers
- characters of a string
- items in a list

```python
for i in range(3):
    print(i) # 0, 1, 2 will be printed

for i in range(1, 5):
    print(i) # 1, 2, 3, 4 will be printed

for num in range(6, 0, -2):
    print(i) # 6, 4, 2 will be printed

for char in "Python is awesome!":
    print(char)

for friend in ["Peter", "Tom", "Sarah", "Alice"]:
    print(f"Hello, {friend}!")
```

## While loops

While loops are used to run a block of code based on a condition. While the condition is true, the block of code is executed. Typically, we don't know, how many times the loop will run. Beware of infinite loops: if the condition cannot be change to `False`, the loop will keep running until the program crashes. You can avoid this by changing the value in each iteration or by breaking out of the loop if some other condition is met.

```python
health = INITIAL_HEALTH

while health > 0 and enemy_health > 0:
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

while True:
    print("You have the following options:")
    for i in range(len(options)):
        print(f"{i + 1}: {options[i]}")
    choice = input("What do you choose?")

    if choice == 0:
        print("Good bye!")
        break
```

## break and continue

In loops we might want to check for other conditions and execute certain lines of code only if some condition is `False`.

```python
shopping_list = ["milk", "pasta", "eggs", "spam", "bread", "rice"]

for item in shopping_list:
    if item == "spam":
        continue    # Skips the execution of the following lines and continues straight to the next value

    print("Buy " + item) # prints for "milk", "pasta", "eggs", "bread" and "rice"

for item in shopping_list:
    if item == "spam":
        break    # Breaks out of the loop entirely

    print("Buy " + item) # prints only for "milk", "pasta", and "eggs"
```

`break` can be used to finish loops that run `while True`.

## else with loops

Loops can be ended with an `else` statement, to run code if the loop was finished (we didn't `break` the execution).

```python
numbers = [1, 45, 32, 12, 60]

for number in numbers:
    if number % 8 == 0:
        # reject the list
        print("The numbers are unacceptable")
        break
else:    # Only if there was no number that is divisible by 8
    print("All those numbers are fine")

available_exits = ["north", "south", "east", "west"]

chosen_exit = ""
while chosen_exit not in available_exits:
    chosen_exit = input("Please choose a direction: ")
    if chosen_exit.casefold() == "quit":
        print("Game over")
        break
else: # This does not run if we quit
    print("aren't you glad you got out of there")
```

## Pass

Code blocks of loops (and conditional statements, and function bodies) cannot be empty. If we for any reason (for example, we want to implement something later) want to leave a block empty, we can use the `pass` keyword.

```python
for item in my_list:
    pass

while condition:
    pass
```
