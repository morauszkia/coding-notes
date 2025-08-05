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

## Variable type annotations

You can add annotations to variable declarations to tell the compiler, what type the variable should be.

```typescript
const name: string = "Wolfgang";
const age: number = 5;
const canPlayViolin: boolean = true;
```

If the value of the variable does not match the type, the compiler will throw an error.

### Main types

The main types of TypeScript correspond the the [main types of JavaScript](../js/basics#variable-types)

- `number`
- `string`
- `boolean`

### Type inference

TypeScript is great at type inference, so if you provide a value at the time of variable declaration, type annotations can be omitted.

### The `any` type

As all valid JavaScript is also valid TypeScript, if we write pure JS, the code will be full with variables of type `any`. The value of such variables can, indeed, be anything. This way, it is basically _useless_, as it does not provide any meaningful information to the TypeScript Compiler.

It is, however, our way to _opt out_ of type-checking for a variable. It can be useful in the process of migration of a JS codebase to TS.

### Empty variables

Empty variables declared without value _and type annotation_ will be of `any` type. However, adding an annotation in this case lets the compiler know, what type of a variable we want to declare.

```typescript
let variableAny; // type: any
variableAny = 3;
variableAny = false;

let variableNum: number;
variableNum = "Peter"; // Error: must be number
```

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
