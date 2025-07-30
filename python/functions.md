---
prev:
  text: "Loops"
  link: "./loops"
---

# Functions

Functions are reusable pieces of code, that can be rerun multiple times, with various parameters. This way we can avoid repeating ourselves, and if we want to change our code, we only have to do it in one place.

In Python, functions are declared using the `def` keyword. After this we write the function name, and the arguments in parentheses. Then after a colon the body of the funciton comes into an indented block.

```python
def function_name(arg1, arg2):
  # do something
```

::: info
According to the PEP8 style guide 2 lines are left blank before and after a function declaration.
:::

## Calling a function

Functions are called by writing the function name with the necessary [argument](#arguments) values in parentheses. If the function needs no arguments, an empty set of parentheses is used.

::: warning
If you do not provide the necessary number of arguments, the program will raise an Exception and crash.

```python
def multiply(x, y):
  return x * y

print(multiply(7)) # Error: we didn't provide the necessary arguments
```

:::

If a function has a [return](#return-values) value, we can store it in a variable, print it or pass it to another function, etc. Functions, that perform something can be called in themselves (similarly to the built-in `print()` function).

```python
eight = add(5, 3)
say_hello_world()
print(subtract(10, 3))
```

Functions can be called on the top level of a file, or within other functions or code blocks.

## Arguments

Functions can have zero or more arguments. These make it possible, to rerun the function each time with different values passed in.

Functions can have zero or one return value: this is the value, that we get if we run the function. It can be stored in a variable, used in another function, printed to the console, etc. Functions with zero return values typically perform some side effect: print to the console, mutate some variable value in place, access a database, etc.

### Default arguments

Some arguments have reasonable defaults. These can be specified in the definition of the function. If we want to run a function with the default values, we do not pass values to these arguments. A function can have zero or more default arguments.

Default arguments must come after required arguments. Another option is to use keyword arguments when calling the function, that is explicitly say, to which argument we want to pass the value.

Arguments are passed in order. If we want to skip a default argument, but want to pass a value to the next default argument, we need to tell Python, to which argument we are passing the value.

```python
def greet(name, greeting="Hello, "):
  print(greeting + name)


greet("Thomas") # Hello, Thomas
greet("Mr. Dursley", "Good morning, ") # Good morning, Mr. Dursley

def student(firstname, lastname ='Mark', standard ='Fifth'):
     print(firstname, lastname, 'studies in', standard, 'Standard')

# 1 positional argument
student('John')  # John Mark studies in Fifth Standard

# 3 positional arguments
student('John', 'Gates', 'Seventh') # John Gates studies in Seventh Standard

# 2 positional arguments
student('John', 'Gates') # John Gates studies in Fifth Standard
student('John', 'Seventh') # John Seventh studies in Fifth Standard

student('John', standard='Seventh') # John Mark studies in Seventh Standard
```

### Passing arguments

In Python arguments can be passed to a function as _positional arguments_ or _keyword arguments_.

_Positional arguments_ get passed to the function in the order as they are specified. The first value is passed to the first argument, the second value to the second argument, etc.

_Keyword arguments_ are passed to the argument with the corresponding name. We use keyword arguments, if we do not want to keep all the defaults, but we want to keep some. If we use keyword arguments, we need not worry about the order of the arguments, we can pass them in any order.

```python
def get_full_name(first_name="John", last_name="Doe"):
  return first_name + ' ' + last_name

john_doe = get_full_name()
jane_doe = get_full_name("Jane")
john_smith = get_full_name(last_name="Smith")
peter_parker = get_full_name(last_name="Parker", first_name="Peter")
```

### \*args

In some cases we do not know in advance, how many arguments we want to pass in. In this case we can use the `*arg` syntax. The values passed in will be packed in a _tuple_, which we can iterate over to access the individual values. These are also called _var-positional_ arguments.

```python
def sum_numbers(*numbers: float) -> float:
    """Sum the numbers given as argument."""
    result = 0
    for num in numbers:
        result += num

    return result
```

::: info
Only keyword arguments can follow \*args in a function declaration. We can also use _\*kwargs_ (variable number of keyword arguments). These will be packed into a dictionary.

```python
def func_name(p1, p2, *args, k, **kwargs):
    print("positional-or-keyword:...{}, {}".format(p1, p2))
    print("var-positional (*args):..{}".format(args))
    print("keyword:.................{}".format(k))
    print("var-keyword:.............{}".format(kwargs))


func(1, 2, 3, 4, 5, k=6, key1=7, key2=8)
```

:::

## Return values

Functions can return their results as values, which can be stored in a variable, printed to the standard output, used in another function, etc. We use the `return` keyword to return a value from a function, to make it accessible outside the function.

```python
def multiply(x, y):
  return x * y
```

::: info return None
Functions, that do not return anything explicity, have a return value of `None`.
:::

### Multiple returns

A function declaration may contain multiple `return` statements. However, the execution of the function body stops after returning the first value. This can be used to _early return_ from a function under certain conditions. Additionally, the returned value may vary based on some conditional logic, and instead of updating the value of a variable within the function scope, we can directly return the value. We can omit `else` in this case, as the execution will stop as soon as a condition is true and the appropriate value is returned.

```python
def get_price("product"):
  if product == "book":
    return 12.99
  if product == "ferrari":
    return 400000
  if product == "clean air":
    return 0
```

## Function scope

The arguments and all variables declared within functions can be accessed within the function body, they are _function scoped_. If a variable within the scope of a function has the same name as another variable outside the function scope, the variable will have the value declared within the scope of the function inside the function and the other outside of the function. This way, clashing of variable names is avoided

```python
greeting = "Hello!"

def say_goodbye():
  greeting = "Goodbye!"
  print(greeting)   # Goodbye!

print(greeting)  # Hello!
```

::: info global
Variables declared within functions can be made accessible in the global scope using the `global` keyword
:::
