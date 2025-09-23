---
prev:
  text: "Classes"
  link: "./classes"
next:
  text: "Generics"
  link: "./generics"
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

## `Record`

You can easily create the shape of an object with the `Record<K, T>` utility type, which defines a type of an object with keys of type `K` and values of type `T`.

```typescript
type StringKeyDictionary = Record<string, number>;

const mountainHeights: StringKeyDictionary = {
  "Mount Everest": 8848,
  "Mount Blanc": 4806,
  Kilimanjaro: 5895,
};
```

Records can be used to ensure that are values of a union are present as keys in an object.

```typescript
type Status = "pending" | "success" | "failure";

const statusMessageMap: Record<Status, string> = {
  pending: "Your data are being processed.",
  success: "Data successfully sent.",
  failure: "Something went wrong.",
};

type HttpStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

const statusMessages: Record<HttpStatusCode, string> = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
};
```

## `Pick`

If you don't need all keys from an object in a function, you can quickly create a type holding only a certain set of properties using `Pick<T, K>`.

```typescript
interface BlogPost {
  id: string;
  title: string;
  author: User;
  createdAt: Date;
  summary: string;
  text: string;
  comments: {
    commentId: string;
    text: string;
    author: User;
  };
  likes: number;
}

type BlogPostDescription = Pick<
  BlogPost,
  "id" | "title" | "author" | "summary"
>;
```

## `Omit`

You can do it the opposite way with `Omit<T, K>`, which leaves out the keys specified by `K`. This can be used for example to remove sensitive information from an object.

```typescript
interface DatabaseUser {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

type PublicUser = Omit<DatabaseUser, "passwordHash" | "updatedAt">;
```
