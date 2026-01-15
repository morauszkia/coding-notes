---
prev:
  text: "Strings"
  link: "./strings"
next:
  text: "Unions"
  link: "./unions"
---

# Enums

C also support `enum`s, which are named lists of `int`s constrained to a new type. The names will be assigned to the numbers starting from 0. Under the hood the value of enum variables is stored as an integer.

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

enum DaysOfWeek today = MONDAY;     // 0
```

Enums can also be created with an alias, which makes them easier to use, and the code less verbose.

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

days_of_week_t today = FRIDAY;
```

One of the best use of enums is in a [switch](./flow#switch) case. Both the label and the integer value can be used in if-statements or switch statements.

## Non-Default Values

You can also set the values to other `int`s than the defaults. You can also define the first value, and let the compiler increment it for the rest of the names.

```c
typedef enum {
    EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_COMMAND_NOT_FOUND = 127,
} ExitStatus;
```

## Enum Size

The `sizeof` enums is generally the same as that of an `int`. But if the specified value exceeds the range of an `int`, then the C compiler will use an `unsigned int` or a `long`.
