---
prev:
  text: Data Structures and Algorithms Menu
  link: "./"
next:
  text: Algorithms
  link: "./algorithms"
---

# Time Complexity

There is a need to distinguish between algorithms that solve the same problem by looking at how much time or memory they need to run.

**Big O** analysis is one way to compare algorithms based on their time complexity. It characterizes the algorithms based on their _worst-case growth rates_. It is written in the form `O(formula)`, where the formula describes how the time or space requirements of the algorithm grow as the size of the input grows.

Some examples:

- `O(1)` means, that the algorightm takes the same amount of time and/or space to run, regardless of the size of the
- `O(log n)` shows a logarithmic relationship
- `O(n)` shows, that the relationship is linear: an input twice the size of another makes the algorithm need twice the time to run
- `O(n^2)` shows a squared relationship
- `O(2^n)` shows exponential growth - the time needed to run the algorithm grows drammatically with the growth in the size of the input
- `O(n!)` shows even faster factorial growth

![Big-O complexity comparison chart](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*5ZLci3SuR0zM_QlZOADv8Q.jpeg)

Constants don't matter in Big-O analysis, only how the differences in the size of the input are related to the time necessary to run the algorithm. Constants affect the runtime, but not the _growth of the runtime_, and Big-O analysis is concerned with the latter.

The following two functions have the same time complexity despite that the second function is expected to take twice as much time to run:

```python
def print_names_once(names):
    for name in names:
        print(name)


def print_names_twice(names):
    for name in names:
        print(name)
    for name in names:
        print(name)
```

## O(n)

`O(n)` is very common case: when the number of steps in an algorithm grows at the same rate as the size of the input - this is the case when we loop through an array: the more items it has, the more times the loop has to run. The relationship between the size of the array and the time needed is linear.

## O(n^2) and O(nm)

`O(n^2)` describes a growth in complexity that is much faster than the linear - this relationship can be illustrated with the quadratic function. These algorithms are only useful for small and medium input sizes. This is the case, if we need to use a nested loop, and the number of necessary iterations in both loops is the same as the input size. E.g. if we want to get all pairs from a set of persons.

`O(nm)` is a very similar case, but this happens, when there are two inputs of different sizes. The distinction between the two can be useful, if the sizes of the two inputs increase at a different pace.

## Fast algorithms: O(1) and O(log n)

`O(1)` describes algorithms that take the same time to run regardless of the input size. Dictionary lookups are O(1). Which is one of the reasons dictionaries and dictionary-equivalents in other languages are used all over the place.

`O(log n)` is only slightly slower, than `O(1)`. These grow only according to the `log` of the size of input. A Binary Search algorithm is a great example of an `O(log n)` algorithm, because the doubling of the input size only increases the number of steps by 1.

## Polynomial vs. Exponential - Reduction to P

Some of the above time complexities fall into the _polynomial_, while others into the _exponential_ group. Polynomial algorithms tend to run faster, because their runtime does not grow faster than `n^k`, where `k` is a constant, and `n` is the size of the input. In comparison, exponential algorightms grow at a much higher rate.

Algorithms that run in polynomial types fall into type P, and they are _practical_ to solve with computers. Algorithms that don't fall into the P type are, in comparison, impractical.

**Reduction to P** is the process of turning an exponential algorithm into a polynomial one.

The following algorithm to find the nth Fibonacci number runs in exponential time. It needs to call itself twice within each call (unless n is less than or equal to 1). As n grows, the number of times the function is called, grows exponentially.

```python
def fib(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)
```

We can rewrite the algorithm to have it run in polynomial time: It uses a single for loop, which makes it `O(n)` and updates the values of the three variables it uses to keep track of the numbers in the sequence

```python
def fib(n):
    if n <= 1:
        return n
    current = 0
    parent = 1
    grandparent = 0
    for i in range(0, n - 1):
        current = parent + grandparent
        grandparent = parent
        parent = current
    return current
```

Another problem with exponential complexity is the _power set_: we want to get all possible subsets of a given set of values.

```python
def power_set(input_set):
    if len(input_set) == 0:
        return [[]]

    all_subsets = [[]]
    for element in input_set:
        subsets_with_element = []
        for subset in all_subsets:
            subsets_with_element.append(subset + [element])
        all_subsets.extend(subsets_with_element)
    return all_subsets
```
