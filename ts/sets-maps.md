---
prev:
  text: "Interfaces"
  link: "./interfaces"
next:
  text: "Enums"
  link: "./enums"
---

# Additional Data Structures

## Sets

Sets are unordered data structures that hold unique values. They can be created from Arrays, too, and can be used to remove duplicate values.
You can declare types of Sets with the following syntax:

```typescript
const fruits = new Set<string>(); // [!code highlight]

fruits.add("apple");
fruits.add("pear");
fruits.add("grapes");

fruits.add(3); // [!code error]
/*
Error: Argument of type '3' is not assignable 
to parameter of type 'string'
*/

const basket = ["carrot", "potato", "lettuce", "carrot", "lettuce"];
const vegetables = new Set<string>(basket); // [!code highlight]
```

## Maps

Maps are collections of key-value pairs. You can specify the type of the keys and values.

```typescript
const animalSpeeds = new Map<string, number>(); // [!code highlight]

animalSpeeds.set("peregrine falcon", 389);
animalSpeeds.set("rock dove", 148.9);
animalSpeeds.set("cheetah", 115);

animalSpeeds.set("snail", "terribly slow"); // [!code error]
animalSpeeds.set(false, 32); // [!code error]
```
