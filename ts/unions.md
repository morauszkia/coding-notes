---
prev:
  text: "Functions"
  link: "./functions"
next:
  text: "Arrays"
  link: "./arrays"
---

# Union Types

We can use union types, if a variable can have a value of different types. Union types can be used in variable declarations, argument or return type declarations and type aliases as well.

```typescript
type UserId = number | string;

function getTicketInfo(id: number | string): string {
  // do something
}
```

## Literal types

In some cases a `string` or `number` is not restrictive enough, because we want our arguments to have a value out of a smaller set of possible string or numeric values. In this case we can use a _literal type_, which will be a union of specific values.

::: info Enums
Other languages use Enums for this purpose, and TypeScript also has Enums, but literal types are a more lightweight solution.
:::

```typescript{1}
type Direction = "north" | "east" | "south" | "west";

function move(direction: Direction) {
  // do something
}
```

::: info Declared constants
If we declare a string or number variable with `const`, it will be inferred as a literal type automatically by TypeScript
:::

### Superset unions

It just happens sometimes, that while most of the time the value of a parameter will be one of a smaller set of possible values, but we want to accommodate other valid cases. Enter: _superset unions_. While these do not help in narrowing down the possible values, the IDEs can use these to provide better autocompletion.

```typescript
type ErrorCode = 200 | 404 | 500 | number;
```

### Template literal types

This feature is incredibly powerful: TypeScript lets you create union types or perform pattern matching using template literals.

For example you can do:

```typescript
type Class = "wizard" | "warrior" | "rogue";
type Hero = `elf ${Class}`;
// Hero will be of type "elf wizard" | "elf warrior" | "elf rogue"
```

or even:

```typescript
type Class = "wizard" | "warrior" | "rogue";
type Race = "elf" | "human" | "dwarf";
type Hero = `Hero: ${Race} ${Class}`;
// Hero will be the string starting with "Hero: " and ending with any combination of a valid Race and a valid Class.
```

And you can do pattern matching:

```typescript
type logRecord = `${string}: ${number}`;
```

::: warning "Type Masturbation" (sic!)
Don't overdo this!
While it might be easy, and therefore, perhaps, tempting to create template literal types that combine several union types, all of which combine several valid values, and hence, can have thousands or even millions of valid types all adhering to a specific pattern, this will slow down the editor and compilation, and therefore, TypeScript won't allow it after a certain point.

::: tip Tip: Use a `string` instead

:::
