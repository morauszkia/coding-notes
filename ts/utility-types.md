---
prev:
  text: "Classes"
  link: "./classes"
---

# Utility Types

It is best practice to follow a _single source of truth_ approach instead of having definitions of tons of similar types. This means that you should try to define your types _once_ and derive similar types from that. This way changes can be made in one place.

## `Partial`

This utility type creates the new type by making the top-level properties of the main type definition optional. This might be great for update operations, if we don't always want to include all data, only data that was changed (e.g. `PATCH` requests)

```typescript
type User = {
  id: string;
  name: string;
  preferences: {
    theme: string;
    notifications: boolean;
  };
};

function updateUser(
    userId: string;
    userInfo: Partial<User>;
) {
    // Implementation
}

// Will create a type corresponding to:
type PartialUser = {
    id?: string;
    name?: string;
    preferences?: {
        theme: string;
        notifications: boolean;
    };
};
```

## `Required`

If we want the exact opposite of `Partial<T>`, we can use `Required<T>` to make all optional properties required in the new type. As `Partial` this only affects the top level. If we had optional properties in a nested level, they remain optional.

```typescript
type User = {
  id: string;
  email: string;
  username?: string;
  avatar?: string;
};

type CompleteUser = Required<User>;
```

## `Readonly`

As the name suggests, the `Readonly<T>` type makes all top-level properties of a type [`readonly`](./objects#readonly-properties-and-as-const).

```typescript
function importConfig(config: Config): Readonly<Config> {
  return config;
}
```
