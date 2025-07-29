---
prev:
  text: Algorithms
  link: "./algorithms"
next:
  text: Stacks
  link: "./stacks"
---

# Data Structures

Data structures are various ways to store, organize, manipulate and retrieve data efficiently. They are organizational tools that allow for more advanced algorithms.

They:

- store data
- organize data in a form, that makes it easy to access and modify data
- contain algorithmic functions to expose the ability to read, modify or remove data

Some built-in examples include Lists/Arrays, Dictionaries/Maps

::: info Definition
A data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.

-- Wikipedia Definition
:::

## Lists

Lists are one of the basic data structure in most programming languages. They are good in:

- appending items to the end of the list: e.g. `cars.append("Ford")` has on average an `O(1)` complexity
- accessing elements by index, e.g. `cars[1]` is `O(1)`
- deleting elements from the middle, e.g. `cars.pop(2)` is on average `O(n)`, because elements after the deleted one should be shifted down one index
- searching for an element, e.g. `cars.index("Ford")` is `O(n)`

Lists are not as great if we need to:

- frequently delete elements from the middle of the list
- frequently search for specific elements in the entire list

## Advanced Data Structures

The main examples are:

- [Stacks](./stacks)
- Queues
- Linked Lists
- Binary Trees
- Red Black Trees
- Hashmaps
- Tries
- Graphs
