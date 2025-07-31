---
prev:
  text: "TypeScript Basics"
  link: "./basics"
---

# Functions

## Type of arguments and return values

One of the most useful features of TypeScript is function annotation. One can annotate the arguments and the return value of the function, and the compiler tools will alert the developer if a value of another type is passed as argument, or if there is an error in the body of the function, and if the function does not return the specified type.

Type annotation works for all types of functions.

```typescript
function add(x: number, y: number): number {
  return x + y;
}

const greet = function (name: string, greeting: string = "Hello"): void {
  console.log(`${greeting}, ${name}!`);
};

const describePerson = (name: string, age: number): string =>
  `${name} is ${age} years old.`;
```

### Return type inference

TypeScripts is good at inferring the type of the returned value as well, so the return type annotation can be left out from the function declarations.

### The `void` type

`void` is a special type that represents the return type of a function that does not return anything. In JavaScript such a function returns `undefined` by default. TypeScript uses `void` to indicate the intent more clearly, that indeed, nothing is supposed to be returned by the function.

::: info undefined
While `undefined` is an existing type in TypeScript, and functions without an explicit return value return `undefined` as a value, it cannot be specified as return value in this case, hence we use `void`.
:::

## Function types

As functions themselves can be passed as values in JavaScript, these also can have their types. These are more specific, than a simple `Function` type (which, however, exists). A function's type contains information regarding its parameters and return value.

::: tip Type aliases for functions
Function types can be stored as [type aliases](./basics#type-alias) or specified, if we declare an empty variable, that will accept a function as value.
:::

```typescript
type MathFunction = (a: number, b: number) => number;

let greetFunction: (name: string, greeting: string) => string;
```

## Type guards

If a function receives an argument that can be of [different types](./unions), a type guard can be used to narrow down, what type the value that was passed in actually has, and perform operations based on this. The compiler is really smart, and used with an IDE can show warnings if we try to perform an invalid operation.

```typescript
function safeSquare(val: string | number): number {
  if (typeof val === "string") {
    val = parseInt(val, 10);
  }
  // now val is only a number
  return val * val;
}
```

## Optional parameters

Functions can have optional parameters. In TypeScript even without default values.

Optional arguments are marked with a `?` after the name, and these need to come _after_ all required arguments. Optional arguments automatically get an `undefined` type _unioned_ to the specified type.

Of course, default values can also be used, and in this case, the argument does not have to be marked as optional.

::: tabs

=== Optional argument

The type of `title` will be `string | undefined` inside the function.

```typescript
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Gandalf"); // "Hello, Gandalf!"
greet("Gandalf", "Wizard"); // "Hello, Wizard Gandalf!"
```

=== Default value

In this case the parameter type can be _inferred_ automatically, but you can specify it, and you _should_ if you want to use a _wider_ (e.g. [union](./unions)) or _more restricted_ (e.g. [literal](./unions#literal-types)) type.

```typescript
function newCharacter(name: string, role: Class = "warrior"): string {
  return `${name} is a ${role}`;
}

console.log(newCharacter("Gandalf"));
// Gandalf is a warrior
console.log(newCharacter("Gandalf", "wizard"));
// Gandalf is a wizard
```

:::
