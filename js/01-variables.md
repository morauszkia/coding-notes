---
title: "JavaScript: Variables"
---

# Variables in JavaScript

Variables in JavaScript are declared using `let` or `const`, formerly `var` (pre ES6). The value is assigned to the variable using `=`.
Variables can be of different types (cf. [Variable Types](#variable-types))
It is also possible to create an empty variable, which is assigned a value later (in this case only `let` can be used, not `const`).

```js
let age = 23;
const name = "Peter";
const friendsArray = ["Jim", "Carol", "Steve", "Sarah"];
const user = {
  name: "Sam",
  email: "sam.smith@email.com",
};

// empty variable
let bestFriend;

// empty array
let pets = [];
```

The difference between `let` and `var` is that the former, when used in a loop, function, or any block, creates a variable in local scope, while `var` creates a variable in the scope of the function, which can lead to bugs.  
Once a variable has been created, it is no longer necessary to use the `let`, `const` commands again, but simply to assign the new value to the variable (`=`). If you use `let` or `const` again, you create a new variable in the actual `scope` (block) with the same name but a different scope.

## Variable names

## Variable mutability and reassignment

A variable created with `const` cannot be assigned to another value later (it cannot be mutated), but if its value is of a reference type, e.g. `Array` or another object, the latter remains mutable. The reason is that primitive values are stored in the `call stack`, but objects are stored in the `memory heap` inside the JS engine, and the variable name is assigned to the reference to the object, not to the object itself. If the object changes, any variables pointing to it will also change. If you want the object to be immutable, you can use the `Object.freeze()` method, but this only makes the first level immutable, the deeper nested data can be modified. If you want to freeze the contents of the object deeper, you need to use external packages.

```js
const birthYear = 1986;
birthYear = 86; // Error: cannot reassign!

const friends = ["John", "Peter", "Kate"];
friends.push("Jane"); // ["John", "Peter", "Kate", "Jane"];

// BUT
friends = ["Susan", "Tom", "Bob"]; // Error

const player = {
  name: "magnus",
  points: 0,
};
player.points = 1;
player.avatar = "./images/magnus-avatar.jpg";

// BUT
player = {
  name: "greg",
  points: 0,
}; // Error: not reassignable!
```

## Variable Types

JavaScript is a dynamically typed language, which means, that the same variable name can be reassigned to a value of a different type later. The variable type is obtained by using the `typeof` command.

```js
leg myAge = 34;
myAge = "forty";
let year

console.log(typeof myAge);      // string
console.log(typeof year);       // undefined
console.log(year);              // undefined
```

The basic types are:

- number - can be integers or floating point numbers, e.g. 2, 3.5, -17.2
- string - "A", "car", "Have a nice day'".
- boolean - `True` of `False`

Additional types are:

- undefined - e.g. for undeclared variables
- null
- bigInt
- etc.

### Type inference

### Type coercion and conversion
