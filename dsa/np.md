# Nondeterministic Polynomial Time

Nondeterministic polynomial time (or _NP_) refers to a set of problems whose solutions can be _verified_ in polynomial time, but not necessarily solved in polynomial time.

It is a superset of _P_, as all problems that can be solved in polynomial times can also be verified.

One can imagine _NP_ as an oracle, which gives us potential solutions to our problems. If the solutions can be verified in polynomial time, the problem is inside the set NP.

## Traveling salesman

::: info The problem
Given a list of cities and the distances between each pair of cities, and a total distance, is there a path through all the cities that is less than the given distance?
:::

A brute-force search takes factorial time (`O(n!)`), because you have to try all possible paths to keep track of the shortest.

### Pseudocode

Inputs:

- cities: an array of cities (numbers starting from 0)
- paths: a matrix of distances
- distance: a distance to beat

Helper function: This function takes an array and returns a matrix of the permutations of the given array.

::: tabs

== Python

```python
def permutations(arr):
    res = []
    res = helper(res, arr, len(arr))
    return res


def helper(res, arr, n):
    if n == 1:
        tmp = arr.copy()
        res.append(tmp)
    else:
        for i in range(n):
            res = helper(res, arr, n - 1)
            if n % 2 == 1:
                arr[n - 1], arr[i] = arr[i], arr[n - 1]
            else:
                arr[0], arr[n - 1] = arr[n - 1], arr[0]
    return res
```

== JavaScript

```javascript
// Function to swap elements in the array
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Function to find the possible permutations.
// Initial value of idx is 0.
function permutations(res, arr, idx) {
  if (idx === arr.length) {
    res.push([...arr]);
    return;
  }

  for (let i = idx; i < arr.length; i++) {
    swap(arr, idx, i);
    permutations(res, arr, idx + 1);
    swap(arr, idx, i); // Backtracking
  }
}

// Function to get the permutations
function permute(arr) {
  const res = [];
  permutations(res, arr, 0);
  return res;
}
```

:::

Algorithm:

1. Use the permutations helper function to get all the possible paths through the cities
2. Iterate over the cities in each path, and sum the distance between each pair of cities using the `paths` matrix
3. If a total distance that is shorter than the distance we try to beat is found, return `true`
4. If no shorted path was found, return `false`

Here is the implementation in Python

```python
def tsp(cities, paths, dist):
    possible_paths = permutations(cities)
    for path in possible_paths:
        total_dist = 0
        for i in range(1, len(path)):
            total_dist += paths[path[i - 1]][path[i]]
        if total_dist < dist:
            return True
    return False
```

### Verification

While the solution itself gets extremely slow pretty fast, a possible solution can be verified much faster.

Inputs:

- `paths`: a matrix of paths between pairs of cities
- `dist`: the distance to beat
- `actual_path`: the proposed path we are trying to verify

Algorithm:

1. Loop over each city in the proposed path
2. Sum the distances between each city in the path
3. If the sum is less than `dist`, return `true` else return `false`

Implementation in Python:

```python
def verify_tsp(paths, dist, actual_path):
    total_dist = 0
    for i in range(1, len(actual_path)):
        total_dist += paths[actual_path[i-1]][actual_path[i]]
    return total_dist < dist
```

### Subset Sum Problem

The main question is: "Can we pick numbers from a list to add up to a target number?" It is an NP-hard problem.

Pseudocode for `find_subset(nums, target)` function

- Inputs:

  - `nums`: a list of integers
  - `target`: the target sum we want to find a subset for

- Output: a boolean value that tells us if it is possible to find such a subset

- Steps:
  1. Call helper function starting with the last index in `nums` and return its result

Pseudocode for `find_subset_sum(nums, target, index)` function

- Inputs:

  - `nums`: a list of integers
  - `target`: the target sum we want to find a subset for
  - `index`: index of current element

- Output: a boolean value that tells us if it is possible to find such a subset

- Steps:
  1. If `target == 0` return `true`
  2. If `index < 0` and `target != 0` return `false`
  3. If the number at current `index` is greater than `target`, call itself with same target but index decremented by 1 and return result
  4. Else call itself with same `target` and index decremented by 1, and save the result
  5. Call itself with the `target` reduced by the value of current element and `index` decremented by 1.
  6. If either of these calls returns `true`, retur `true`, otherwise return `false`
