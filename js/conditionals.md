# Conditional Logic

In JavaScript, to execute certain parts of our code only if a condition is met, we can use conditional (if/else) statements, a switch statement, a ternary operator or short circuiting. There are also logical assignment operators to overwrite only truthy or falsy values.

To formulate conditions, we can use comparison operators, and to combine them into complex logical expressions, we can use logical operators.

## Truthy of Falsy values

In JavaScript any value can be used in a boolean context, and evaluates to a boolean.

Falsy values are:

- `false`
- `0`, `-0`, `0n` (BigInt), `NaN`
- `""`
- `null`, `undefined`

::: warning Empty objects are truthy
All other values are truthy, including empty arrays and objects! Functions are also truthy, as well as `"0"` or `"false"`.
:::

## Comparison operators

JavaScript uses (mostly) the usual comparison operators to compare two values.

::: info Strict equality
An interesting quirk of JavaScript is the difference between the "regular" equality operator (`==`) and the _strict equality operator_ (`===`). THe first one performs type coercion, while the latter does not.

::: tip Always choose strict
To avoid unexpected coercion leading to bugs, it is advisable to always use the strict equality operator.
:::

| Operator | Meaning                    | Example     | Result  |
| -------- | -------------------------- | ----------- | ------- |
| `==`     | Equal (type coercion)      | `5 == '5'`  | `true`  |
| `===`    | Strict equal (no coercion) | `5 === '5'` | `false` |
| `!=`     | Not equal (type coercion)  | `5 != '5'`  | `false` |
| `!==`    | Strict not equal           | `5 !== '5'` | `true`  |
| `>`      | Greater than               | `10 > 5`    | `true`  |
| `<`      | Less than                  | `10 < 5`    | `false` |
| `>=`     | Greater than or equal      | `10 >= 10`  | `true`  |
| `<=`     | Less than or equal         | `5 <= 10`   | `true`  |

::: warning Strange cases

If you use JavaScript, you have to be mindful of type coercion and other strange quirks of the language

```javascript
console.log("2" > 1); // true (string '2' coerced to number 2)
console.log("02" == 2); // true (loose equality)
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN === NaN); // false (special case)
console.log(Object.is(NaN, NaN)); // true (safer equality check)
```

:::

## Logical operators

The usual logical operators _and_, _or_ and _not_ exist in JavaScript. These can be used to combine or invert conditions.

| Operator | Name        | Example           | Result  |
| -------- | ----------- | ----------------- | ------- |
| `&&`     | Logical AND | `true && false`   | `false` |
| `\|\|`   | Logical OR  | `true \|\| false` | `true`  |
| `!`      | Logical NOT | `!true`           | `false` |

::: info Result of logical operators
The result of `!condition` is always `true` if the original condition was `false` and `false`, if the original condition was `true`.

The result of `a && b` is only `true` if both _a_ and _b_ conditions are `true`, otherwise it is `false`.

The result of `a || b` is `false` only if both conditions are `false`. If any of the conditions was `true`, the combined expression evaluates to `true`
:::

|    A    |    B    |  Not A  | A and B | A or B  |
| :-----: | :-----: | :-----: | :-----: | :-----: |
| `true`  | `true`  | `false` | `true`  | `true`  |
| `true`  | `false` | `false` | `false` | `true`  |
| `false` | `true`  | `true`  | `false` | `true`  |
| `false` | `false` | `true`  | `false` | `false` |
