---
prev:
  text: "Basics"
  link: "./basics"
---

# Functions

In C, when defining a function, you specify the type of the parameters and return value. C enforces the functions to return the same type from all return statements.

```c
int add(int x, int y) {
    return x + y;
}
```

## Void

In C, `void` is a special type used in function signatures. It is used

- to explicitly state that the function takes no arguments
- as a return type for functions that don't return anything

```c
int get_integer(void) {
    return 42;
}

void print_integer(int x) {
    printf("this is an int: %d", x)
}
```
