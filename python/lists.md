---
prev:
  text: Functions
  link: "./functions"
next:
  text: Tuples
  link: "./tuples"
---

# Lists

Lists are one of the basic sequence types used in Python. They are ordered sequences of elements. These elements can be of any type: strings, numbers, Booleans, or even other lists. They are **mutable** and use **zero-based indexing**.

The basic syntax for creating a list can be seen below. If a list is too long to fit on a single line, you can break the list into multiple lines. In such cases it is customary to add a trailing comma after the last element of the list, and to break the line right after the opening square bracket and place the closing bracket on a new line as well.

```python
empty = []
friends = ["Peter", "Kate", "Alice", "Simon"]
rivers = ["Danube", "Nile", "Amazonas"]
cities = [
    "New York",
    "London",
    "Amsterdam",
    "Paris",
    "Berlin",
    "Madrid",
    "Tokyo",
    "Sydney",
]
```

You can also use the `list()` function to create a list from an iterable (e.g., a string)

::: tip Splitting string

The `list()` function can be used to split a string into a list of its characters.

```python
print(list("Hello")) # ['H', 'e', 'l', 'l', 'o']
```

::: info Heterogeneous lists

Python lists can store values of different types. Unlike some other languages (for example, R vectors), Python does not require all elements of a list to have the same type.

:::

## Reference types

