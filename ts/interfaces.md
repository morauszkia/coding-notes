---
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

## Extending Interfaces

Compared to using `type`, interfaces are better when it comes to extending: inheriting properties.

```typescript
interface Character {
  name: string;
  level: number;
}

interface Wizard extends Character {
  spellbook: string[];
  mana: number;
}
```

With types, you would use an [intersection](./objects#intersection-types) for this.

```typescript
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

interface BattleMage extends Character, Magical, Physical {
  combineAttacks(): void;
}
```

::: info Overriding properties

You can even override properties of the interface you want to extend, but only using compatible properties.

```typescript
interface Character {
  rank: string | number;
  name: string;
  level: number;
}

interface Wizard extends Character {
  rank: number;
  mana: number;
}
```

:::

::: warning Declaration merging

However, with interfaces you need to be aware, that if you declare multiple interfaces with the same name, they will be merged into a single interface with all of the properties. With `type` declarations, you get an error, if you try to reuse a name.

:::
