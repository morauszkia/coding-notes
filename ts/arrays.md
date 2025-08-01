---
prev:
  text: "Union Types"
  link: "./unions"
---

# Arrays and Tuples

## Array types

Array types are commonly declared by specifying what type of values they contain, followed by `[]`. Besides built in types, you can use type aliases as well

```typescript
let numbersToAdd: number[];
let myFavoriteBooks: string[];
let userIds: UserId[];
```

Another way is to declare Array types using the `Array<T>` notation (where `T` stands for the type of values in the Array).

```typescript
let numbersToAdd: Array<number>;
let myFavoriteBooks: Array<string>;
let userIds: Array<UserId>;
```

### Nesting

Arrays can contain other arrays, so the following notations are also valid

```typescript
let friendsOfFriends: string[][];
let filmRatings: Array<Array<number>>;
```

### Heterogeneous Arrays

Of course, Arrays in JavaScript can hold values of different types. We can use [union types](./unions) directly, or use [type aliases](./basics#type-alias).

```typescript
let userIds: (number | string)[];
let directions: ("north" | "south" | "east" | "west")[];
```

### Rest parameters

When using rest parameters, these will have an Array type in the end, as they will be collected in an Array. We can annotate these with an Array type, just like regular Arrays.

```typescript
const listRelations = function (relationship: string, ...names: string[]) {
  return `My ${relationship} are: ${names.join(", ")}`;
};
```

### Evolving any

An Array, that is declared as being empty is treated by TypeScript as an `any[]`. If we push anything to the Array, TypeScript will infer the type of the Array based on this value, but we are still allowed to push values of different types, and TypeScript will _union_ the new types to the original.

```typescript
let inventory = [];
// inventory: any[]
inventory.push(42);
// inventory: number[]
inventory.push("robe");
// inventory: (number | string)[]
```

However, if we explicitly type the Array at initialization, we get an error, if we try to push a value of any other type.

```typescript
let inventory: string[] = [];
inventory.push(42); // ERROR!
```

But, the _evolving any_ stops evolving, as soon as it is passed around.

```typescript
function getConfig() {
  let config = [];
  // config: any[]
  config.push("api-key");
  // config: string[]
  config.push(8080);
  // config: (string | number)[]
  return config;
}

let config = getConfig();
// config: (string | number)[]

config.push(false);
// Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'
```