[Variables in Python](./basics#reference-types) store **references** to objects. This behavior is not specific to lists - all Python variables store references to objects.

With immutable objects, operations that appear to modify the object actually create a new object and rebind the variable.

Lists are **mutable** objects. When you assign a list to a variable, the variable refers to that list object in memory. If you assign the same list to multiple variables, all will refer to the same underlying object. If you modify the list (e.g., add or change an item), all variables referring to it will see the modification.

```python
a = b = []
a.append("Hello")
print(b)    # ['Hello']
```

In contrast, creating two empty lists separately will create two independent references to different objects.

```python
a = []
b = a  # referring to same object
c = [] # independent list

a.append("spam")
print(b)    # ['spam']
print(c)    # []
```

To create a new list with the same elements as an existing list, you can use `.copy()`.

```python
a = [1, 2, 3]
b = a.copy()
a.append(4)

print(a)    # [1, 2, 3, 4]
print(b)    # [1, 2, 3]
```

## Working with Lists

The most important operations on lists include accessing elements or slices, modifying, adding or removing elements, and changing their order. More advanced operations include filtering elements, applying functions to elements, and reducing the list to a single value using an aggregating function.

### Accessing and Modifying Elements

You can reference elements of a list by using their index in square brackets. Python uses zero-based indexing, so the first element has index 0.
You can use _negative indices_ to access elements starting from the end of the list. Negative indices start with `-1`.

```python
friends = ["Peter", "Kate", "Alice", "Simon"]

friends[0]  # Peter
friends[2]  # Alice

friends[-1] # Simon
```

You can also use slicing, similarly to [strings](./strings#strings-as-sequences) to access portions of the list, by specifying the start (inclusive), stop (exclusive) and step values. All three are optional, and you can omit them.

```python
friends = ["Peter", "Kate", "Alice", "Simon", "John", "Susan", "Jim", "Mary"]
friends[2:4]    # ['Alice', 'Simon']
friends[:3]     # ['Peter', 'Kate', 'Alice']
friends[3:]     # ['Simon', 'John', 'Susan', 'Jim', 'Mary']
friends[::2]    # ['Peter', 'Alice', 'John', 'Jim']

```

Indexing can be used to replace the existing value in the list with another value. You can also use indexing to delete an element from the list using the `del` keyword.
However, you cannot use indexing to set new elements, because using an index that is out of bounds results in an `IndexError`.

```python
friends = ["Peter", "Kate", "Alice", "Simon"]

friends[0] = "John"
del friends[2]

print(friends)  # ['John', 'Kate', 'Simon']

# [!code error]
friends[3] = "Susan"
```

You can check whether an element is part of the list with the membership operator `in`

```python
if "Simon" in friends:
    print("Simon is my friend.")
```

### Nested Lists

You can have lists inside lists. This is often used to represent multidimensional arrays in Python. To access the nested list, you use regular indexing, and then to access an element of the nested list, you provide another index.

```python
personal_data = ["John", "Doe", 42, ["Peter", "Kate", "Alice", "Simon"]]

friends = personal_data[3]
best_friend = personal_data[3][0]
```

### Unpacking Values

Unpacking is a technique to assign values from a list to new variables. You will receive a `ValueError` if the number of variables doesn't match the number of elements, or you can use the `*` operator to collect remaining values. The result will be a list.

```python
personal_data = ["John", "Doe", 42, ["Peter", "Kate", "Alice", "Simon"]]
first_name, last_name, age, friends = personal_data

best_friend, *other_friends = friends
print(other_friends)    # ['Kate', 'Alice', 'Simon']
```

### List methods and functions

The most important list methods for adding and removing elements are

- `append(element)`: adds an element to a list (if a list is provided, it appends it as a single nested list)
- `extend(list)`: adds the elements of the provided list to the list as individual elements
- `insert(index, element)`: adds the element to the list at a specific index
- `remove(element)`: removes the first occurrence of an element from the list based on the value
- `pop(index)`: removes and returns an element at the specified index, the index defaults to the last element
- `clear()`: empties the list

```python
my_list = []

# Adding elements
my_list.append("spam")  # ['spam']
my_list.extend(["eggs", "bacon", "cheese"])   # ['spam', 'eggs', 'bacon', 'cheese']
my_list.insert(0, "beef")   # ['beef', 'spam', 'eggs', 'bacon', 'cheese']

# Modifying elements
my_list[-1] = "salad" # ['beef', 'spam', 'eggs', 'bacon', 'salad']

# Removing elements
my_list.remove("spam")  # ['beef', 'eggs', 'bacon', 'salad']
last = my_list.pop()   # last = 'salad'  my_list = ['beef', 'eggs', 'bacon']
del my_list[0]  # ['eggs', 'bacon']
my_list.clear() # []
```

You can sort the elements of a list using either the `sort()` method or the `sorted()` function. The `sort()` method sorts the list in place, so that it mutates the original list. In contrast, `sorted()` takes an iterable and returns a _new_ sorted list instead of modifying the original.

Both can accept an optional `key` argument, which can be a function using which the values are sorted. You can use a predefined function or define a lambda function to use with each element. Both accept a `reverse` argument (`True` or `False`) to switch between descending and ascending order.

You can also reverse the order of a list in place using the `reverse()` method.

```python
numbers = [2, 5, 3, 10, 7]
numbers.sort()

print(numbers)  # [2, 3, 5, 7, 10]

numbers = [2, 5, 3, 10, 7]
sorted_numbers = sorted(numbers)
print(sorted_numbers) # [2, 3, 5, 7, 10]
print(numbers) # [2, 5, 3, 10, 7]

numbers.reverse()
print(numbers) # [7, 10, 3, 5, 2]
```

You can find an element in the list by using the `index()` method. Python raises a `ValueError` if the element is not found. You can pass in an optional start and stop index to only look for the value in a slice.

You can count the times a value appears in a list with `count()`

```python
friends = ["Peter", "Kate", "Alice", "Simon"]
print(friends.index("Kate"))    # 1

orders = ["Salad", "Pasta", "Fish", "Pasta", "Pizza", "Hamburger"]
print(orders.count("Pasta"))    # 2
```

### Advanced list manipulation: filter, map and reduce

The two built-in functions `filter()` and `map()` are higher order functions that take a function and a list as their arguments.

- `filter()` will filter a list based on a function that returns `True` or `False` for every element of a list, and it will return a list with all the elements for which the function returns `True`.
- `map()` applies the function to every element of the list, and returns map object of the results, which can be converted to a list.

`reduce()` is a useful function from the `functools` package, that takes a function and a list, and applies the function cumulatively to the list. It can accept an optional initializer as its third argument, which it puts before the first element of the list.

```python
from functools import reduce


def is_even(num):
    return num % 2 == 0


def square(num):
    return num ** 2


def multiply(a, b):
    return a * b


numbers = [1, 2, 3, 4, 5]

# [!code highlight]
even_numbers = filter(is_even, numbers)
# [!code highlight]
squares = map(square, numbers)
# [!code highlight]
product = reduce(multiply, numbers)
```

## List Comprehension

::: tip Loops and Conditionals

Before reading this section get familiar with the basic `for` loop and conditional (`if`/`else`) statements.

:::

You can create and transform lists using list comprehensions as well. List comprehensions follow the general format `[expression for element in iterable if condition]`. The expression can include conditional (ternary) expressions or other operations.

A list comprehension always creates and returns a new list.

The **expression** is operation, function call, or constant evaluated for every element in the iterable. You can use ternaries in the expression for conditional logic.
The **iterable** can be a string, a list, a tuple, or a range. It can also be a function call or expression that returns an iterable.
The **condition** filters elements by including only those for which the condition evaluates to `True`. You can use complex conditions using `not`, `and` or `or`. You can chain multiple conditions to apply them sequentially.

For example you could create a list of squares from an original list using a regular for loop or `map()`

::: info Lambda function

The example below uses a lambda function. You can learn more about these [in the section on functions](./functions#lambda-functions).

:::

```python
numbers = [1, 2, 3]
squares_for = []

for num in numbers:
    squares_for.append(num ** 2)


# or, with map() and a lambda function
squares_map = list(map(lambda x: x ** 2, numbers))
```

But you can also use a list comprehension

```python
squares_comp = [x ** 2 for x in numbers]
```

You can also use list comprehensions for one-line filtering or any other types of manipulation with ternaries or conditional checks.

```python
even_numbers = [x for x in numbers if x % 2 == 0]
even_or_odd = ["even" if x % 2 == 0 else "odd" for x in numbers]
full_names = [first + " " + last for first, last in zip(first_names, last_names)]
```

### Nested list comprehensions

For more complex situations that you could solve with nested loops, you can use nested list comprehensions.

You can create a nested list to represent a 2D matrix using the following list comprehension:

```python
matrix = [[e for e in range(5)] for row in range(3)]
# [[0, 1, 2, 3, 4],
#  [0, 1, 2, 3, 4],
#  [0, 1, 2, 3, 4]]
```

This creates a list for each row. In this form, the outer comprehension creates one list per iteration, resulting in a list of lists.

```python
numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9, 10]]
evens = [[num for num in num_list if num % 2 == 0] for num_list in numbers]
# [[2], [4, 6], [8, 10]]
```

This is the same as:

```python
evens = []
for num_list in numbers:
    evens_in_sublist = []
    for num in num_list:
        if num % 2 == 0:
            evens_in_sublist.append(num)
    evens.append(evens_in_sublist)
```

If you want a flat list, you can chain the iteration parts of the list comprehension. You can use it to flatten a list of lists or to flatten and filter in a single step.

::: tip Order

Notice how the iterations and filtering conditions in the list comprehension follow the same order as they would in a nested loop with an if-clause.

:::

A chained list comprehension can be used instead of nested `for` loops for various tasks.

::: tabs

== List comprehension

```python
# FLATTEN LIST
all_nums = [num for num_list in numbers for num in num_list]
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# FLATTEN AND FILTER
evens = [num for num_list in numbers for num in num_list if num % 2 == 0]
# [2, 4, 6, 8, 10]

# CREATE TUPLES OF PAIRS
pairs = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
# [(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]
```

== Nested loops

```python
all_nums = []
for num_list in numbers:
    for num in num_list:
        all_nums.append(num)

evens = []
for num_list in numbers:
    for num in num_list:
        if num % 2 == 0:
            evens.append(num)

pairs = []
for x in [1, 2, 3]:
    for y in [3, 1, 4]:
        if x != y:
            pairs.append((x, y))
```

:::
