---
prev:
  text: "Functions"
  link: "./functions"
next:
  text: "Sets"
  link: "./sets"
---

# Dictionaries

Dictionaries are data structures that store data in key-value pairs. You can access the values using the keys, which is extremely fast. Dictionaries typically store data that is closely related.

The **keys** must be unique, and must be hashable (which generally means immutable types such as `str`, `int`, `tuple`). Most often we use string keys, but numbers or Booleans can be used as well.
The **values** can be of any type: strings, numbers, Booleans, lists, tuples or nested dictionaries.
The **keys** must be unique, and must be hashable (which generally means immutable types such as `str`, `int`, `tuple`). Most often we use string keys, but numbers or Booleans can be used as well.
The **values** can be of any type: strings, numbers, Booleans, lists, tuples or nested dictionaries.

You can create a dictionary with the following syntax:

```python
pizza = {
  "name": "Margherita",
  "size": 32,
  "price": 9.99,
  "toppings": ["pizza sauce", "mozzarella", "basil"]
}

another_pizza = dict([("name", "Prosciutto"), ("size", 22), ("price", 7.89), ("toppings", ["pizza sauce", "ham", "mozzarella"])])
```

## Accessing Values

You can access the values in the dictionary either by using square brackets and providing a key, or using the `.get()` method. However, the former will raise a `KeyError` if you provide a key that doesn't exist in the dictionary. The latter will return `None` instead. To return some other _fallback_ value, you can provide a second argument.

::: tip Check if key present

You can use `in` to check if a key is present in the dictionary.

:::

```python
print(pizza["name"])  # Margherita
# [!code error]
print(pizza["names"]) # KeyError

print(pizza.get("price")) # 9.99
print(pizza.get("cost")) # None
print(pizza.get("cost", "unknown")) # unknown
print(pizza.get("toppings", []))  # ['pizza sauce', 'mozzarella', 'basil']
```

## Adding & Modifying Values

You can add or modify values in your dictionary the following way. If you provide a new key, the key-value pair will be added to the dictionary. If you use an existing key, the former value will be overwritten. Since Python 3.7 dictionaries preserve insertion order.

You can use `.update()` to update the key-value pairs of the dictionary with the key-value pairs of the dictionary that you pass in as argument. Keys that were not present in the original dictionary will be added, while keys already present will be overwritten.

::: info Other types of `.update()` argument

The `.update()` method can also accept a list of key-value tuples as argument. For example such as is returned by enumerate or some list comprehension.

:::

```python
employees = {}
employees["id-01"] = "John Doe" # new key
employees["id-02"] = "Scrooge McDuck" # new key
employees["id-01"] = "Clark Kent"  # overwrites John Doe

more_employees = {
  "id-03": "Jane Doe",  # will be added
  "id-02": "Bilbo Baggins"  # will overwrite "Scrooge McDuck"
}

employees.update(more_employees)
```

::: tip d | other

You can create a new merged dictionary or update the dictionary with the keys of another dictionary using the `|` operator as well.

```python
detailed_pizza = pizza | {
  "preparation_time": 10,
  "rating": 4.8
}

pizza |= {
  "preparation_time": 10,
  "rating": 4.8
}

```

:::

You can use the `.setdefault()` if you want to check if key is present in the dictionary and return its value in a single step or return a default value and insert it with the provided key. This method returns the value for a specified key if the key exists in the dictionary or returns a default value, if it doesn't.

```python
# instead of
def add_item(data: dict, item: str, amount: int) -> None:
  if item in data:
    data[item] += amount
  else:
    data[item] = amount

def add_item(data: dict, item: str, amount: int) -> None:
  data[item] = data.setdefault(item, 0) + amount
```

::: tip `.get()` Vs. `.setdefault()`

The `.get()` and `.setdefault()` methods might look similar, as they both either return the value for a given key, or a default value. The difference is, that `.setdefault()` goes further, and inserts the key with the default value, if it didn't exist in the dictionary.

:::

## Deleting Values

You can delete entries from the dictionary using `del dict[key]`. If you try to delete a key that doesn't exist, the program raises a `KeyError`. You can also use the `.pop()` method to delete a key from the dictionary _and_ return its value. This crashes if you provide a nonexisting key as well, but can accept a second argument, which is a default value that should be returned if the key isn't found. The method `.popitem()` will return and remove the key-value pair that was inserted the last. You can empty the dictionary using the `.clear()` method.

```python
pizzas = {
  "margherita": {
    "name": "Margherita",
    "size": 32,
    "price": 8.99,
    "toppings": ["pizza sauce", "mozzarella", "basil"]
  },
  "prosciutto": {
    "name": "Prosciutto",
    "size": 32,
    "price": 10.19,
    "toppings": ["pizza sauce", "ham", "mozzarella"]
  }
}

del pizzas["prosciutto"]
# [!code error]
del pizzas["funghi"]  # KeyError
# [!code error]
funghi = pizzas.pop("funghi") # KeyError

funghi = pizzas.pop("funghi", "pizza not found")  # pizza not found
pizza = pizzas.pop("margherita") # Entry for margherita will be returned
print(pizza["name"]) # Margherita

print(pizzas) # {}
```

## Loop over Dictionaries

You can use the `in` keyword directly with the dictionary or the methods `.keys()`, `.values()` or `.items()` to loop over dictionaries. These return view objects that allow you to see the keys, values and key-value pairs present in the dictionary. If you also need to keep track of the index of the key/value, you can use `enumerate()`.

```python
# Loop over keys
for key in my_dict:
  print(key)

# This does the same
for key in my_dict.keys():
  print(key)

# Loop over values
for v in my_dict.values():
  print(v)

# Loop over key-value pairs
for k, v in my_dict.items():
  print(f"{k}: {v}")

for idx, key in enumerate(my_dict.keys()):
  print(f"{idx}: {key}")
```

::: info View Objects

View objects provide a dynamic view of the dictionaries keys, values or key-value pairs. If the underlying dictionary changes, the views will reflect this.

:::

## Further methods and functions

You can use the `len()` function to return the number of keys in a dictionary.

You can create an initial dictionary from an iterable you can use `dict.fromkeys()`, which takes the values of your iterable and creates a dictionary with the values as keys. You can pass in an initial value, which defaults to `None`. You can use `list()` to create a list of all the keys in the dictionary.

```python
ingredients = ['cheese', 'eggs', 'chicken', 'ham', 'pasta']
pantry = dict.fromkeys(ingredients, 0)
```

::: warning Mutable default value

Don't use a mutable value as default. If you do that, all the keys will point to the same underlying object, and not separate objects (e.g., lists)

:::

You can create a _shallow_ copy of a dictionary using the `.copy()` method. Dictionaries are mutable, so variables that point to the same dictionary will be aware of all the changes made to the underlying dictionary. All mutable objects will still point to the same underlying object in the copied dictionary as well. For example, if your dictionary contained a list, all copies will reference the same underlying object.

::: info Deep Copy

You need a deep copy if you want to create copies (i.e. new objects) of the nested objects as well.

You can use the `copy` package and the `.deepcopy()` method to create a deep copy of an object.

```python
import copy

new_obj = copy.deepcopy(original_obj)

```
