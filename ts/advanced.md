---
prev:
  text: "Generics"
  link: "./generics"
next:
  text: "Local Development with TS"
  link: "./local-development"
---

# Advanced Topics

The following topics are rather advanced and most likely won't be used in application code. They are, however, useful for library code that tends to be as general as possible, to be applicable to various concrete examples.

## Conditional Types

One such feature of TypeScript is to assign types conditionally, based on some condition regarding the type system is true or false. They take the following form.

```typescript
type NewType = SomeType extends AnotherType ? TrueType : FalseType;
```

If the specified condition (`SomeType extends AnotherType` in this case) is true, then `NewType` will become `TrueType`, otherwise it will be `FalseType`.

TypeScript has some conditional types built in:

- `Extract<T, U>` will be `T` if `T extends U`, else it will be `never`
- `Exclude<T, U>` conversely will be `T` if `T extends U` is false
- `NonNullable<T>` is `T` if `null | undefined` cannot be assigned to `T`

Such conditional types can be used, for example, to create a type that corresponds to a subset of a union type based on a condition (e.g. mouse related events)

### Infer conditional type

`infer` can be used inside a conditional type to use the type of a value from a true branch.

For example we can get the return type of any function, or the type of the first argument of a function with `infer`. We insert `infer` into the condition to tell TypeScript, that we want it to treat that value as a type variable, and return it for the true or false branch.

```typescript
// Will get the return type of any function and capture it in a type variable
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// Will get the type of the first parameter of the function. Falls back to unknown
type InputTypeOf<T> = T extends (x: infer A) => any ? A : unknown;
```

## Mapped Types

We can create new types based on the properties of old types, and can perform various actions with the properties. E.g. we can make them optional, readonly, or change their type. We use the `[K in keyof Original]` dynamic property name to tell TypeScript that we want to apply the following to all the keys of the original type.

```typescript
type Soldier = {
  name: string;
  age: number;
  branch: "garrison" | "military police" | "survey corps";
};

// Makes all properties optional
type OptionalSoldier = {
  [K in keyof Soldier]?: Soldier[K]; // [!code highlight]
};

// Makes all properties of type string
type StringifiedSoldier = {
  [K in keyof Soldier]: string; // [!code highlight]
};
```

Mapped Types can be generic, too. For example the `Blank` type accepts any object `T`.

```typescript
export type Blank<T> = {
  [K in keyof T]: null; // [!code highlight]
};

// [!code highlight]
export function resetForm<T>(form: T): Blank<T> {
  let emptyForm = {} as Blank<T>; // [!code highlight]
  for (let field in form) {
    emptyForm[field] = null;
  }
  return emptyForm;
}
```

### Mapped types with conditionals

You can combine the two: add conditionals to mapped types. E.g. you might want to only copy properties that are of type `string`. You can assign the new types conditionally. Properties that evaluate to `never` are excluded. You can use both the true and the false branch, and have generic types.

```typescript
type FilteredSoldier = {
  [K in keyof Soldier]: Soldier[K] extends string ? Soldier[K] : never;
};

type EditableFields<T> = {
  [K in keyof T]: T[K] extends object ? never : T[K];
};
```

### Extracting keys conditionally

Mapped types can also be used to extract keys. We create a type with the fields that we want to extract based on some condition, and assign the key names as types for the keys. Then we can index into the type using its keys, and create a union of its values.

```typescript
type StringKeys<T> = {
  // We extract string-like properties
  // [!code highlight]
  [K in keyof T]: T[K] extends string ? K : never;
};

/*
The result will be:
type Result = {
  name: "name";
  age: never;
  branch: "branch";
};
*/

// [!code highlight]
type StringKeyUnion<T> = StringKeys<T>[keyof T];

type Keys = StringKeyUnion<Soldier>;
// "name" | "branch"
```

You can do this task in a single step:

```typescript
type NumberKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];
```
