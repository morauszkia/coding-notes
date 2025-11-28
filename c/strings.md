---
prev:
  text: "Arrays"
  link: "./arrays"
next:
  text: "Enums"
  link: "./enums"
---

# Strings

Strings in C are

- how we represent text in C programs
- any number of `char`s terminated by a null character `\0`
- a [pointer](./pointers) to the first element of a character [array](./arrays)

You can declare strings either as pointers or as arrays.

```c
char str1[] = "Hello";
char *str2 = "world";
printf("%s %s\n", str1, str2);
// Hello world
```

Therefore, most string manipulation in C is performed using pointers to move around the array of characters. The null terminator lets us determine where the string ends. It is automatically added at the end of strings.

::: info No length

Unlike in other programming languages, C strings do not store their length as a property, but it can be determined by the position of the _null terminator_.

:::

```c
void concat_strings(char *str1, const char *str2) {
  // sets up pointer
  char *next_char = str1;
  while (*next_char != '\0') {
    // moves pointer to the next character until it reaches '\0'
    next_char++;
  }

  // moves another pointer until it reaches the '\0' of the second string
  while (*str2 != '\0') {
    // copies str2 character-by-character
    *next_char = *str2;
    // moves both pointers
    next_char++;
    str2++;
  }
  // terminates the concatenated string
  *next_char = '\0';
}
```

## C String Library

The C standard library provides a set of functions to manipulate strings in the `<string.h>` header file.

- `strcpy(dest, src)` copies one string (`src`) to another (`dest`) - starts at the beginning, overwrites what was there
- `strncpy(dest, src, n)` copies a specified number `n` of characters from one string to another
- `strcat(dest, src)` appends one string to another (starts at the end of the first string)
- `strncat(dest, src, n)` concatenates a specified number of characters
- `strlen(src)` returns the length of a string (excluding the null terminator)
- `strcmp(str1, str2)` compares two strings lexicographically
- `strchr(str, char)` finds first occurrence of character in a string, and returns pointer to that character
- `strstr(str1, str2)` finds first occurrence of substring `str2` in string `str1`, and returns pointer to first character

::: warning Null terminator

When working with strings in C, you must account for the null terminator. While it is not included in string length, it needs to be allocated space in memory.

:::
