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

### List methods

The most important list methods for adding and removing elements are

- `append(element)`: adds an element to a list (if a list is provided, it appends it as a single nested list)
- `extend(list)`: adds the elements of the provided list to the list as individual elements
- `insert(index, element)`: adds the element to the list at a specific index
- `remove(element)`: removes the first occurrence of an element from the list based on the value
- `pop(index)`: removes and returns an element at the specified index, the index defaults to the last element
- `clear()`: empties the list

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
