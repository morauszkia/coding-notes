# Zod

Zod is a validation library for TypeScript or plain JavaScript. It works in all modern browsers, as well as back-end JavaScript runtimes.

You can install it to your project using `npm`/`pnpm`/`yarn`.

```bash
npm install zod
```

## Data Schemas

Zod provides a declarative way to describe data types from primitives to complex data structures.

```typescript
import { z } from "zod";

const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});
```

### Constraints

You can add constraints to your data types for more specific validation.

```typescript
const UserSchema = z.object({
  id: z.number().positive(), // must be positive
  name: z.string().min(1), // must be non-empty
  email: z.string().email(), // must be valid email format
});
```

## Single Source of Truth

Zod is your single source of truth. You define your types as schemas, and then you can get runtime data validation and compile-time types using the schemas methods. You don't need to define interfaces and write custom validation logic separately. Instead, a single definition provides runtime validation and compile-time types.

### Data Validation

Schemas can be used to validate incoming data using `.parse()`. It returns the validated data or throws a `ZodError`

```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

try {
  const user = UserSchema.parse(unknownData);
  // user is now typed and validated
  console.log(user.name); // TypeScript knows this is a string
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation failed:", error.errors);
  }
}
```

### Type Generation

You can create types from schemas using `.infer()`

```typescript
type User = z.infer<typeof UserSchema>;
// User is: { id: number; name: string }
```

## Alternatives

Zod is one of several validation libraries. Popular alternatives include

- Joi
- Yup
- class-validator
