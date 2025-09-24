---
prev:
  text: "Objects"
  link: "./objects"
next:
  text: "Sets and Maps"
  link: "./sets-maps"
---

# Interfaces

Interfaces are another way to describe [objects](./objects) in TypeScript.

In 9/10 scenarios the two work the same way. However, there are differences.

::: info Names
Sometimes you see interfaces' names start with `I`. This is not mandatory.
:::

These two describe the same structure:

```typescript
type Pokemon = {
  name: string;
  types: PokemonType[];
  health: number;
};

interface IPokemon {
  name: string;
  types: PokemonType[];
  health: number;
}
```

Methods can be declared using two, slightly differing syntaxes:

```typescript
interface Pokemon {
  name: string;
  types: PokemonType[];
  health: number;
  attack(opponent: Pokemon): void; // [!code highlight]
}

interface Digimon {
  name: string;
  types: DigimonType[];
  health: number;
  attack: (opponent: Digimon) => void; // [!code highlight]
}
```

::: info Function interfaces
As functions are objects, these can also be typed using interfaces:

```typescript
interface MathFn {
  (a: number, b: number): number;
}
```

:::

::: info Optional and readonly properties, dynamic property names
You can have optional and readonly properties also if you declare the type of an object using interfaces. You can have [dynamic property names](./objects#dynamic-property-names), too.

```typescript
interface Spaceship {
  readonly id: string; // [!code highlight]
  name: string;
  speed: number;
  weapons?: number;
}

interface Query {
  [param: string]: string | string[]; // [!code highlight]
}
```

:::

## Extending Interfaces

Compared to using `type`, interfaces are better when it comes to extending: inheriting properties.

```typescript
interface Character {
  name: string;
  level: number;
}

// [!code highlight]
interface Wizard extends Character {
  spellbook: string[];
  mana: number;
}
```

With types, you would use an [intersection](./objects#intersection-types) for this.

```typescript{6-9}
type Character = {
  name: string;
  level: number;
};

type Wizard = Character & {
  spellbook: string[];
  mana: number;
};
```

::: info Advantages of extended interfaces
To put it simply, interfaces provide better DX and compilation is a bit faster. Intersections sometimes produce `never`, interfaces display consistently better.
:::

### Extend multiple interfaces

It is possible to extend multiple interfaces at once.

```typescript
type Character = {
  name: string;
  level: number;
};

interface Magical {
  mana: number;
  castSpell(spell: string): void;
}

interface Physical {
  strength: number;
  attack(): void;
}

// [!code highlight]
interface BattleMage extends Character, Magical, Physical {
  combineAttacks(): void;
}
```

::: info Overriding properties

You can even override properties of the interface you want to extend, but only using compatible properties.

```typescript
interface Character {
  rank: string | number; // [!code highlight]
  name: string;
  level: number;
}

interface Wizard extends Character {
  rank: number; // [!code highlight]
  mana: number;
}
```

:::

::: warning Declaration merging

However, with interfaces you need to be aware, that if you declare multiple interfaces with the same name, they will be merged into a single interface with all of the properties. With `type` declarations, you get an error, if you try to reuse a name.

However, this can be used to merge additional properties to imported interfaces.

:::

::: info Implementation

Interfaces can also be [implemented by classes](./classes#interface-implementation).

:::
