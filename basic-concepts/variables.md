# Variables and Data Types

Variables are named containers that store data values which can be used and changed during the execution of the program. They can be of various types.

The core data types are

- integers: whole numbers, either positive or negative
- floats: numbers with decimals
- strings: text sequences
- boolean: logical values `true` or `false`

Beside these, some languages differentiate between strings and character types (e.g. Java) for example to use memory efficiently. Other languages do not differentiate between integers and floats, but treat all under an umbrella concept of numbers (e.g. JavaScript), or do not have a string type, but treat them as arrays of characters.

There are also more complex data types (arrays, hashmaps, sets, etc.) which we discuss in a separate chapter.

## Typing

Languages can be differentiated based on how they treat variable types. We differentiate on one hand between

- **statically typed**: languages that check the type of variables at compile time and do not let to assign values of other types to variables - types are either _declared_ explicitly of _inferred_ by the language.
- **dynamically typed**: languages that check the type of variables only at run time, and variables can receive values of any type

and on the other between

- **strongly typed** languages do not allow mixing of incompatible types, and limit implicit type conversions (_coercions_), therefore, values need to be explicitly converted or cast to a specific type
- **weakly typed** languages perform more type coercions (implicit type conversions), which can lead to unexpected and potentially unnoticed bugs

## Variable declaration

The first step in using variables is to declare them with or without an initial value assigned to them. Later, variables can be reassigned to hold different values (and in the case of dynamically typed languages even values of different types).

If you use statically typed languages, you sometimes have to explicitly declare the type of a variable (e.g. Java, C/C++).

::: tabs

== Java

```java
int x = 5;
double pi = 3.14;
String word = "hello";
boolean done = false;
```

== C

```c
int x = 5;
float pi = 3.14;
char word[] = "hello";
```

To use a boolean, you need to `#include <stdbool.h>`

```c
#include <stdbool.h>

bool done = false;
```

:::

In most statically typed languages (e.g. Go, Gleam or TypeScript) there is syntax for explicit type declaration, but you can also let the language infer the type.

::: tabs

== Go

```go
// WIth type declaration
var x int = 5
var e float64 = 2.718
var word string = "hello"
var done bool = false

// Type inference
y := 6
pi := 3.14
another_word := "bye"
ready := true
```

== Gleam

```gleam
// Declaration
let x: Int = 5
let word: String = "hello"
let done: Bool = False

// Inference
let y = 6
let another_word = "bye"
let ready = True
```

== TypeScript

```typescript
// Declaration
let x: number = 5;
let word: string = "hello";
let done: boolean = false;

// Inference
let y = 6;
let anotherWord = "bye";
let ready = true;
```

:::

In dynamically typed languages the type of variable is not declared and only checked at run time. Variables can be reassigned to hold values of completely different types.

::: tabs

== Python

```python
x = 5
x = "six"   # Completely ok
```

== JavaScript

```javascript
let x = 5;
x = "six"; // No problem
```

== R

```r
x <- 5
x <- "six" # Ok
```

:::

## Variable names

There are restrictions as to which characters can be used in variable names, either at the start or anywhere in the variable name, as well as conventions on the case that is used for variable names.

Common restrictions are:

- variable names have to start with a letter or underscore
- cannot start with a digit
- may contain letters, digits, underscores, dollar sign
- names are case sensitive

Often used conventions are:

- snake_case: small letters separated by underscores (e.g. Python)
- camelCase: starting with a small letter, each new word starting with capital letter without separators (e.g. JavaScript, Go)
- PascalCase: starting with capital letter, each new word starting with capital letter (e.g. exported names in Go, class names in JavaScript)
- SCREAMING_SNAKE_CASE: all caps with underscores as separators (e.g. for constants in JavaScript, Python)

Another existing case, which is, however, not allowed in most programming languages is _kebab-case_: small letters, words separated by hyphens (used in HTML properties, CSS and URLs).
