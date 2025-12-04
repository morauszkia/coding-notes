---
prev:
  text: "Enums"
  link: "./enums"
next:
  text: "Memory"
  link: "./memory"
---

# Unions

Unions are something like a combination of a [struct](./structs) and an [enum](./enums). Unions can hold _one of_ several types.

```c{1-4}
// exercise.h

typedef union SnekObjectData {
  int v_int;
  char *v_string;
} snek_object_data_t;

typedef enum SnekObjectKind {
  INTEGER,
  STRING,
} snek_object_kind_t;

typedef struct SnekObject {
  snek_object_kind_t kind;
  snek_object_data_t data;
} snek_object_t;

snek_object_t new_integer(int);
snek_object_t new_string(char *str);
void format_object(snek_object_t obj, char *buffer);
```

In the example above a `SnekObject struct` can hold either an integer on its `.data.v_int` member or a string on its `.data.v_string` member.

## Memory Usage

The C compiler allocates [memory](./memory) to a `union` based on the largest potential memory requirement, and the alternative members share this allocated memory. In the case above, this memory would either hold an integer or a string, in the same location. So, if we access this part of the memory, we need to make sure to check the type of data stored: for example, by using some tag member, like `.kind` in the example.

In the example below we use a `switch` on the `.kind` member to determine, how the data stored in the memory can be accessed.

::: warning Unset field

The C compiler will let us do that, but accessing an unset field is a bad idea. The result we get will be garbage, because the program would try to interpret data as another type.

:::

```c
// exercise.c

#include <stdio.h>

#include "exercise.h"

void format_object(snek_object_t obj, char *buffer) {
  switch(obj.kind) {
    case INTEGER:
      sprintf(buffer, "int:%d", obj.data.v_int);
      break;
    case STRING:
      sprintf(buffer, "string:%s", obj.data.v_string);
      break;
  }
}

snek_object_t new_integer(int i) {
  return (snek_object_t){
    .kind = INTEGER,
    .data = {.v_int = i}
  };
}

snek_object_t new_string(char *str) {
  // NOTE: We will learn how to copy this data later.
  return (snek_object_t){
    .kind = STRING,
    .data = {.v_string = str}
  };
}
```

Using union types may be incredibly inefficient. For example a union may hold an int 99% of the time, which occupies a small amount of memory. However, in 1% of the time it will hold a long error message. In such a case a large amount of memory will be allocated to this union, despite that it won't use so much memory most of the time.

## Helper Fields

An interesting trick is using unions to create "helpers" for accessing different parts of a piece of memory. For example you might use the union below to make it possible to access the whole rgba value or its individual components by allowing them to share the same memory location.

```c
typedef union Color {
  struct {
    uint8_t r;
    uint8_t g;
    uint8_t b;
    uint8_t a;
  } components;
  uint32_t rgba;
} color_t;
```

The color can be access by `.rgba` or its components, for example `.components.r`.
