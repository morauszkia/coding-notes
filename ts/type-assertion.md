---
prev:
  text: "Type Narrowing"
  link: "./type-narrowing"
next:
  text: "Classes"
  link: "./classes"
---

# Type Assertions

There are cases, when you know better than TypeScript, what the type of a value will be. This can happen with query parameters, API responses, etc. if you have full control over them.

## The `as` keyword

We can tell TypeScript that we know _for sure_ that some value will be of a specific type using _type assertions_ with the `as` keyword.

```typescript{1,17}
const userId = (route.query?.userId as string).toLowerCase();

type User = {
  id: string;
  name: string;
};

async function getUserRaw(userId: string): Promise<unknown> {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

export async function getUser(userId: string) {
  const data = await getUserRaw(userId);
  // here data is still just "unknown"
  // so we assert it to a User type
  return data as User;
}
```

Alternatively, you can use the _angle brackets_ to assert the type of a value.

```typescript{1}
const userIdRaw = <string>route.query?.userId;
const userId = userIdRaw.toLowerCase();
```

::: tip Type Narrowing

However, you should use type assertion only if you are confident that the value will indeed be of the specified type. [Type narrowing](./type-narrowing) is usually safer.

:::

::: warning Double Assertion

TypeScript won't allow you to assert a value as another type that has no overlap with the former. You can use double assertion to overcome this limitation, but you shouldn't.

```typescript{3}
const id = 42;
// TypeScript allows this, but the code crashes at runtime
const userId = id as unknown as string;
console.log(userId.toUpperCase())
```

:::

## Non-null assertion

This is used to tell TypeScript that you are absolutely sure that a value won't be `null` or `undefined` even if the type system thinks that it might be. To achieve this, you put a `!` after the variable name.

```typescript{4}
// Suppose processString has signature (string) => string | null
const processedString = processString(inputString);
// We tell TypeScript that processedString won't be null,
// because we passed in a valid string
sendText(processedString!);
```

Non-null assertions can also be used, if we know that an otherwise optional property will be present on an object.

```typescript
/*
Suppose name is optional on the User type,
which we imported from a library.
We know, however, that we always use the 
name property for our users.
*/
greet(user.name!.first);
```

::: tip Use guard clauses

You should only use non-null assertion if you are completely confident. Otherwise, use guard clauses to narrow down the type of the value in a safer way.
:::
