---
prev:
  text: "Interfaces"
  link: "./interfaces"
next:
  text: "Maps"
  link: "./maps"
---

# Arrays and Slices

## Arrays

In Go Arrays are **fixed-size** groups of variables of the **same type**. They can be declared with or without initialization

```go
var myInts = [10]int
primes := [6]int{2, 3, 5, 7, 11, 13}
```

## Slices

Slices are **dynamically-sized** flexible views of the elements of an array. The zero value of a slice is `nil`. Non-nil slices always have an underlying array, but it isn't always specified explicitly.

You can create slices from arrays using square brackets (`arrayName[lowIndex, highIndex]`). The `lowIndex` is inclusive, the `highIndex` is exclusive, and both can be omitted.

```go
primes := [6]int{2, 3, 5, 7, 11, 13}
mySlice := primes[1:4]
sliceFromStart := primes[:5]
sliceToEnd := primes[3:]
sliceFrontToBack := primes[:]
```

Most array programming in Go is done using slices. These hold references to the underlying array, and if you assign one slice to another variable, both refer to the same array. A function that has access to a slice, can modify the underlying array.

### Make

You can create slices using the `make` function, even without an underlying array. The slice will be filled with the [zero value](./variables#variable-declaration) of the specified type.

```go
// sliceName := make([]T, len, cap)
mySlice := make([]int, 5, 10)

// capacity can be omitted
anotherSlice := make([]int, 5)
```

If you want to create the slice with a specific set of values, you can use a slice literal. The difference from an array literal, is that you don't specify the size in the square brackets.

```go
mySlice := []string("I", "love", "Go")
```

The _length_ of a slice is the number of its elements, while the _capacity_ is the number of elements in the underlying array, counting from the first element of the slice. You don't have to worry about the capacity of a slice, because it will grow as needed.
You can access and assign elements of a slice with _indexing_.

```go
mySlice := []string("I", "love", "Go")
fmt.Println(len(mySlice))   // 3
fmt.Println(cap(mySlice))   // 3
fmt.Println(mySlice[2])     // Go

mySlice[0] = "You"
fmt.Println(mySlice)    // [you love go]
```

### Append

You can append values to slices with the `append` function that takes the slice you want to append to as the first parameter, and the values to append as second, third, etc. parameters. The function is [variadic](./functions#variadic-functions), so it an accept the arguments in various forms.

::: info Capacity

If the underlying array is not large enough, `append()` will create a new underlying array and point the returned slice to it.

:::

```go
slice = append(slice, appendThis)
slice = append(slice, andThis, andThisToo)
slice = append(slice, appendAllThese...)
```

::: warning New array or not?

`append()` creates a new array, if the underlying array was at its full capacity. However, if it wasn't _it will modify the same underlying array_. This may lead to unexpected results. The safest solution is to reassign the return value to the same slice that you provided as the first parameter.

:::

### Iterate over elements of a slice

You can iterate over the elements of a slice using `range`. You gain access to the index and the value at each position. You can ignore one of the returned values using `_`.

```go
for i, friend := range friends {
  fmt.Println(i, friend)
}
```

### Slices of slices

You can create slices with other nested slices as elements. For example, you can create matrices by creating a slice of rows.

```go
package main

func createMatrix(rows, cols int) [][]int {
  matrix := [][]int{}
  for i := 0; i < rows; i++ {
    row := []int{}
    for j := 0; j < cols; j++ {
      row = append(row, i * j)
    }
    matrix = append(matrix, row)
  }
  return matrix
}
```
