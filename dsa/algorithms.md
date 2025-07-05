# Algorithms

In computer science, an algorithm is a finite sequence of well-defined instructions, that the computer can implement

Algorithms are often written in _pseudocode_, because these are not tied to any specific programming language.

Algorithms are often evaluated based on their [time complexity](./time-complexity)

## Binary Search

Binary search is a searching algorithm, that works on a pre-sorted list, and is a great example of an algorithm that has [time complexity](./time-complexity) of `O(log n)`.

Pseudocode:

- Given two inputs:
  1. A list of `n` elements sorted from smallest to greatest
  2. A `target` value
- Do the following:
  1. Set `low = 0` and `high = n - 1`
  2. While `low < high`:
     1. Set `median` to `(low + high) // 2`: the greatest integer that is `<= (low + high) / 2`
     2. If the median in the list is equal to the target, return `true`
     3. Else if the median of the list is less than the target, set `low = median + 1`
     4. Else set `high = median - 1`
  3. Return `false` (the element was not found)

At each iteration the list is halved, which makes the algorithm of `O(log n)` complexity. Therefore binary searches are fast.

## Sorting Algorithms

Often actions in an application rely on sorted data. There are multiple algorightms of various time complexities to sort the data.

### Bubble Sort

Bubble sort repeatedly steps through a slice and compares adjacent elements, swapping them if they are out of order. It continues to loop over the slice until the whole list is completely sorted.

Pseudocode:

1. Set `swapping` to `true`
2. Set `end` to the end of the input list
3. While `swapping` is `true`:
   1. Set `swapping` to False
   2. For `i` from the 2nd element to `end`:
      - if the `(i-1)`th element is greater than the `i`th:
        1. Swap the two elements (the larger moves one place, and in the next step will be compared to the next element)
        2. Set `swapping` to `true` (swapping remains false if no two items out of order are found)
   3. Decrement `end` by one (this is an optimization, because we can be sure, that the nth largest element is in its right place after n runs)
4. Return sorted list

Bubble sort's time complexity is `O(n^2)`. At best it has an `O(n)` complexity, if the array is pre-sorted. The worst case scenario is an array in reverse order. Therefore, bubble sort is an algorithm that is fairly simple, and a great place to start learning about algorithms, but not an efficient way to sort data. It is almost never used in practice.

### Merge Sort

Merge sort is a [recursive](../advanced-concepts/functional#recursion) sorting algorithm of the _divide and conquer_ type:

- Divide: it divides the problem into smaller problems, and recursively solves these
- Conquer: after solving the smaller problems it combines the results to solve the larger problem

Pseudocode:

The algorithm consists of two separate functions: `merge_sort` and `merge`

The `merge_sort` function divides the list of elements into two equal halves, calls itself on each half, and then merges the sorted halves back together.

Input: A, an unsorted list of integers

1. If the length of A is less than 2, it is already a sorted list of one element, return the list
2. Otherwise split the list into two halves down the middle
3. Call `merge_sort` on both halves
4. Return the result of `merge(sorted_left_side, sorted_right_side)` on the results of the two `merge_sort` calls.

The `merge` function merges two sorted lists together into a single sorted list. At the lowest level it merges two lists of one element each. All "real" sorting happens in this function.

Input: Sorted lists of integers A and B

1. Create empty `final` list
2. Set `i` and `j` to the first index (these keep track of the current elements of the individual lists)
3. Use loop to compare the current elements of the two lists.
   - If the element in the A list is less than or equal to the current element in the B list, add it to final list and increment `i`.
   - Otherwise add item from B to final list, and increment `j`.
   - Continue until all elements from one of the lists was added.
4. Add the remaining elements from the other list to the final list
5. Return the final list

Merge sort has `O(n*log(n))` complexity. Merge sort is much faster than bubble sort, and is a _stable sort_, which means that values with duplicate keys in the original list will be in the same order in the final list.

But: merge sort requires more memory, because it needs to store extra subarrays in memory. Furthermore, recursive function calls can incur performance penalty in certain languages (e.g. Python).

### Insertion Sort

### Quicksort
