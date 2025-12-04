---
prev:
  text: "Program Flow"
  link: "./flow"
next:
  text: "Pointers"
  link: "./pointers"
---

# Structs

Structs are a type consisting of related members. These solve the problem of working with a large number of related variables, and returning multiple values from a function. For example, we may want to define a struct for storing coordinates in a 3d space.

We define our structs in the `.h` file. We can then use the new struct in the `.c` files, and initialize them

```c
struct Coordinate {
    int x;
    int y;
    int z;
}
```

## Initialization of Structs

Structs can be initialized in multiple ways.

- **zero initializer** sets all the fields to `0` values
- **positional initializer** accepts the values in the same order as they were defined in the struct definition.
- **designated initializer** accesses the fields and assigns the values to them

::: info Dot notation

You can access a field in the struct using the dot notation. You have to use this notation in the designated initializer, too.

:::

```c
int main() {
    struct Coordinate a = {0}; // zero
    struct Coordinate b = {5, 3, 6}; // positional
    struct Coordinate c = {
        .x = 4,
        .y = 2,
        .z = 5
    };  // designated

    // do stuff
}
```

## typedef

You can use the `typedef` keyword to create an alias for the type and use that wherever you would use the struct. It is conventional to end the type name with `_t`. You can even omit the structs real name. In this case you could only use the alias.

```c
// .h file

// [!code highlight]
typedef struct Coordinate {
    int x;
    int y;
    int z;
} coordinate_t; // [!code highlight]

// .c file
int main() {
    coordinate_t a = [
        .x = 4,
        .y = 2,
        .z = 5
    ];
}
```

::: info Structs in [Memory](./memory)

Structs are stored contiguously in memory one field after the other. In the case of mixed type structs, C inserts padding to maintain data alignment. As a rule of thumb, ordering fields from largest to smallest will help the compiler minimize padding.

:::

## Forward Declaration

Sometimes structs need to reference themselves. For example, in a Linked List a Node struct may have a pointer to another Node struct. To make this possible, we can add a forward declaration of the struct.

```c
// [!code highlight]
typedef struct Node node_t;

typedef struct Node {
    int value;
    // [!code highlight]
    note_t *next;
} note_t;
```

These can also be used for circular reference, when two structs reference each other. For example a Person might own a Computer, and a Computer may have a Person as its owner.

```c{1-2,6,11}
typedef struct Computer computer_t;
typedef struct Person person_t;

struct Person {
  char *name;
  computer_t *computer;
};

struct Computer {
  char *brand;
  person_t *owner;
};
```
