---
prev:
  text: "Generics"
  link: ":/generics"
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
