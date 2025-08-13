---
prev:
  text: "Union Types"
  link: "./unions"
next:
  text: "Objects"
  link: "./objects"
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
/* 
Error: Argument of type 'boolean' is not assignable 
to parameter of type 'string | number'
*/
```

## Tuples

A tuple in TypeScript is a special type of array where each position has a specified type.

In the case of tuples, we need to be explicit, as TypeScript would infer a union type array.

```typescript
const nameAndLevel: [string, number] = ["Gandalf", 100];
```

::: warning Push and pop
Tuples are still arrays under the hood. You need to be aware, that TypeScript would allow you to push to and pop from a tuple.
:::

::: tip Readonly Tuples
You can specify a tuple to be readonly at creation, and this way it actually becomes immutable.

However, pay attention to the fact that `readonly` is TypeScript, and disappears after compilation, so it is not enforced at runtime.
:::

### Tuples vs. Objects

Tuples can be used in similar situation as Objects. Instead of accessing values by property name, you can access values by index. Tuples are therefore better, _if ordering matters_.

```typescript
type Distances = [number, number, number];

// instead of { first: number; second: number; third: number };
```

### Return Tuples

Tuples are useful if we want to return multiple values from a function, which is impossible in JavaScript/TypeScript. However, using a Tuple, combined with destructuring at the receiving end solves this problem.

```typescript
function getName(fullName: string): [string, string] {
  const parts = fullName.split(" ");
  return [parts[0], parts[1]];
}

const [firstName, lastName] = getName("Frodo Baggins");

type UserWithAddress = [string, { city: string; country: string }];
```

With nested destructuring it looks like this:

```typescript
const userData: UserWithAddress = [
  "Aragorn",
  { city: "Minas Tirith", country: "Gondor" },
];

const [userName, { city, country }] = userData;
```

### Named Tuples

The positions of a tuple can also be labeled to be more descriptive. These are just labels for documentation, and do not work as property names. In destructuring you can assign any name to the positions. _Only the positions matter_.

```typescript
type UserDataLabeled = [name: string, age: number, isAdmin: boolean];
```

### Optional elements

As with objects and functions, you can make tuple elements optional using the `?` modifier. Optional values must come last. However, there can be several optional values. These get `undefined` unioned to their type.

```typescript
type HttpResponse = [statusCode: number, data: string, error?: string];

// Both of these work!
const successResponse: HttpResponse = [200, "Success!"];
const errorResponse: HttpResponse = [404, "", "Resource not found"];
```

### Tuples with variable number of elements

You can use the rest pattern to have your tuple have a variable number of elements of a specific type. While this is getting really close to being a simple array, it defines the type more narrowly.

```typescript
type Command = [name: string, ...args: string[]];

const gitCommit: Command = ["git", "commit", "-m", "Add new feature"];
const npmInstall: Command = ["npm", "install", "typescript"];

// Function that handles commands
function executeCommand([cmd, ...args]: Command) {
  console.log(`Executing ${cmd} with arguments: ${args.join(", ")}`);
}
```
