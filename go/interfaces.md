---
prev:
  text: "Structs"
  link: "./structs"
---

# Interfaces

In Go an interface defines behavior, like methods, that different types can share: they are collections of method _signatures_. If a type has methods that match the interface's method signatures, we say that this type _implements_ the interface.

::: info Signature vs. behavior

Interfaces do not define behavior, only the signature of functions. Types that implement an interface all need to define their own version of the methods.

:::

For example, the rect and circle types below implement the shape interface, because they have area and perimeter methods that match the signature of the shape interface's methods.

```go
type shape interface {
  area() float64
  perimeter() float64
}

type rect struct {
    width, height float64
}
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perimeter() float64 {
    return 2*r.width + 2*r.height
}

type circle struct {
    radius float64
}
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perimeter() float64 {
    return 2 * math.Pi * c.radius
}
```

Interfaces are implemented _implicitly_. Unlike in [TypeScript](../ts/classes#interface-implementation) or Java, a type never declares that it implements an interface. A type can implement multiple interfaces if it implements all the methods of these interfaces.

::: tip Check implementation

You can check if a type indeed implements an interface by using a function that takes an interface as an argument. If this function can take the struct as its argument, then the struct implements the interface.

:::

::: tip Keep it small

It is best to keep interfaces small, and define only the minimal behavior necessary to represent a concept. Only define what is necessary for other types to classify as a member of that interface.

:::

## Named Interface Parameters

To provide more information regarding your methods, you can name the parameters and return value of your interfaces' methods.

```go
type Copier interface {
  Copy(sourceFile string, destinationFile string) (bytesCopied int)
}
```

## Assert Interface Type

You can assert that a struct implementing an interface is of a specific type. The type assertion returns the struct and a boolean indicating if the struct is indeed of the asserted type. You can use this boolean value to access the fields of a struct in a type safe way.

```go
type shape interface {
    area() float64
}

type circle struct {
    radius float64
}

c, ok := s.(circle) // [!code highlight]
if !ok { // [!code highlight]
    // log an error if s isn't a circle [!code highlight]
    log.Fatal("s is not a circle") // [!code highlight]
} // [!code highlight]

radius := c.radius
```

## Type Switch

Instead of regular if-checks, you can use a switch to assert the type of an interface

```go
func getExpenseReport(e expense) (string, float64) {
    switch t := e.(type) {
    case email:
        return t.toAddress, t.cost()
    case sms:
        return t.toPhoneNumber, t.cost()
    default:
        return "", 0.0
    }
}
```

## The Error Interface

Go has a built-in `error` interface. It looks like this:

```go
type error interface {
    Error() string
}
```

::: info Just another value

Unlike other programming languages, Go treats errors just like any other values. You can handle them in your code just like any other value.

:::

When something can go wrong in a function, that function should return an `error` as the last return value. If everything went alright, it should return a `nil` error. A `nil` error means success, a non-nil error means failure. Code that calls this function should always check if the `error` is or isn't `nil`.

::: info Return values

If you return a non-nil error, it is the convention to return the zero values for all other return values. E.g. `""` for `string`, `0` for `int`, etc.

:::

As with other interfaces, you can create your own structs that implement the `error` interface.

```go
type divideError struct {
    dividend float64
}

func (de divideError) Error() string {
    return fmt.Sprintf("can not divide %v by zero", de.dividend)
}

func divide(dividend, divisor float64) (float64, error) {
    if divisor == 0 {
        return 0, divideError{dividend: dividend}
    }
    return dividend / divisor, nil
}
```

### The errors package

Go has an "errors" package, which simplifies working with errors. It has a `errors.New()` function that returns an error that formats as the given test.

```go
import (
    "errors"
)

func divide(x, y float64) (float64, error) {
    if y == 0 {
        return 0, errors.New("no dividing by 0")
    }
    return x / y, nil
}
```

### Panic

Using the `error` interface is the proper way of handling errors in Go.

```go
func enrichUser(userID string) (User, error) {
    user, err := getUser(userID)
    if err != nil {
        // fmt.Errorf wraps an error with additional context
        return User{}, fmt.Errorf("failed to get user: %w", err)
    }
    return user, nil
}
```

However, there is a `panic` function, which makes the program crash and print a stack trace. In general, this shouldn't be used. It goes up the call stack until it reaches a function that defers a `recover`. If there is no such function, the goroutine crashes.

::: warning Don't do this!

```go
func enrichUser(userID string) User {
    user, err := getUser(userID)
    if err != nil {
        panic(err)
    }
    return user
}

func main() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("recovered from panic:", r)
        }
    }()

    enrichUser("123")
}
```

`log.Fatal()` is a good alternative to cleanly exit in an unrecoverable way.

:::
