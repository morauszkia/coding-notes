---
prev:
  text: "Strings"
  link: "./strings"
---

# Enums

C also support `enum`s, which are named lists of `int`s constrained to a new type. The names will be assigned to the numbers starting from 0.

```c
enum DaysOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
};

struct Event {
    char *title;
    enum DaysOfWeek day;
}
```

Enums can also be created with an alias.

```c
typedef enum DaysOfWeek {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY,
} days_of_week_t;

struct Event {
    char *title;
    days_of_week day;
}
```

One of the best use of enums is in a [switch](./flow#switch) case.

## Non-Default Values

You can also set the values to other `int`s that the defaults. You can also define the first value, and let the compiler increment it for the rest of the names.

```c
typedef enum {
    EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_COMMAND_NOT_FOUND = 127,
} ExitStatus;
```

## Enum Size

The `sizeof` enums is generally the same as that of an `int`. But if the specified value exceeds the range of an `int`, then the C compiler will use an `unsigned int` or a `long`.
