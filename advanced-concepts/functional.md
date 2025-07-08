---
prev:
  text: Advanced Concepts Menu
  link: "./"
---

# Functional Programming

Functional Programming is another popular progamming paradigm, that unsurprisingly revolves around functions. It is a declarative paradigm, and the programs are constructed by applying and composing functions, rather than by issuing a sequence of imperative commands. In FP, functions are treated as first-class citizens-they can be assigned to variables, passed as arguments, and returned from other functions, just like any other data type.

## FP vs. OOP

While it is often contrasted with [OOP](./oop), one is not superior to the other, and FP similarly to OOP handles encapsulation, abstraction and polymorphism. The only aspect of OOP that does not have its parallel in FP is inheritance.
While OOP bundles behavior, data and state together in instances of things. FP thinks about the world as series of data transformations: functions take data as input and return a transformed output, e.g. take the actual state as input and return the new state.

## Core Principles

- **Pure Functions:** A central concept in FP is the use of pure functions. A pure function always returns the same output for the same input and does not cause any observable side effects, such as modifying external variables or program state. This predictability makes code easier to reason about, debug, and test.
- **Immutability:** Functional programming emphasizes immutable data. Once a value is created, it cannot be changed. Instead, new values are created as needed. This approach reduces bugs related to shared state and makes concurrent programming safer and more reliable.
- **Declarative Style:** FP focuses on describing what should be done, not how to do it. This contrasts with imperative programming, where the programmer specifies the exact steps needed to achieve a result. Declarative code tends to be more concise and easier to maintain.
- **Function Composition and Modularity:** Programs are built by composing small, reusable functions. This modularity leads to code that is easier to read, maintain, and reuse across projects

## Key Features

- **First-class and higher-order functions:** Functions can be passed as arguments, returned from other functions, and assigned to variables.
- **No side effects:** Pure functions do not alter external state, making code more predictable and easier to test.
- **Immutability:** Data structures are not modified after creation, which helps avoid bugs in concurrent or complex systems.
- **Lazy evaluation:** Some functional languages evaluate expressions only when needed, improving efficiency in certain scenarios.
- **Recursion:** Loops are often replaced by recursive function calls, as mutable state and imperative loops are avoided.

### First-class and higher-order functions

The concept of first-class functions means simply that functions can be used as value. For example, they can be assigned to variables.
Anonymous functions come in handy in cases, where we want to write simple functions that can be passed as arguments or assigned to variables.

In Python lambda functions are great for short one-liner functions:

```python
lambda x: x + 1
```

Higher-order functions accept other functions as parameters or return functions or both.

#### Map, filter, reduce

Map, filter and reduce are commonly used higher-order functions.

**Map** typically takes an iterable and a function and returns a new iterable or iterator that applies the function to every item.
**Filter** takes an iterable and a function that returns a boolean, and returns an iterable or iterator of the items for which the passed-in function return true.
**Reduce** accepts an interable, a function and an accumulator, and returns the final value of the accumulator after applying the function to each item.

### Pure functions

Pure functions are functions, that

- are deterministic: they always return the same value given the same arguments
- running them causes no side effects: e.g. they do not change external state
- do not perform I/O operations

As a result, they are easier to understand, reason about, test and debug.

#### Memoization

Pure functions are referentially transparent, which means that they can always be replaced by their would-be return value because it's the same every time. This makes it possible to memoize these functions.

Memoization is caching: storing a copy of the result of a complex and resource intensive computation in memory so that we don't have to compute it over and over again. Memoization is a tradeoff between memory and speed, so a function that is fast to execute is not worth memoizing.

### Recursion

Recursion is the functional programming alternative to regular loops. Recursion does an especially great job with nested structures, where the level of nesting is unknown or varying.

### Functional Transformation

In functional programming it is useful to return new transformed functions from functions.

#### Closures

Closures are functions that access variables that were defined in the scope where the function was created. These variables cannot be changed directly, but are accessed by the closure.

#### Currying

In certain cases, if we want to pass down functions to other functions or methods, the number of arguments a function takes is relevant, and sometimes we cannot determine it. In such a case currying is useful. It is the process of transforming a function into another that takes the required number of arguments, and returns inner function(s) that take the additional arguments, and in the end, return the end value.

### Sum Types

## Functional Programming Languages

Some languages are designed specifically for functional programming, while many modern languages incorporate functional features:

- Pure functional languages: Haskell, Erlang, Elixir, Gleam, Lisp, Clojure, OCaml.
- Languages with functional features: JavaScript, Python, Scala, Java (since Java 8), C#, Rust, Kotlin, Go, etc.
