# Pointers

Variables are named memory locations. If we assign a value to a variable, we store it somewhere in memory.

Pointers are _variables_ that hold as values the _memory address_ of another variable. The pointer _doesn't_ point to the actual data, that is stored, but to the _location_ where that data is stored.

The `*` syntax defines a pointer. With it we can create an empty (_nil pointer_). An empty pointer's zero value is `nil`.

But it is more common to generate a pointer by prepending the `&` operator to a variable name.
We use the `*` operator to _dereference_ a pointer and get the original value

```go
// Points to the address of an integer
var p *int

myString := "Hello World!"
myStringPtr := &myString

// We can access and set the value of a variable through the pointer
*myStringPtr = "foo"
fmt.Printf("Value of myString is %s\n", *myStringPtr)
// Value of myString is foo
```

::: warning Dereferencing Nil-pointers

You can create nil-pointers, that point to nothing. However, dereferencing a nil-pointer will cause a runtime error ([panic](./interfaces#panic)) and crash the program. Generally speaking, you should always check if a pointer is nil before trying to dereference it.

:::

Unlike C, Go has no pointer arithmetic.

## Pass by Reference

One of the most common use cases of pointers in Go is to pass in variables by reference. Functions in Go receive variables as value: a copy of the most non-composite types is passed to the function. Pointers make it possible to pass a function a reference to the original memory address, which makes it possible for the function to update the original variable's value.

::: warning Fields of Pointers

If your function receives a pointer to a struct, you can access its fields using the normal way, using a _selector expression_.

```go
msgTotal := *analytics.MessageTotal // [!code error] won't work
msgTotal := analytics.MessageTotal
```

This is the recommended approach, and is the simplest. It is a shorthand for the following:

```go
msgTotal := (*analytics).MessageTotal
```

:::

## Pointer Receivers

You can create methods with pointer receivers. In fact, these are more common than value receivers, because methods often need to modify their receiver. Methods with pointer receivers don't require that a pointer is used to call the method. The pointer will be **automatically derived** from the value.

::: tabs

== Value receiver

```go
type car struct {
    color string
}

// [!code warning]
func (c car) setColor(color string) {
    c.color = color
}

func main() {
    c := car{
        color: "white",
    }
    c.setColor("blue") // [!code warning]
    fmt.Println(c.color)
    // [!code warning]
    // prints "white"
}
```

== Pointer receiver

```go
type car struct {
    color string
}

// [!code highlight]
func (c *car) setColor(color string) {
    c.color = color
}

func main() {
    c := car{
        color: "white",
    }
    c.setColor("blue") // [!code highlight]
    fmt.Println(c.color)
    // [!code highlight]
    // prints "blue"
}
```

:::

## Performance

While it might seem that passing pointers instead of values to functions is always faster, this is not the case. The reason: local variables if they are not used after the function returns, are generally allocated to the stack, which is faster. Variables, whose address is taken usually are allocated to the slower garbage-collected heap. Using pointers has performance benefits only if the values are large, and the copying of the values leads to greater performance loss than the loss from moving to the heap.

::: tip Rely on the Compiler

In most cases the Go compiler is smart enough to optimize your code to a reasonable degree. In most cases you don't need to worry about optimization too much.

:::
