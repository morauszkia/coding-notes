---
prev:
  text: "Utility Types"
  link: "./utility-types"
---

# Generics

Generics are a powerful feature of TypeScript that let you write reusable logic that can be used with various types. Think of a Stack or a Queue that can hold any type of value. You can write the logic once and use the data structure with values of type `number`, `string`, `boolean` or any custom type that you can think of. Furthermore, TypeScript won't lose the type information as it would with `any`.

::: info Utility Types
TypeScript's [utility types](./utility-types) themselves are generics. They can receive any type of object and return a new type.
:::

A common convention is to use `T` for the variable type. If we use multiple type parameteres, capital letters, like `U`, `V`, etc. are used.

```typescript
class Stack<T> {
  private items: T[] = [];

  // implementation details
}

type bracket = "(" | ")" | "[" | "]" | "{" | "}";

const bracketsStack = new Stack<bracket>();
```

Another useful case is a fetch function that is used with various endpoints to fetch data of user, comments, posts, etc. Without generics you would get a `Promise<any>` return type by default, which is not too useful. With generics you can specify, what value you are expecting to get from a successful fetch request.

```typescript
async function fetchFromAPI<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Fetch request failed with code ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const users = await fetchFromAPI<User[]>("https://api.example.com/users");
const user = await fetchFromAPI<User>("https://api.example.com/users/1");
const posts = await fetchFromAPI<Post[]>("https://api.example.com/posts");
```

You can have multiple type parameters. For example, you can have a type parameter for your input and one for your output, or you can have type parameters for your function parameters.

```typescript
function zipArrays<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const output: [T, U][] = [];
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    output.push([arr1[i], arr2[i]]);
  }
  return output;
}

const studentsWithTasks = zipArrays<string, string>(students, tasks);
```
