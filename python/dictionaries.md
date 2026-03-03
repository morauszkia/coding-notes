---
prev:
  text: "Functions"
  link: "./functions"
---

# Dictionaries

Dictionaries are data structures that store data in key-value pairs. You can access the values using the keys, which is extremely fast. Dictionaries typically store data that is closely related.

The **keys** must be unique, and can be of any immutable type. Most often we use string keys, but numbers of Booleans can be used as well.
THe **values** can be of any type: strings, numbers, Booleans, lists, tuples or nested dictionaries.

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

You can access the values in the dictionary either by using the square brackets and providing a key, or using the `.get()` method. However, the former will raise a `KeyError` if you provide a key that doesn't exist in the dictionary. The latter will return `None` instead. To return some other _fallback_ value, you can provide a second argument.

```python
print(pizza["name"])  # Margherita
# [!code error]
print(pizza["names"]) # KeyError

print(pizza.get("price")) # 9.99
print(pizza.get("cost")) # None
print(pizza.get("cost", "unknown")) # unknown
print(pizza.get("toppings", []))  # ['pizza sauce', 'mozzarella', 'basil']
```

You can add or modify values in your dictionary the following way. If you provide a new key, the key-value pair will be added to the dictionary. If you use an existing key, the former value will be overwritten. You can use `.update()` to update the key-value pairs of the dictionary with the key-value pairs of the dictionary that you pass in as argument. Keys that were not present in the original dictionary will be added, while keys already present will be overwritten.

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

You can delete entries from the dictionary using `.pop()`, which if you provide a key returns the value for the given key and deletes it from the dictionary. The method `.popitem()` will remove the item that was inserted the last. You can empty the dictionary using the `.clear()` method.

## Loop over Dictionaries

You can use the `in` keyword directly with the dictionary or the methods `.keys()`, `.values()` or `.items()` to loop over dictionaries. These return view objects that allow you to see the keys, values and key-value pairs present in the dictionary.
