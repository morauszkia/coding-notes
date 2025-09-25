---
prev:
  text: "Program Flow"
  link: "./program-flow"
next:
  text: "Structs"
  link: "./structs"
---

# Functions

As in other programming languages, functions can be defined in Go to have code, that can be executed multiple times, possibly changing the parameters.
Function can accept zero or more arguments, and return zero or more values.

## Function signatures

A function's signature describes the type of arguments and the return type of the function. For instance, the following functions has the signature `func add(x int, y int) int`. As with [variable declarations](./variables#variable-declaration), if multiple parameters of the function are of the same type, and are next to each other in the function signature, the type only needs to be declared after the last argument.

```go
func add(x, y int) int {
    return x + y
}
```

Go-style syntax makes even the signature of complex higher order functions easier to read:

"f" is a function, that takes another function as first argument, which takes two `int`s as arguments and returns an `int`, and an `int` as second argument, and returns an `int`.

```go
f func(func(int,int) int, int) int
```

## Passing by value

In Go, variables are passed by value, which means, that functions receive a copy of the variable, and cannot mutate the original data. There are exceptions to this general rule, which will be discussed later.

## Return values

Functions can return one or more values. The `return` keyword is used to return the values we want. These can be stored into variables and/or used in consequent steps of the program.

### Ignoring a return value

If we do not want to use one or more of the returned values, we need to _explicitly_ ignore it, by capturing it with the **blank identifier** (`_`). Otherwise the Go compiler would throw an Error, because we have an unused variable declaration.

```go
func getPoint() (x int, y int) {
    return 3, 4
}

// ignore y value
x, _ := getPoint() // [!code highlight]
```

### Named return values and naked returns

Return values may be given names, and if they are, these are treated as if these variables were declared at the top of the function. These are scoped to the function.

This way, we can document the purpose of the returned values. We know, what is returned directly from the signature. This is especially useful, if the function returns multiple values.

A **naked return** is a `return` statement without the name of the returned variables, or values. In this case, the function will return variables that were named in the function signature. It is advised to only use naked returns in short functions, because these can harm the readability of longer functions.

```go
// [!code highlight]
func yearsUntilEvents(age int) (yearsUntilAdult, yearsUntilDrinking, yearsUntilCarRental int) {
    yearsUntilAdult = 18 - age
    if yearsUntilAdult < 0 {
        yearsUntilAdult = 0
    }
    yearsUntilDrinking = 21 - age
    if yearsUntilDrinking < 0 {
        yearsUntilDrinking = 0
    }
    yearsUntilCarRental = 25 - age
    if yearsUntilCarRental < 0 {
        yearsUntilCarRental = 0
    }
    return  // [!code highlight]
}
```

Even though named returns are used in the function signature, we can still explicitly return values if we want to. Explicit return can overwrite the named return values.

### Early returns

Go supports early returns in functions. This can be used in _guard clauses_, which simplify the reading of the function. Instead of nested if statements, we can use guard clauses to early return some value, if a specific condition is met, and only continue function execution, if the guard clause is not executed.

```go
func divide(dividend, divisor int) (int, error) {
    if divisor == 0 {
        // [!code highlight]
        return 0, errors.New("can't divide by zero")
    }
    return dividend/divisor, nil
}
```

## Higher order functions

In Go functions are first-class citizens, which means that they can be passed around as values, e.g. as arguments to functions.

For instance the `aggregate()` function takes three integers, and an `arithmetic` function, that takes two integers, performs some operation and returns an integer. For instance, the `add` and `mul` functions are possible candidates as arguments.

The arithmetic function can be called first with the two integers, and then with the result and the third integer to get the final result.

```go
func add(x, y int) int {
    return x + y
}

func mul(x, y int) int {
    return x * y
}

// [!code highlight]
func aggregate(a, b, c int, arithmetic func(int, int) int) int {
  firstResult := arithmetic(a, b)
  secondResult := arithmetic(firstResult, c)
  return secondResult
}
```

## Anonymous functions

Beside defining and passing in a function to a higher order function with a name, anonymous functions can be created and passed in as arguments in a function call.

```go
func double(a int) int {
    return a + a
}

func main() {
    // using a named function
    newX, newY, newZ := conversions(double, 1, 2, 3)
    // newX is 2, newY is 4, newZ is 6

    // using an anonymous function
    // [!code highlight]
    newX, newY, newZ = conversions(func(a int) int {
        return a + a // [!code highlight]
    }, 1, 2, 3) // [!code highlight]
    // newX is 2, newY is 4, newZ is 6
}
```

The anonymous function is created with the following syntax:

```go
func(argument1 type, argument2 type, ...) return_type {
    // function_body
}
```

The only difference is, that instead of the function name, we use the `func` keyword.

## Defer execution

We can use the `defer` keyword in front of a line, to defer the execution of the code until the function returns. This is especially useful, if the function has multiple return statements, and we want to run a line of code regardless of which return statement will be executed.

The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.

::: info
Deferred functions are typically used to clean up resources that are no longer being used. Often to close database connections, file handlers and the like.
:::

```go
func GetUsername(dstName, srcName string) (username string, err error) {
    // Open a connection to a database
    , _ := db.Open(srcName)

    // Close the connection *anywhere* the GetUsername function returns
    defer conn.Close() // [!code highlight]

    username, err = db.FetchUser()
    if err != nil {
        // The defer statement is auto-executed if we return here
        return "", err // [!code highlight]
    }

    // The defer statement is auto-executed if we return here
    return username, nil // [!code highlight]
}
```
