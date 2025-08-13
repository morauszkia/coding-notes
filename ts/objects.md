---
prev:
  text: "Arrays and Tuples"
  link: "./arrays"
next:
  text: "Sets and Maps"
  link: "./sets-maps"
---

# Objects

TypeScript even allows you to specify the structure of an object. This way you can get better autocompletion or warning squiggly lines in your editor if you, for instance, mistype a property name or forget to add a property.

Objects can hold values of any type: even other objects, that can be typed themselves.

```typescript
type Pokemon = {
  name: string;
  types: PokemonType[];
  health: number;
};

const fight = function (opponents: [Pokemon, Pokemon]) {
  // implement fighting
};
```

## Passing objects

Objects can be passed to functions as literals or using variables. If we pass object literals to a function, TypeScript performs _excess property checking_, and won't allow any extra properties, that were not present in the object type declaration.

Generally, extra properties are fine, and only missing properties are a problem. Therefore, it is better to pass objects stored in variables, in whose case, this checking won't be performed.

```typescript
type Spaceship = {
  name: string;
  speed: number;
};

const falcon = {
  name: "Millennium Falcon",
  speed: 75,
  weapons: 4,
};

function pilot(ship: Spaceship) {
  console.log(`Piloting ${ship.name} at ${ship.speed} light-years per hour`);
}

pilot(falcon); // This is ok
pilot({ name: "Luke's X-Wing Fighter", speed: 73, weapons: 8 });
/*
Error: Object literal may only specify known properties, 
and 'weapons' does not exist in type 'Spaceship'.
*/
```

## Optional properties

Objects may have optional properties, that need not be present on all instances of a given object. For instance, we could add "weapons" as an optional property. We specify its type, but under the hood TypeScript will [union](./unions) `undefined` to the specified type.

```typescript
type Spaceship = {
  name: string;
  speed: number;
  weapons?: number;
};
```

In code, we can check for the presence of a property:

```typescript
function attack(ship: Spaceship, target: Spaceship) {
  if (!ship.weapons) {
    throw new Error("Your ship has no weapons! Flee immediately!");
  } else {
    // implement attack
  }
}
```

## Dynamic property names

If we don't know, what exact properties the objects will have, but know the type of these properties, we can use the _dynamic property syntax_ offered by TypeScript.

```typescript
type UserMetrics = {
  [key: string]: number;
};
```

Objects of this type can hold numeric values assigned to string keys.

::: info Key types
Strings are the most often used types of object keys, but JavaScript allows numbers and symbols as property keys. Actually, there is a built-in `PropertyKey` type which is a union of `string | number | symbol`
:::

Dynamic properties can be combined with regular properties that will be **required** to be present on the object.

```typescript
type FormData = {
  [field: string]: string | number | boolean;
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};
```

::: tip Optional properties
While this pattern can be used to have optional keys, this should only be used, if the keys are _unknown_, and otherwise the `?` operator should be used for _known_ but optional properties.
:::

## Readonly properties and `as const`

Properties prefixed by the `readonly` modifier are made immutable, and TypeScript won't allow our code to modify their values.

```typescript
type User = {
  readonly username: string;
  email: string;
  doNotDisturb: boolean;
};
```

The `as const` assertion can be used to render a literal value readonly. This can be used with Arrays and Objects as well, and makes objects deeply immutable at compile time.

```typescript
const colorsConst = ["red", "green", "blue"] as const;
```

Unlike `Object.freeze()` this runs at compile-time, while the latter at run-time, and, furthermore, `as const` makes all nested structures readonly as well, while `Object.freeze()` only freezes the topmost level.

::: info Type inference
Objects and arrays marked `as const` are inferred as their literal types. This way we can create enums without actually using `enum`
:::

## Empty objects

While in JavaScript objects can be created empty, and properties added later, TypeScript doesn't like that. If you create an empty object, you should declare its type, so that the compiler knows what properties to allow.

::: info Almost anything is an object

However, almost anything - even strings, numbers, etc. - can be assigned to a variable that is of type `{}`, because almost everything (except `undefined` and `null`) is an object in JavaScript.

:::

## Discriminated Unions

We can combine object types into union types, similarly to primitive types. However, in the case of objects, distinguishing between the types can be tricky. In these cases _discriminant properties_ (or _tags_) can help. These are just a property that tells, which type of object we are dealing with, and can be used in code to distinguish between the types of object, and run code based on the type.

Unions of objects with a _discriminant property_ are called _discriminated unions_.

```typescript
type MultipleChoiceLesson = {
  kind: "multiple-choice"; // Discriminant property
  question: string;
  studentAnswer: string;
  correctAnswer: string;
};

type CodingLesson = {
  kind: "coding"; // Discriminant property
  studentCode: string;
  solutionCode: string;
};

type Lesson = MultipleChoiceLesson | CodingLesson;

function isCorrect(lesson: Lesson): boolean {
  switch (lesson.kind) {
    case "multiple-choice":
      return lesson.studentAnswer === lesson.correctAnswer;
    case "coding":
      return lesson.studentCode === lesson.solutionCode;
  }
}
```

If we add a new type to the union, but forget to handle it in the function, where we use this type, TypeScript will yell at us.

:::info Convention
While you can use any name for the tag, it is a convention worth following to use `kind`.
:::

## Satisfies

The `satisfies` operator can be used to both

1. let TypeScript infer the types of values, which is flexible, but might miss errors
2. use explicit type annotations, which is good for catching errors, but loses literal information

For example TypeScript would miss a typo:

```typescript
// Using type inference (flexible but might miss errors)
const colors = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",

  // "classic Lane-style typo" - Allan
  yelow: "#FFFF00",
};
```

We can create a custom type to catch such typos, but we lose the more specific literal-value type information.

```typescript
type ColorMap = {
  red: string;
  green: string;
  blue: string;
  yellow: string;
};

const colorsTyped: ColorMap = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  // Error: "yelow" is not in type ColorMap
  yelow: "#FFFF00",
};

// RedHex is any 'string'
// where it used to be the literal "#FF0000"
type RedHex = typeof colors.red;
```

The `satisfies` operator solves this problem:

```typescript
type ColorMap = {
  red: string;
  green: string;
  blue: string;
  yellow: string;
};

const colorsSatisfies = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  yellow: "#FFFF00",
  // Error: "yelow" is not in type ColorMap
  // yelow: "#FFFF00"
} satisfies ColorMap;

// We keep the literal types!
type RedHexSatisfies = typeof colorsSatisfies.red; // "#FF0000"
```

## Intersection Types

We can use the `&` operator to create an intersection type, which will have all the properties of both original objects.

```typescript
type Point2D = {
  x: number;
  y: number;
};

type Point3D = Point2D & {
  z: number;
};
```
