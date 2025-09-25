---
prev:
  text: "Utility Types"
  link: "./utility-types"
next:
  text: "Advanced Topics"
  link: "./advanced"
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

```typescript{1,14-16}
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

```typescript{1,9}
function zipArrays<T, U>(arr1: T[], arr2: U[]): [T, U][] {
  const output: [T, U][] = [];
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
    output.push([arr1[i], arr2[i]]);
  }
  return output;
}

const studentsWithTasks = zipArrays<string, string>(students, tasks);
```

## Generic Constraints

We can give TypeScript additional information about the type parameter and constrain it to have certain properties by making it _extend an interface_. For example we can tell, that the results of an API call will have unique ids on them. Or indicate that a function can be used with any type that has certain properties.

The extended type can be defined separately or where it is used in a constraint.

```typescript
interface hasId {
  id: string | number;
}

// [!code highlight]
function fetchFromApi<T extends hasId>(url: string): Promise<T | undefined> {
  // fetching logic
}

// [!code highlight]
function extractEmails<T extends { email: string }>(users: T[]): string[] {
  // do something
}
```

## Generic Types

Type parameters are not limited to be used with functions or methods. You can create generic types either using an `interface` or a _type alias_. Then you can create an object that can safely implement the given type, and functions that can safely work with it.

```typescript
// [!code highlight]
interface Store<T> {
  get(id: string): T;
  save(id: string, item: T): void;
  list(): T[];
}
// Alternatively
// type Store<T> = { ... }

type Product = {
  name: string;
  price: number;
};

const productStore = {
  products: {} as Record<string, Product>,
  get(id: string): Product {
    return this.products[id];
  },
  save(id: string, item: Product): void {
    this.products[id] = item;
  },
  list(): Product[] {
    return Object.values(this.products);
  },
};

// [!code highlight]
function addAndGetItems<T>(store: Store<T>, id: string, newItem: T): T[] {
  store.save(id, newItem);
  return store.list();
}
```

(Source: boot.dev TypeScript course)

## Generic Classes

As it was already shown with the `Stack` class above, classes can be generic, too.

::: info Complex type parameters
Type parameters can be quite complex as in the example below: a generic class can use a constrained type and implement a generic interface at the same time.
:::

```typescript
interface Repository<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
  save(item: T): void;
}

// [!code highlight]
class InMemoryRepository<T extends { id: string }> implements Repository<T> {
  private items: T[] = [];

  getAll(): T[] {
    return [...this.items];
  }

  getById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  save(item: T): void {
    const index = this.items.findIndex((i) => i.id === item.id);
    if (index >= 0) {
      this.items[index] = item;
    } else {
      this.items.push(item);
    }
  }
}
```

(Source: boot.dev TypeScript course)
