---
prev:
  text: "Functions"
  link: "./functions"
next:
  text: "Interfaces"
  link: "./interfaces"
---

# Structs

Structs are Go's equivalent of a Python dictionary or a JavaScript object or similar data types. They are used to store variables that belong together.

```go
type book struct {
    title       string
    author      string
    published   int
    pages       int
    rating      float64
    favorite    bool
}
```

Structs can be nested: structs can have other structs as properties

```go
type message struct {
    text        string
    title       string
    sender      user
    recipient   user
}

type user struct {
    id      int
    name    string
    email   string
}
```

The fields of a struct can be accessed using dot notation:

```go
lotr := book{}
lotr.title = "Lord of the Rings"
lotr.author = "J. R. R. Tolkien"

invitation := message{}
invitation.sender.name = "Peter Jackson"
```

## Anonymous Structs

You can create anonymous structs if you know, you won't reuse these. Anonymous structs can be nested within other structs.

```go
// [!code highlight]
myCar := struct {
    brand string // [!code highlight]
    model string // [!code highlight]
} { // [!code highlight]
    brand: "Opel",
    model: "Corsa",
}

type car struct {
  brand string
  model string
  doors int
  mileage int
  // wheel is a field containing an anonymous struct
  wheel struct { // [!code highlight]
    radius int // [!code highlight]
    material string // [!code highlight]
  } // [!code highlight]
}
```

## Embedded Structs

While Go doesn't have _inheritance_ in the complete sense, embedding structs within other structs makes it possible to share fields between struct definitions.

```go
type car struct {
  brand string
  model string
}

type truck struct {
  // "car" is embedded, so the definition of a
  // "truck" now also additionally contains all
  // of the fields of the car struct
  car // [!code highlight]
  bedSize int
}
```

At the top level you can access the fields of an embedded structs like normal fields (unlike nested structs). However, you assign the fields in a _composite literal_.

```go
myTruck := truck{
  bedSize: 10,
  car: car{
    brand: "Toyota",
    model: "Tundra",
  },
}

fmt.Println(myTruck.brand) // Toyota
```

## Struct Methods

Go supports structs having methods on them. Methods are functions that have a receiver struct specified before the declaration part of the function. Methods can be called using the dot notation and parentheses after the method name with the arguments, as in other languages.

```go
type rect struct {
  width int
  height int
}

// area has a receiver of (r rect)
// rect is the struct
// r is the placeholder
func (r rect) area() int { // [!code highlight]
  return r.width * r.height // [!code highlight]
} // [!code highlight]
```

## Structs in Memory

Structs are stored in memory in a contiguous block. The ordering of the fields may matter as Go "aligns" the fields and adds padding to smaller fields which can lead to wasted space. If you have a reason to be concerned about memory usage, aligning fields from largest to smallest can help.

## Empty Structs

You can create empty structs in Go, and even have named empty struct types

```go

// anonymous empty struct type
empty := struct{}{}

// named empty struct type
type emptyStruct struct{}
empty := emptyStruct{}
```
