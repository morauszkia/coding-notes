---
prev:
  text: "Intro to JS"
  link: "./"
---

# Variables in JavaScript

Variables in JavaScript are declared using `let` or `const`, formerly `var` (pre ES6). The value is assigned to the variable using `=`.
Variables can be of different types (cf. [Variable Types](#variable-types))
It is also possible to create an empty variable, which is assigned a value later (in this case only `let` can be used, not `const`).
Multiple variables can be declared on the same line, separated with commas.

::: info comments
In JavaScript you can insert comments into your code.
Inline comments are written after `//`, and multi-line comments are written between `/*` and `*/`

```js
// This is a single-line comment

/*
This comments spans
multiple lines
*/
```

Comments can be used to prevent certain lines of code from being executed.
:::

```js
let age = 23;
const name = "Peter";
const friendsArray = ["Jim", "Carol", "Steve", "Sarah"];
const user = {
  name: "Sam",
  email: "sam.smith@email.com",
};

let username = "peter23", let password = "y0uW1llN3v3rGu3ssTh1s"

// empty variable
let bestFriend;

// empty array
let pets = [];
```

::: info semicolons
Lines typically end with semicolons in JavaScript, but these are (unlike in C) optional. The code will run without these, but it is easier to introduce bugs if we don't use them. Code formatters (e.g. Prettier for VS Code) will insert them by default (unless configured otherwise).
:::

The difference between `let` and `var` is that the former, when used in a loop, function, or any block, creates a variable in local scope, while `var` creates a variable in the scope of the function, which can lead to bugs.  
Once a variable has been created, it is no longer necessary to use the `let`, `const` commands again, but simply to assign the new value to the variable (`=`). If you use `let` or `const` again, you create a new variable in the actual `scope` (block) with the same name but a different scope.

## Variable names

In JavaScript variable names need to adhere to similar limitations than in other languages.

Variable names

- cannot begin with a digit
- can contain letters, digits, underscores, and dollar signs
- are case sensitive
- reserved keywords cannot be used

It is a best practice in JS to use _camelCase_ for variable names, and use descriptive variable names. Abbreviations and single letter variable names should be avoided. Shortened variable names are fine in loops (e.g. `i`) or callbacks (e.g. `char`), but otherwise it is better to use meaningful names. For booleans the best practice is to prefix the names with `is` or `has`.
For constants (variables whose value we do not change) the best practive is to use the _SCREAMING_SNAKE_CASE_.

## Variable mutability and reassignment

A variable created with `const` cannot be assigned to another value later (it cannot be mutated), but if its value is of a reference type, e.g. `Array` or another object, the latter remains mutable. The reason is that primitive values are stored in the `call stack`, but objects are stored in the `memory heap` inside the JS engine, and the variable name is assigned to the reference to the object, not to the object itself. If the object changes, any variables pointing to it will also change. If you want the object to be immutable, you can use the `Object.freeze()` method, but this only makes the first level immutable, the deeper nested data can be modified. If you want to freeze the contents of the object deeper, you need to use external packages.

```js
const birthYear = 1986;
birthYear = 86; // Error: cannot reassign!

const friends = ["John", "Peter", "Kate"];
friends.push("Jane"); // ["John", "Peter", "Kate", "Jane"];

// BUT
friends = ["Susan", "Tom", "Bob"]; // Error: reassingment to const

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

JavaScript is a dynamically typed language, which means, that the same variable name (if it was declared using `let` or `var` - but you shouldn't use var) can be reassigned to a value of a different type later. The variable type is obtained by using the `typeof` command.

::: info console.log
In the following examples I use the `console.log()` method of the built-in console object, to print values of variables to the console. In a browser you can open the developer tools to check you console, or you can read these logs in the terminal, if you are working on the backend.
:::

```js
let myAge = 34;
myAge = "forty";
let year;

console.log(typeof myAge); // string
console.log(typeof year); // undefined
console.log(year); // undefined
```

The basic types are:

- `number` - can be integers or floating point numbers, e.g. 2, 3.5, -17.2
- `string` - "A", "car", "Have a nice day'".
- `boolean` - `true` of `false`

::: info integers and floats
JavaScript does not have separate `integer` and `float` types. All numbers, except for _really_ large integers are of the type `number`.
:::

::: info declaring strings
Strings can be declared using either `"` or `'` (or backticks). You can escape special characters with `\` (e.g. `\n` is a new line).
:::

::: info string encoding
Strings are encoded as 16-bit numbers, which allows for non-English characters. Emojis are stored as a pair of 16-bit numbers.
:::

Additional types are:

- `undefined` - e.g. for variables declared without value
- `null` - is similar to undefined, but needs to be explicitly declared
- `bigInt`
- etc.

### Template literals

Template literals, introduced by ES6 are the easiest way to insert values into string templates. They are written using backticks, and variables or any JavaScript expressions can be inserted using `${}`.

```js
let name = "Peter";
let age = 23;

const greeting = `My friend ${name} is ${age} years old`;
```

### Type inference

JavaScript is a dynamically typed language. Dynamic typing means that you don't have to (and can not) declare the type of a variable, and even after declaration, you can reassign a value of a completely different type to the same variable.

### Type coercion and conversion

In certain cases, variables are coerced to other types implicitly. For instance if you add a string and a number together, the number will be silently coerced to a string, which might lead to unexpected consequences.

```js
const value1 = "5";
const value2 = 9;
let sum = value1 + value2;

console.log(sum); // "59"

const numString = "18";
const numNumber = --numString;
console.log(typeof numNumber); // Number
```

Variables can also be explicitly converted to other types.

```js
myNumber = Number("0x11"); // 17
```

## Basic operations

JavaScript supports the usual mathematical operations: addition, subtraction, multiplication, division, etc.

```js
let sum = 2 + 5; // 7
let difference = 13 - 7; // 6
let product = 2.3 * 4.7; // 10.81
let quotient = 9 / 3; // 3
let remainder = 10 % 3; // 1
let exponent = 2 ** 3; // 8
```

### Augmented assignment

To shorten calculations based on the current value, JavaScript supports augmented assignment operators:

```js
let num = 5;
num += 3; // 8
num -= 2; // 6
num *= 3; // 18
num /= 2; // 9
num **= 2; // 81
num %= 2; // 1
```

### Increment and decrement

To simplify the often used `+= 1` and `-= 1` operations, JavaScript offers the `++` increment and `--` decrement operators. Written before the variable name they perform pre-increment/decrement, while written after they perform post-increment/decrement, which can be useful, when assigning the current value to another variable.

```js
let a = 3;
let b = a++; // a = 4; b = 3;
a--; // a = 3
let c = ++a; // a = 4; c = 4;
```

::: info
Copying primitive types assigns their _value_ to the new variable. Copying reference type objects passes a pointer to the data stored in the memory heap to the new variable. If we change the original object, both variables will hold the new data.
:::
