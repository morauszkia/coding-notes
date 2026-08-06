---
prev:
  text: "Dictionaries"
  link: "./dictionaries"
---

# Sets

Sets are unordered collections of unique elements. Because sets use hashes to store their elements, sets may contain items that are of **hashable** type.

They can be created using curly braces or with the `set()` constructor function. You can pass in an iterable to the `set()` function to create a set. This is a common way to remove duplicate elements from a list.

::: warning Empty set

To create an empty set you must use the function, because an empty set of curly braces would create an empty dictionary. Sets are mutable, and we will deal with adding and removing elements below.

:::

```python
my_numbers = {1, 2, 3, 4, 5}
same_numbers = set(range(1, 6))
same_numbers_strings = set("12345")
empty_set = set()

visiting_friends = ["Peter", "Susan", "Kate", "Peter", "Jim", "Susan" "Greg", "Peter" "Tom", "Anna"]
my_friends = set(visiting_friends)
```

::: warning Indexing

As sets are unordered, you can't index or slice a set.

:::

::: info Equality

Two sets are equal if they contain the same items. As sets are unordered, the order we list the items when we create the set doesn't matter.

:::

## Type hints

As with [lists](./lists#type-hints), you can add type hints to sets using the `set` container type with or without the type of the items specified.

```python
friends_set: set[str] = {"Sam", "Julia", "Bob"}
```

## Set operations

One of the most common operations on sets is to check membership. You can do that with the `in` membership operator.

```python
if "Peter" in my_friends:
    print("Peter is my friend.")
```

::: tip Effective membership check

Sets are great if you need to check if a value is valid based on a huge collection of valid values. Membership testing is faster with sets, because they use hashes to store items. If you use a list for membership check, Python needs to loop over the list to check for equality.

:::

The **union** of two or more sets is the set of all items that appear in any of the sets. You can create a union of two sets with the `set_one.union(set_two)` method or the `set_one | set_two` expression.

The **intersection** of two or more sets is the set of items that appear in all sets. You can create an intersection usint the `set_one.intersection(set_two)` method or with the `set_one & set_to` expression.

The **difference** of one set and another is the set of items that appear in the first set, but not in the second. In Python you can use the `set_one - set_two` expression to get the difference of two sets or the `set_one.difference(set_two)` method.

A **symmetric difference** consists of all items that are in either of the sets, but not in all of the sets. It is the opposite of the intersection of the two sets. You can get it using `set_one.symmetric_difference(set_two)` or `set_one ^ set_two`.
