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

:::tabs

== python

```python
def binarySearch(arr, targetVal):
  left = 0
  right = len(arr) - 1

  while left <= right:
    mid = (left + right) // 2

    if arr[mid] == targetVal:
      return mid

    if arr[mid] < targetVal:
      left = mid + 1
    else:
      right = mid - 1

  return -1
```

:::

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

:::tabs

== python

```python
def bubble_sort(nums):
    swapping = True
    end = len(nums)
    while swapping:
        swapping = False
        for i in range(1, end):
            if nums[i - 1] > nums[i]:
                temp = nums[i - 1]
                nums[i - 1] = nums[i]
                nums[i] = temp
                swapping = True
        end -= 1
    return nums
```

:::

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

:::tabs

== python

```python
def merge_sort(nums):
    if len(nums) < 2:
        return nums
    first = merge_sort(nums[: len(nums) // 2])
    second = merge_sort(nums[len(nums) // 2 :])
    return merge(first, second)


def merge(first, second):
    final = []
    i = 0
    j = 0
    while i < len(first) and j < len(second):
        if first[i] <= second[j]:
            final.append(first[i])
            i += 1
        else:
            final.append(second[j])
            j += 1
    while i < len(first):
        final.append(first[i])
        i += 1
    while j < len(second):
        final.append(second[j])
        j += 1
    return final
```

:::

### Insertion Sort

Insertion sort is a _really_ slow algorithm: in Big-O terms it is slower than merge sort, but it's actually faster than the latter on small lists due to smaller constants. It is also a fairly simple algorithm when it comes to its logic: we iterate through the input list, and move backwards from the current position and swap while we find elements, that are out of order.

Pseudocode:

For each index (`i`) in the input list:

1. We set `j` to the current index
2. While `j` is greater than 0 and element at `j-1` is greater than the one at index `j`:
   - we swap the two elements
   - and decrement `j` by 1.
3. We return the list

The best case is a small pre-sorted list, which lets the algorithm run in `O(n)`, because we still have to iterate through the list. An average case is `O(n^2)` because the inner loop is expected to execute half the time. The worst case is also `O(n^2)` and really slow, because the inner loop will execute every time.

Insertion sort is:

- fast for small input lists (even faster than quick sort)
- adaptive: faster for partially sorted data sets
- stable: does not change relative order of elements with equal keys
- in-place: only requires constant amount of memory
- inline: sorts a list as it receives it

Many production sorting implementations use insertion sort for lists of `n<=10`, because there is no overhead due to recursion, no unnecessary copies of subarrays, and is a stable sort algorithm.

:::tabs

== python

```python
def insertion_sort(nums):
    for i in range(len(nums)):
        j = i
        while j > 0 and nums[j - 1] > nums[j]:
            nums[j], nums[j - 1] = nums[j - 1], nums[j]
            j -= 1
    return nums
```

:::

### Quicksort

Quick sort is an efficient sorting algorightm widely used in production sorting implementations above a threshold. It is also a recursive _divide and conquer_ type algorithm, like [merge sort](#merge-sort).

Pseudocode:

1. Choose a pivot element, that will _preferably_ end up close to the middle of the sorted list
2. Move through the elements and swap them around, until all the elements that are _less than_ the pivot are on the left and all that are _more than_ the pivot are on the right side
3. Move the pivot between the two sections - the pivot is now in its final position
4. Recursively repeat this procedure on both sides of the pivot

This happens with two functions:

A. `quick_sort(nums, low, high)`:

If `low < high`:

1. Partition input using `partition()` and store returned middle index
2. Call `quick_sort()` on the left side
3. Call `quick_sort()` on the right side

B. `partition(num, low, high)`:

1. Set `pivot` to the element at index `high`
2. Set `i` to the index below `low`
3. For each `j` from `low` to `high` (exclusive):
   - If element at index `j` is less than pivot:
     1. Increment `i` by 1
     2. Swap elements at index `i` and `j`
4. Swap pivot element with element at index `i+1`
5. Return the new index of the pivot element

On average quick sort has `O(n*log(n))` time complexity. The `partition()` function itself has an `O(n)` complexity. The overall complexity is dependent on the times `partition()` needs to be called. The best case is to choose the middle element as pivot in each step. In worst case, if we don't take the necessary precautions and end up choosing the smallest or largest element as pivot in each step, it can degrade to `O(n^2)`.

This can be avoided by either:

- Shuffling the input list randomly before sorting (`O(n)` complexity)
- Find the median of a sample of data from the partition (in `O(1)` time) - a median of three is a popular solution

The second approach has less overhead, and also doesn't require randomness to be injected into the function, meaning it can remain deterministic and pure.

Overall quick sort is

- very fast in the average case
- in-place, so it saves memory
- typically unstable: changes the relative order of elements with equal keys
- recursive: can incur performance penalty
- sensitive to the pivot

:::tabs

== python

```python
def quick_sort(nums, low, high):
    if low < high:
        p = partition(nums, low, high)
        quick_sort(nums, low, p - 1)
        quick_sort(nums, p + 1, high)


def partition(nums, low, high):
    pivot = nums[high]
    i = low
    for j in range(low, high):
        if nums[j] < pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[high] = nums[high], nums[i]
    return i
```

:::

### Other sorting algorithms

[Timsort](https://en.wikipedia.org/wiki/Timsort) is a hybrid of merge sort and quick sort and was the default sorting algorithm in Python from version 2.3 to 3.10. It has been replaced by _Powersort_, which makes some improvements.

**Selection sort** is similar to bubble sort, but only makes one swap in each iteration.

:::tabs

== python

```python
def selection_sort(nums):
    for i in range(len(nums)):
        smallest_idx = i
        for j in range(i + 1, len(nums)):
            if nums[j] < nums[smallest_idx]:
                smallest_idx = j
        nums[i], nums[smallest_idx] = nums[smallest_idx], nums[i]
    return nums
```

:::
