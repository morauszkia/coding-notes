---
prev:
  text: "Arrays and Tuples"
  link: "./arrays"
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
