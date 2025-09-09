---
prev:
  text: "Sets and Maps"
  link: "./sets-maps"
---

# Enums

Enums are a set of defined constants. Their simplest form is a _numeric enum_. The actual values are numbers, but we use names to make our life easier. The benefit is, that while your code is nicer and easier to read, under the hood you use simple unique values.

```typescript
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let myDirection: Direction = Direction.Up;
console.log(myDirection); // The output will be 0;
```

::: info Converting from value to label and vice versa
Numeric enums are bidirectional, which makes it easy to convert between their values and labels.

```typescript
const directionValue: number = Direction.Left;
const directionName: string = Direction[directionValue];
```

:::

The values can also be explicitly set. It is also possible, to set the initial value, and let TypeScript increment the value for the rest.

```typescript
enum StatusCode {
  OK = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
}

enum Direction2 {
  Up = 1,
  Down, // 2
  Left, // 3
  Right, // 4
}
```

## String enums

Values can also be strings. String enums are easy to work with, if you want labels. Using enums help avoid typos in the code, and also makes autocomplete possible. Also, if you need to serialize enums to JSON or store them in a database, numeric enums are not informative enough, as their values are stored as numbers without labels.

```typescript
enum PokemonType {
  FIRE = "fire",
  WATER = "water",
  POISON = "poison",
  GRASS = "grass",
  MISC = "miscellaneous",
}

function describePokemon(name: string, type: PokemonType) {
  return `${name} is a ${type} pokemon.`;
}
```

## Compilation of enums

Enums generate additional code at runtime, which creates the bidirectional mapping for numeric enums and also maps names to string values for string enums.

```typescript
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum PokemonType {
  FIRE = "fire",
  WATER = "water",
  POISON = "poison",
  GRASS = "grass",
  MISC = "miscellaneous",
}
```

Will be compiled to the following JavaScript code.

```javascript
"use strict";
var Direction;
(function (Direction) {
  Direction[(Direction["Up"] = 0)] = "Up";
  Direction[(Direction["Down"] = 1)] = "Down";
  Direction[(Direction["Left"] = 2)] = "Left";
  Direction[(Direction["Right"] = 3)] = "Right";
})(Direction || (Direction = {}));

var PokemonType;
(function (PokemonType) {
  PokemonType["FIRE"] = "fire";
  PokemonType["WATER"] = "water";
  PokemonType["POISON"] = "poison";
  PokemonType["GRASS"] = "grass";
  PokemonType["MISC"] = "miscellaneous";
})(PokemonType || (PokemonType = {}));
```

## Const enums

These are a special variant of enums that don't produce extra code during compilation. These are more performant, but they have their limitations.

Their member initializers must be constant expressions: they can reference other enum members, but can't use arbitrary expressions.

```typescript
const enum FavoriteActor {
  BradPitt = "Brad Pitt",
  AngelinaJolie = "Angelina Jolie",
  // this is okay, it references enum members
  BestCouple = FavoriteActor.BradPitt + " and " + FavoriteActor.AngelinaJolie,
}

const enum FavoriteActor {
  BradPitt = "Brad Pitt",
  AngelinaJolie = "Angelina Jolie",
  // this is not okay
  // const enum member initializers must be constant expressions
  BestCouple = getBestCouple(),
}

// Source: boot.dev
```

Getting the name using the number is impossible, because they don't have runtime representation

```typescript
const enum Direction {
  North, // 0
  East, // 1
  South, // 2
  West, // 3
}

const directionValue = Direction.West;

// This errors:
// A const enum member can only be accessed using a string literal.(2476)
const directionName = Direction[directionValue];

// and if you do use a string literal, it just returns the value again
const directionValueAgain = Direction["West"];
// 3
```

## Enums vs. Unions

Unions are

- used for complex types, so it feels consistent to use them for primitives as well
- less verbose to write
- don't produce additional code

Enums are

- easier to refactor, because you only have to change a label in one place
- reverse mapping of numeric enums can be useful
