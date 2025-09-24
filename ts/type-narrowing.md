---
prev:
  text: "Enums"
  link: "./enums"
next:
  text: "Type Assertion"
  link: "./type-assertion"
---

# Type Narrowing

As a general rule, having narrower types is better, because with narrower types

- your editor tooling can be more helpful
- your code will self-document better
- you catch more errors at compile time.

## Using Conditional Statements

TypeScript is quite good at recognizing type narrowing in regular code. You can use a conditional statement to check if the object is of a specific subtype of a wider union type, and TypeScript will automatically treat the object appropriately, without explicitly casting the object to the narrower type.

```typescript
type RegularCustomer = {
  plan: "regular";
  tickets: number;
  aboveLimit: boolean;
};

type PremiumCustomer = {
  plan: "premium";
  tickets: number;
};

export type Customer = RegularCustomer | PremiumCustomer;

export function openTicket(customer: Customer): number {
  // TypeScript will know, that the customer is of the type RegularCustomer if his plan is "regular"
  // [!code highlight]
  if (customer.plan === "regular" && customer.aboveLimit) {
    return -1;
  }
  return customer.tickets + 1;
}
```

::: info Guard clauses
Guard clauses (or _early returns_ in other words) are great to quickly narrow down types of values coming from I/O and external APIs.
:::

TypeScript is even smart enough to narrow down types based on the equality of values. In the example below, TypeScript figures out, that if `x === y`, then `x` and `y` must be of type `string`, because that's the only common type.

```typescript
function example(x: string | number, y: string | boolean) {
  // [!code highlight]
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    console.log(x.toUpperCase());
    console.log(y.toLowerCase());
  } else {
    console.log(x);
    console.log(y);
  }
}
```

## Using `in`

The keyword `in` can be used to check if a property is present in an Object, and can be used to narrow down Object literals. This accomplishes a similar task as [discriminated unions](./objects#discriminated-unions), which are preferable if we have full control over the types. Using `in` can be useful when working with types from external libraries.

```typescript
type TextMessage = {
  content: string;
  sentAt: Date;
};

type ImageMessage = {
  caption: string;
  sentAt: Date;
};

type VideoMessage = {
  duration: number;
  sentAt: Date;
};

type Message = TextMessage | ImageMessage | VideoMessage;

function displayMessage(message: Message) {
  // [!code highlight]
  if ("content" in message) {
    // TypeScript will know it is a TextMessage
    console.log(`Text content is: ${message.content}`);
    // [!code highlight]
  } else if ("caption" in message) {
    // TypeScript knows this is an ImageMessage
    console.log(`Image caption is ${message.caption}`);
    // [!code highlight]
  } else {
    // TypeScript knows this is a VideoMessage
    console.log(`Video length is ${message.duration}`);
  }
}
```

## Type Predicates

TypeScript allows you to create your own type guards. We create a function that

- accepts a wider type that we want to narrow down
- returns a boolean indicating if the value is of the desired type
- uses _type predicate syntax_ in the return type: `value is Type`

```typescript
type Pet = Fish | Bird;

// [!code highlight]
function isFish(pet: Pet): pet is Fish {
  return "swim" in pet;
}

// [!code highlight]
function isBird(pet: Pet): pet is Bird {
  return "fly" in pet;
}

function movePet(pet: Pet) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```
