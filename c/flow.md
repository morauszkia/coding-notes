---
prev:
  text: "Functions"
  link: "./functions"
---

# Program Flow

## Conditionals

C offers modes to execute code only if certain conditions are met. In C you can either use an `if`/`else` statement or a ternary operator.

### If statements

You can write `if` statements with optional `if else` and `else` statements to execute code based on certain conditions. If the condition of the `if` statement is true, the code inside the `if` body will be executed. The `if else` blocks (there may be any number of them) are executed, if the preceding blocks were not, and their condition is met. The `else` block will be executed if neither of the preceding `if`/`else if` blocks were executed.

```c
if (result > 90) {
    printf("Great work!");
} else if (result > 60) {
    printf("You did well!");
} else {
    printf("Don't be discouraged! Next time will be better.");
}
```

If you only have one line of code after the `if` statement, you can write it without the curly braces.

```c
if (result > 90) printf("Great work!");
```

### Ternary operator

Simpler conditional statements can be written with the ternary operator.

```c
int max = a > b ? a : b;
```

## Loops

To execute code repeatedly you can use loops. C offers two kinds of loops: for loops to loop for a specified number of times, and while loops, to continue looping while a condition is met.

### For loop

The syntax of a `for` loop in C consists of three main parts:

1. initialization
2. condition
3. final-expression

In C there is no way to iterate over the values of an iterable as, for example, in [Python](/python/loops#for-loops) or JavaScript. In C you have to use the indices to access the values of a list.

```c
for (int i = 1; i <= 10; i++) {
    printf("%d\n", i)
}
```

### While loop

Sometimes we don't know in advance, how many time a loop needs to be executed. We can use the `while` loop to execute a block of code as long as the condition remains true.

::: warning Infinite loops

If there is no way for the condition to become false, your loop will go on forever! Make sure that there is a way for the condition to become false.

:::

```c
int next_number = start;
while (next_number >= end) {
  printf("%d\n", next_number);
  next_number--;
}
```

### Do while loop

Unlike the simple `while` loop, the `do {} while` loop will first execute the block of code at least once and check the condition after the first iteration.

The following function would print the starting number even if it was smaller than the ending number. A regular while loop would print nothing in such a case.

```c
#include <stdio.h>

void print_numbers_reverse(int start, int end) {
  do {
    printf("%d\n", start);
    start--;
  } while (start >= end);
}
```
