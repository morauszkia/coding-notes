---
prev:
  text: "Lists"
  link: "./lists"
next:
  text: "Conditionals"
  link: "./conditionals"
---

# Tuples

Tuples are ordered sequences of values, just like lists. Like list, they can be heterogeneous and hold values of any type: strings, numbers, Booleans, lists, tuples, etc.

However, unlike lists, tuples are immutable, and Python will raise a `TypeError` if you try to modify an item in a tuple.

::: tip Tuples vs. Lists

If you need an ordered dynamic collection where you can add, remove, and update elements, use a [list](./lists).
If you know you are working with a fixed and immutable collection of ordered data, use a tuple.

:::

Tuples are created by assigning multiple values separated with a comma, optionally surrounded by parentheses to a variable or by calling the `tuple()` function and passing an iterable as argument.

```python
personal_details = ("Peter", 23, "Python Developer")
chars = tuple("Hello")
film = "Life of Brian", "Monty Python", 1979
```

::: warning Single element

If you want to create a tuple with a single element, you _must_ use a trailing comma.

```python
my_tuple = ("spam",)
```

:::

## Working with Tuples

As sequences, several operations that can be performed with a [list](./lists#working-with-lists) or a [string](./strings#working-with-strings) also work with tuples. For instance, we can iterate over the elements of the tuple with a [`for` loop](./loops#for-loops). You can use the membership operator `in` with tuples as well.

```python
for information in film:
    print(information)

if "Python Developer" in personal_details:
    print("Hello, fellow Pythonista!")

```

The number of elements in a tuple can be accessed using `len()`.

Concatenating tuples with the `+` operator returns a new tuple, and using the `*` operator returns a new tuple with the elements repeated a specified number of times.

### Unpacking

Similarly, the unpacking works with tuples as well. The `*` operator can be used to collect the remaining values into a [list](./lists)

```python
name, age, job = personal_details
print(name) # Peter
```

::: info `*` position

The variable that collects remaining elements doesn't have to be the last one.

```python
fruits = ("apple", "mango", "papaya", "pineapple", "cherry")
green, *tropic, red = fruits

print(tropic)           # ['mango', 'papaya', 'pineapple']
```

:::

You can unpack nested tuples as well.

```python
albums = [
    ("Welcome to my Nightmare", "Alice Cooper", 1975,
     [
         (1, "Welcome to my Nightmare"),
         (2, "Devil's Food"),
         (3, "The Black Widow"),
         (4, "Some Folks"),
         (5, "Only Women Bleed"),
     ]
     ),
    ("Bad Company", "Bad Company", 1974,
     [
         (1, "Can't Get Enough"),
         (2, "Rock Steady"),
         (3, "Ready for Love"),
         (4, "Don't Let Me Down"),
         (5, "Bad Company"),
         (6, "The Way I Choose"),
         (7, "Movin' On"),
         (8, "Seagull"),
     ]
     ),
]

# [!code highlight]
for index, (title, artist, year, songs) in enumerate(albums):
    print(f"{index+1}: {title}")
```

### Accessing elements

Elements or slices of a tuple can be accessed using the same syntax as for lists. You will get an `IndexError` if the provided index is out of range.

```python
personal_details = ("Peter", 23, "Python Developer")
name = personal_details[0]
age_and_job = personal_details[1:]
```

::: warning Immutability

Unlike lists, you cannot reassign values in a tuple or delete individual elements using `del`. You would get a `TypeError` if you tried that. You can delete the whole tuple using `del my_tuple` but not individual elements. Or you can first create a list from the elements of the tuple, modify them, and finally, create a tuple from the elements again.

```python
my_tuple = ("apple",)
my_list = list(my_tuple)
my_list.append("lemon")
my_tuple = tuple(my_list)
```

:::

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
