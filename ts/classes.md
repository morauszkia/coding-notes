---
prev:
  text: "Type Assertion"
  link: "./type-assertion"
next:
  text: "Utility Types"
  link: "./utility-types"
---

# Classes

In TypeScript classes work pretty much the same as in JavaScript, except for a few differences that are connected to type annotations.

(Some examples are from [Boot.dev](https://www.boot.dev/))

::: tabs

== typescript

```typescript
class Person {
  name: string;
  age: number;
  friends?: Person[] = [];

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  addFriend(friend: Person): void {
    if (!friends.includes(friend)) {
      this.friends.push(friend);
    }
  }
}
```

== javascript

```javascript
class Person {
  friends = [];

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  addFriend(friend) {
    if (!friends.includes(friend)) {
      this.friends.push(friend);
    }
  }
}
```

:::

If the values of the fields don't depend on the initialization, you can set them right at the top with their type declaration (see `friends` in the example above).

## Optional Properties

Classes can have optional properties, similarly to [objects](./objects#optional-properties) and [interfaces](./interfaces).

```typescript
class Person {
  name?: string,
  age = 30;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }
  // ...
}
```

## Access Modifiers

Classes can have `private`, `protected` properties that can only be access from inside the class itself or inside the class and its subclasses. Classes can, similarly to types and interfaces have `readonly` properties that cannot be changed after initial declaration in the constructor (in such case they should be `public`) or at the top of the class. Classes can also be `abstract` that cannot be instantiated, and only provide templates for the implementation of certain methods in subclasses.

### Private Class Members

You can use JavaScript's `#` to indicate that a class member is private (only accessible from within the class). If you try to access such a member from outside, JavaScript will crash at runtime, but TypeScript will warn you at _compile time_.

```typescript
class Department {
  id: string;
  name: string;
  #employees: string[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addEmployee(employee: string) {
    this.#employees.push(employee);
  }
}

const hr = new Department("d1", "human resources");
hr.addEmployee("Susan");

// Property '#employees' is not accessible outside class 'Department' because
// it has a private identifier.
console.log(hr.#employees[0]); // [!code error]
```

### Private properties in older TypeScript code

The option to create private properties was added in TypeScript before JavaScript, which introduced private properties with ES2022. In older TypeScript code you can come across the `private` and `protected` keywords.

::: tip Use the JavaScript syntax
While you may find the older syntax in TypeScript code, and it works, it is recommended to use the `#property` syntax because it's the native JavaScript way to do it. The older syntax can be used if you want to target older versions of JavaScript, that don't have the `#` syntax.
:::

### Protected properties

The `protected` keyword, however is unique in that it allows access not only inside the class but also inside its _subclasses_. There is no native JavaScript equivalent.

```typescript
class Character {
  protected health: number; // [!code highlight]

  constructor(health: number) {
    this.health = health;
  }

  // [!code highlight]
  protected takeDamage(amount: number): void {
    this.health -= amount;
    if (this.health < 0) {
      this.health = 0;
    }
  }
}

class Fighter extends Character {
  constructor(health: number) {
    super(health);
  }

  public fight(damage: number): void {
    this.takeDamage(damage); // [!code highlight]
    console.log(`Fighter took ${damage} damage. Health: ${this.health}`); // [!code highlight]
  }
}

const fighter = new Fighter(100);
fighter.fight(30);

// Error: Property 'health' is protected and only accessible within class 'Character' and its subclasses
console.log(fighter.health);

// Error: Property 'takeDamage' is protected and only accessible within class 'Character' and its subclasses
fighter.takeDamage(10);
```

### Readonly properties

You can declare a property to be `readonly`. These cannot be changed after initial declaration.

```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};
```

If you then try to change such a property, the compiler will warn you.

```typescript
function moveX(p: Point, offset: number): Point {
  p.x += offset; [!code error]
  return p;
}
```

### Parameter properties

TypeScript has a shorter syntax to declare and initialize class properties directly in the _constructor parameters_. In such a case, you have to add the access modifiers including the `public` modifiers to every property.

The body of the constructor is left empty, and TypeScript will automatically declare properties with the same name and type, and assign the parameter values to the properties.

::: info No `#` here
In the constructor you cannot use the `#` to declare a private property. You need to use TypeScript's own `private` keyword. If you want to use `#`, you have to declare these the usual way.
:::

```typescript{4}
class Department {
  #employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
}
```

### Abstract classes and members

Abstract classes are classes that cannot be instantiated directly, but templates for inheritance. We can force subclasses to implement specific methods and have specific properties.
Both the class and the method is marked with the `abstract` keyword.

::: info Regular methods
Abstract classes may have regular methods and properties that are implemented on the abstract class and inherited, too.
:::

```typescript
abstract class Shape {
  // [!code highlight]
  size: "small" | "medium" | "large";
  constructor(size: "small" | "medium" | "large") {
    this.size = size;
  }

  abstract calculateArea(): number; // [!code highlight]
  displayArea(): void {
    console.log(`The area of this shape is ${this.calculateArea()}`);
  }
}

// Error: Cannot create an instance of an abstract class
const smallShape = new Shape("small"); // [!code error]
```

Abstract classes are used to enforce certain rules at compile time, but are removed from the compiled JavaScript code.

## Inheritance

As in JavaScript, subclasses can inherit from parent classes with the `extends` keyword. Subclasses can extend regular or abstract classes, but only one class.

```typescript
class Circle extends Shape {
  radius: number;
  constructor(size: "small" | "medium" | "large") {
    super(size);
    if (this.size === "small") {
      this.radius = 5;
    } else if (this.size === "medium") {
      this.radius = 10;
    } else {
      this.radius = 15;
    }
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

## Interface Implementation

Classes can also implement [interfaces](./interfaces), and unlike inheritance, a class can implement multiple interfaces at the same time.

```typescript
interface Hero {
  name: string;
  health: number;
}

interface Magician {
  mana: number;
  castSpell(cost: number): void;
}

class Wizard implements Hero, Magician {
  name: string;
  health: number;
  mana: number;

  constructor(name: string, health: number, mana: number) {
    this.name = name;
    this.health = health;
    this.mana = mana;
  }

  castSpell(cost: number): void {
    this.mana -= cost;
    console.log(
      `${this.name} cast a spell costing ${cost} mana. Remaining mana: ${this.mana}`
    );
  }
}
```

## The `this` parameter

TypeScript is typically good at inferring the type of `this` correctly. However, you can add the `this` parameter to your methods. This way we can indicate, that a method can be called on an object of the specified Class. This can be useful, because methods can be copied to other objects that are not instances of the same class. TypeScript will warn us, if we do so.

```typescript{8-10}
class Department {
  name: string;
  private employees: string[] = [];

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department) {
    console.log(`Department: ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }
}
```

## Classes vs. Interfaces vs. Types

Classes have the advantage that they

- may have `private`, `protected`, `static` or `abstract` members
- have a constructor
- have predefined method implementations on all instances
- support inheritance

But interfaces and types

- have no runtime overhead
- are simpler to work with if you don't need the extra features
- are more flexible, especially with plain objects
- interfaces can be extended and merged in many ways
