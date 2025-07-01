# Variables in Go

## Basic types

Variables in Go can be of several basic types:

- `bool`: a boolean value, either `true` or `false`
- `string`: a sequence of characters
- `int`: a signed integer
- `uint`: an unsigned integer
- `float64`: a floating-point number
- `complex128`: a complex number
- `byte`: exactly what it sounds like: 8 bits of data
- `rune`: int32 values representing unicode codepoints

Integers, floats and complex numbers have type sizes. For instance, `int` exists as `int8`, `int16`, `int32` and `int64`. There is also a `uint` type for unsigned integers with the same sizes. Floats exist in `float32` and `float64` forms, and complex numbers as `complex64` and `complex128`. The sizes represent, how much memory the variables occupy. The best idea is to use the standard sizes, unless we have a good reason (e.g. performance needs) to use specific (smaller) sizes.

## Variable declaration

Variables in Go can be declared the "sad" way by first declaring their type (and setting their value to the default zero value for the given type), and then assigning their value:

```go
var age int
age = 27

var name string
name = "Peter"
```

Another way is to declare variables the short way, and let Go infer the type of variable. If you want a number to be treated as float type, you have to add `.0` to the end. Multiple variables can be declared at the same line.

```go
ageInt := 27
ageFloat := 27.0
pi := 3.14
name := "Peter"
isAdmin := false

name, age := "Susan", 31
```

## Static typing

Go enforces static typing, which means variable types are known before the code runs. This makes development easier and faster because the compiler can spot out type errors before running the code.

## Constants

Constants are declared using the `const` keyword, and cannot be changed. They can be primitive data types, such as strings, integers, floats or booleans. They cannot be complex types such as slices, maps or structs.

Constants can also be computed from other values, however, this has to happen at compile time. You cannot declare a constant that can only be computed at run-time.

```go
const pi = 3.14159

const firstName = "John"
const lastName = "Doe"
const name = firstName + " " + lastName
```

## Comments in Go

Single line comments can be added after `//`, while multi-line comments start with `/*` and end with `*/`.

## Formatting strings

Go has the `fmt` library, which has functions to format strings. These follow the printf tradition from C.

- `fmt.Printf` prints the formatted string to standard out
- `fmt.Sprintf` returns the formatted string

Values are represented with _formatting verbs_ in the formatted string:

- `%v` stands for the syntax representation of any value
- `%s` is for strings
- `%d` is for integers
- `%f` stands for floats - additional formatting options can be added (e.g. `%.2f`)
- `%t` are string representations of booleans (the string true or false)

```go
s := fmt.Sprintf("I am %v years old.", 10)
s := fmt.Sprintf("I am %v years old.", "way too many")
s := fmt.Sprintf("I am %d years old.", 10)
s := fmt.Sprintf("The value of pi is %.2f.", 3.14159)  // The value of pi is 3.14.
```
