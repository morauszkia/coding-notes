# Nondeterministic Polynomial Time

Nondeterministic polynomial time (or _NP_) refers to a set of problems whose solutions can be _verified_ in polynomial time, but not necessarily solved in polynomial time.

It is a superset of _P_, as all problems that can be solved in polynomial times can also be verified.

One can imagine _NP_ as an oracle, which gives us potential solutions to our problems. If the solutions can be verified in polynomial time, the problem is inside the set NP.

## NP-complete problems

Problems can sometimes be _reduced_ to another problems, that are _at least as hard_ to solve. The algorithm used is called a _reducer_.

If `Problem A` can be reduced to `Problem B`, which is already solved, then `Problem A` can be solved using the algorithm for solving `Problem B`.

However, this _reducer_ needs to be fast: it has to run in polynomial time.

A problem is _NP-complete_ if every other problem in NP can be reduced to it _in polynomial time_. If we could solve a single NP-complete problem in polynomial time, it would mean, that all problems in NP can be solved in polynomial time, which would undermine digital security systems, which rely on the difficulty of certain NP problems (e.g. passwords can be easily verified, but really hard to guess)

Until now, no one has proven that `P = NP`, because no one has found a polynomial time solution to an NP-complete problem. The negative would be even trickier to prove, therefore, currently we don't know if `P = NP`, but we assume, that `P != NP`.

## NP-hard problems

A problem is _NP-hard_ if every problem in NP can be reduced to it in polynomial time.

The difference between this and the NP-complete definition is, that NP-hard problems themselves need not be in NP, while NP-complete problems _must_ be in NP.

All NP-complete problems are _NP-hard_, but not all NP-hard problems are NP-complete, in fact, not all NP-hard problems are even in NP. So, NP-hard is a _superset_ of the NP-complete set.

## Examples

### Traveling salesman

::: info The problem
Given a list of cities and the distances between each pair of cities, and a total distance, is there a path through all the cities that is less than the given distance?
:::

A brute-force search takes factorial time (`O(n!)`), because you have to try all possible paths to keep track of the shortest.

#### Pseudocode

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

#### Verification

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

### Prime Factorization

Prime factorization is another NP algorithm: given two primes and their product, the verification is a simple multiplication. Finding the prime factors of a number is a much more difficult problem.

#### Algorithm

1. Divide number by 2 as many times as you can evenly, and append `2` to the list of factors for each division.
2. After this `n` must be odd. Start a loop over all odd numbers from `3` to the square root of `n` (inclusive).
   - For each number, if `n` can be divided evenly by `i`, divide it and append `i` to the list. Repeat this, until `n` can be divided evenly by `i`
3. If `n` is still greater than 2, it must be a prime, so append it to the list
4. Return the list in ascending order

::: tabs

== Python

```python
import math


def prime_factors(n):
    prime_factors = []
    while n % 2 == 0:
        n /= 2
        prime_factors.append(2)
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        while n % i == 0:
            n /= i
            prime_factors.append(i)
    if n > 2:
        prime_factors.append(int(n))
    return prime_factors

```

== JavaScript

```javascript
const primeFactors = (num) => {
  let factors = [];
  if (num === 1) return factors;
  while (num % 2 === 0) {
    factors.push(2);
    num /= 2;
  }
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    while (num % i === 0) {
      factors.push(i);
      num = num / i;
    }
  }
  if (num > 2) factors.push(num);
  return factors;
};
```

:::

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

Implementation in Python

```python
def subset_sum(nums, target):
    return find_subset_sum(nums, target, len(nums)-1)


def find_subset_sum(nums, target, index):
    if target == 0:
        return True
    if index < 0 and target != 0:
        return False
    if nums[index] > target:
        return find_subset_sum(nums, target, index-1)
    result_one = find_subset_sum(nums, target, index-1)
    result_two = find_subset_sum(nums, target-nums[index], index-1)
    return result_one or result_two
```
