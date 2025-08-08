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
message.sender.name = "Peter Jackson"
```
