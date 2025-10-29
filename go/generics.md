---
prev:
  text: "Mutexes"
  link: "./mutexes"
next:
  text: "Limitations"
  link: "./limitations"
---

# Generics

Generics were introduced in Go 1.18 and make possible to write code that is reusable. For example, most functions working with slices don't care, what items are contained in the slice. If we want to reverse, split, merge or do anything with slices, it is irrelevant, what type they hold. We just want them to hold the same value, or want to indicate that the returned slices will hold the same value as the one that was passed in. For this, we use generics.

::: tip Naming

You can name your generic type variables anything, but it is a convention to use `T`.

:::

::: tabs

== Using Generics

```go
func splitSlice[T any](s []T) ([]T, []T) {
    mid := len / 2
    return s[:mid], s[mid:]
}
```

== Before Generics

```go
func splitStringSlice(s []string) ([]string, []string) {
    mid := len / 2
    return s[:mid], s[mid:]
}

func splitIntSlice(s []int) ([]int, []int) {
    mid := len / 2
    return s[:mid], s[mid:]
}
```

:::

You can get the zero value of any generic type using `var zero T`.

Making code reusable is especially useful if you are writing library code. These contain code that was intended to be used in various scenarios, and using generics, and therefore making your code more abstract just makes it more versatile.

## Constraints

Sometimes our functions can work with several types, but not anything. Constraints let us write generics that only work within the constraints of a given [interface](./interfaces). The `any` above is the same as the _empty interface_. If you want to use a method in your function, you can constrain the input to be of a type that implements the interface which has the necessary method.

```go
/*
Any type implements this interface, which has
a String() method, which returns the string
representation ot the type.
*/
type stringer interface {
    String() string
}

// [!code highlight]
func concat[T stringer](vals []T) string {
    result := ""
    for _, val := range vals {
        result += val.String()
    }
    return result
}
```

## Interface Type Lists

With the release of generics a new way of defining interfaces was also released: you can list the types that satisfy the interface.

```go
// Ordered is a type constraint that matches any ordered type.
// An ordered type is one that supports the <, <=, >, and >= operators.
type Ordered interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
        ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr |
        ~float32 | ~float64 |
        ~string
}
```

## Parametric Constraints

Interfaces that you would like to use as constraints can themselves accept type parameters.

::: tabs

== Store

```go
// The store interface represents a store that sells products.
// It takes a type parameter P that represents the type of products the store sells.
type store[P product] interface {
    Sell(P)
}

type product interface {
    Price() float64
    Name() string
}

type book struct {
    title  string
    author string
    price  float64
}

func (b book) Price() float64 {
    return b.price
}

func (b book) Name() string {
    return fmt.Sprintf("%s by %s", b.title, b.author)
}

type toy struct {
    name  string
    price float64
}

func (t toy) Price() float64 {
    return t.price
}

func (t toy) Name() string {
    return t.name
}

// The bookStore struct represents a store that sells books.
type bookStore struct {
    booksSold []book
}

// Sell adds a book to the bookStore's inventory.
func (bs *bookStore) Sell(b book) {
    bs.booksSold = append(bs.booksSold, b)
}

// The toyStore struct represents a store that sells toys.
type toyStore struct {
    toysSold []toy
}

// Sell adds a toy to the toyStore's inventory.
func (ts *toyStore) Sell(t toy) {
    ts.toysSold = append(ts.toysSold, t)
}

// sellProducts takes a store and a slice of products and sells
// each product one by one.
func sellProducts[P product](s store[P], products []P) {
    for _, p := range products {
        s.Sell(p)
    }
}

func main() {
    bs := bookStore{
        booksSold: []book{},
    }

    // By passing in "book" as a type parameter, we can use the sellProducts function to sell books in a bookStore
    sellProducts[book](&bs, []book{
        {
            title:  "The Hobbit",
            author: "J.R.R. Tolkien",
            price:  10.0,
        },
        {
            title:  "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            price:  20.0,
        },
    })
    fmt.Println(bs.booksSold)

    // We can then do the same for toys
    ts := toyStore{
        toysSold: []toy{},
    }
    sellProducts[toy](&ts, []toy{
        {
            name:  "Lego",
            price: 10.0,
        },
        {
            name:  "Barbie",
            price: 20.0,
        },
    })
    fmt.Println(ts.toysSold)
}
```

== Biller

```go
package main

import (
    "fmt"
)

type biller[C customer] interface {
    Charge(C) bill
    Name() string
}

type userBiller struct {
    Plan string
}

func (ub userBiller) Charge(u user) bill {
    amount := 50.0
    if ub.Plan == "pro" {
        amount = 100.0
    }
    return bill{
        Customer: u,
        Amount:   amount,
    }
}

func (sb userBiller) Name() string {
    return fmt.Sprintf("%s user biller", sb.Plan)
}

type orgBiller struct {
    Plan string
}

func (ob orgBiller) Charge(o org) bill {
    amount := 2000.0
    if ob.Plan == "pro" {
        amount = 3000.0
    }
    return bill{
        Customer: o,
        Amount:   amount,
    }
}

func (ob orgBiller) Name() string {
    return fmt.Sprintf("%s org biller", ob.Plan)
}

type customer interface {
    GetBillingEmail() string
}

type bill struct {
    Customer customer
    Amount   float64
}

type user struct {
    UserEmail string
}

func (u user) GetBillingEmail() string {
    return u.UserEmail
}

type org struct {
    Admin user
    Name  string
}

func (o org) GetBillingEmail() string {
    return o.Admin.GetBillingEmail()
}
```

:::
