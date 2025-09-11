---
prev:
  text: "Intro to TypeScript"
  link: "../ts"
next:
  text: "Functions in TypeScript"
  link: "./functions.md"
---

# Basics of TypeScript

TypeScript files usually have the extension `.ts`. These are compiled to regular `.js` files by the compiler. The compiler can be run with the `tsc` command from the terminal. At compile time, it checks your code and throws error if there are, for example, bugs related to the type of variables.

::: info Using other transpilers
Other transpilers (e.g. Babel) can also transform your TypeScript code to JavaScript, but the official TypeScript compiler comes with other useful tools that make development less painful. For instance, IDEs can show errors in the code even before we run the compiler.
:::

::: tip Watch mode
During development, you can run the TypeScript compiler in watch mode, to automatically recompile the code after changes.

```bash
tsc --watch main.ts
tsc -w main.ts
```

:::

::: tip TypeScript Projects
We can initialize a TypeScript project using `tsc --init`. This will create a `tsconfig.json` file. After this, running `tsc` on its own will compile all `.ts` files in the project. Watch mode is also available with the proper flags.
:::

## Variable type annotations and inference

You can add annotations to variable declarations to tell the compiler, what type the variable should be.

```typescript
const name: string = "Wolfgang";
const age: number = 5;
const canPlayViolin: boolean = true;
```

If the value of the variable does not match the type, the compiler will throw an error.

TypeScript is great at _type inference_, so if you provide a value at the time of variable declaration, type annotations can be omitted. Often, type inference is even better than explicit types, because it can be narrower.

::: tip Annotation Vs. Inference

You would want to _declare_ the type of a variable, if you want something _narrower_ than what is inferred automatically by TypeScript, otherwise, in most cases you can trust TypeScript's _type inference_ capabilities.

:::

## Main types

The main types of TypeScript correspond the the [main types of JavaScript](../js/basics#variable-types)

- `number` (big integers have their own `bigint` type)
- `string`
- `boolean`

```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

let color: string = "blue";

let isDone: boolean = false;
```

## Other types

Beside the basics, TypeScript offers us a wide variety of types:

- [`any`](#the-any-type)
- [`unknown`](#the-unknown-type)
- [`never`](#the-never-type)
- [`void`](./functions#the-void-type)
- `null` and `undefined` have their own types - these are the subtypes of all the other types and these values can be assigned to variables of any type.

For more complex values TypeScript offers additional ways to provide type safety. Follow the links to read about these.

- `enum`
- [Object types](./objects)
- [Arrays](./arrays)
- [Tuples](./arrays#tuples)

Types can also be combined using [unions](./unions) and [intersections](./objects#intersection-types)

### The `any` type

As all valid JavaScript is also valid TypeScript, if we write pure JS, the code will be full with variables of type `any`. The value of such variables can, indeed, be anything. This way, it is basically _useless_, as it does not provide any meaningful information to the TypeScript Compiler.

It is, however, our way to _opt out_ of type-checking for a variable. It can be useful in the process of migration of a JS codebase to TS.

::: info Empty variables

Empty variables declared without value _and type annotation_ will be of `any` type. However, adding an annotation in this case lets the compiler know, what type of a variable we want to declare.

```typescript
let variableAny; // type: any
variableAny = 3;
variableAny = false;

let variableNum: number;
variableNum = "Peter"; // Error: must be number
```

:::

### The `unknown` type

Sometimes we want to tell TypeScript, that a type of variable is unknown by us, for example, because it comes from user input. TypeScript offers the `unknown` type for this. In code, the type of an `unknown` type variable can (and should, if we want to use it) be narrowed down using [type guards](./functions#type-guards).

While the `any` type can be used to opt out of type checking features, the `unknown` is simply as its name suggests, telling TypeScript that we don't know what type the value will be. If we want to run any method or pass it to a function, we are forced to use type guards and type narrowing.

### The `never` type

There is a type for cases, that should _never_ occur. With this we can ensure, that our code handles all cases, that should be handled.

TypeScript wouldn't complain if we give it the following code, where the type of `code` gets narrowed down:

```typescript
function handleStatusCode(code: 200 | 404 | 500) {
  if (code === 200) {
    console.log("OK");
    return;
  }
  // code is now 404 | 500
  if (code === 404) {
    console.log("Not Found");
    return;
  }
  // code is now 500
  throw new Error(`Unknown status code: ${code}`);
}
```

If we assign `code` to never, it will complain, unless we handle every case properly. This can be really useful, if we want to make sure, that we don't accidentally forget to handle a case that we add later.

```typescript
function handleStatusCode(code: 200 | 404 | 500) {
  if (code === 200) {
    console.log("OK");
    return;
  }
  if (code === 404) {
    console.log("Not Found");
    return;
  }
  // Type '500' is not assignable to type 'never'.
  const err: never = code;
  return err;
}
```

After we fix it by handling all cases properly, TypeScript stops complaining:

```typescript
function handleStatusCode(code: 200 | 404 | 500) {
  if (code === 200) {
    console.log("OK");
    return;
  }
  if (code === 404) {
    console.log("Not Found");
    return;
  }
  if (code === 500) {
    console.log("Internal Server Error");
    return;
  }
  // no errors! code is never
  const err: never = code;
  return err;
}
```

::: info Incompatible types
`never` is inferred as the type of the [intersection](./objects#intersection-types) of incompatible types.
:::

::: info Functions that never return
`never` is also the return type of functions, that never-ever return anything, because they always throw an Error.

```typescript
// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}
```

However, functions that reach their end, but do not return something explicitly, implicitly return `undefined`, so the return type of these functions is `void`. If you specify `never` as return type of such a function, you will get a compilation error.

:::

## Type alias

To avoid having to rewrite long custom types over and over again, these can be stored as type aliases with the `type` keyword. Usually, we give type aliases names written in PascalCase.

These come especially handy in the case of [function](./functions#function-types) or object types.

```typescript
type MathFunction = (a: number, b: number) => number;
```

## Exporting and importing types

Types can be exported from modules, and imported to other modules using the usual (ES6) `export` and `import` keywords. However, it is best practice to import types explicitly as types, so the compiler knows that it can drop these import after compiling the code to JavaScript.

```typescript
import type { User, Post } from "./types";
// This works, too:
import { type User, type Post } from "./types";
```
