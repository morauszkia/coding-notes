---
prev:
    text: "Lists"
    link: "./lists"
---

# Tuples

Tuples are ordered sequences of values, just like lists. Like list, they can be heterogeneous and hold values of any type: strings, numbers, Booleans, lists, tuples, etc.

However, unlike lists, tuples are immutable, and Python will raise a `TypeError` if you try to modify an item in a tuple.

::: tip Tuples vs. Lists

If you need an ordered dynamic collection where you can add, remove, and update elements, use a [list](./lists).
If you know you are working with a fixed and immutable collection of ordered data, use a tuple.

:::

Tuples are created using parentheses or by calling the `tuple()` function and passing an iterable as argument.

::: warning Single element

If you want to create a tuple with a single element, you _must_ use a trailing comma.

:::

```python
personal_details = ("Peter", 23, "Python Developer")
characters = tuple("Hello")
```

## Working with Tuples

### Accessing elements

Elements or slices of a tuple can be accessed using the same syntax as for lists. You will get an `IndexError` if the provided index is out of range.

```python
personal_details = ("Peter", 23, "Python Developer")
name = personal_details[0]
age_and_job = personal_details[1:]
```

::: warning Immutability

Unlike lists, you cannot reassign values in a tuple or delete individual elements using `del`. You would get a `TypeError` if you tried that. You can delete the whole tuple using `del my_tuple` but not individual elements.

:::

You can use the membership operator `in` with tuples as well. Similarly, the unpacking works with tuples as well. The `*` operator can be used to collect the remaining values into a [list](./lists)

```python
if "Python Developer" in personal_details:
    print("Hello, fellow Pythonista!")

name, age, job = personal_details
print(name) # Peter
```

### Tuple Methods

Tuples support two built-in methods:

- `count()`: counts the number of times a value occurs in the tuple
- `index()`: returns the first occurrence of a value

While you cannot sort a tuple in place, you can use the `sorted()` function to return a sorted list of the values in the tuple.

```python
fruits = ("Apple", "Pear", "Banana", "Pineapple")
sorted_fruits = sorted(fruits, key=len, reverse=True)
# ['Pineapple', 'Banana', 'Apple', 'Pear']
```
