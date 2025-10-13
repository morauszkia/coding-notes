---
prev:
  text: "Arrays & Slices"
  link: "./arrays"
next:
    text: "Pointers"
    link: "./pointers"
---

# Maps

Maps are data structures based on key-value pairs. They are similar to JavaScript's objects or Python dictionaries.

The zero value of a map is `nil`.

A map can be created using a literal or the `make` function.

```go
mountains = map[string]int{
    "Mount Everest": 8848,
    "Kilimanjaro": 5895,
    "Mount Blanc", 4806,
}

rivers = make(map[string]int)
rivers["Nile"] = 6650
rivers["Amazon"] = 6400
rivers["Danube"] = 2888
```

::: warning Changing the original

If you pass a map to the function and mutate the map inside, the original map will be affected. This is because you pass the reference to the memory location to the function, and not a copy of the map.

:::

## Manipulating Maps

You can use bracket notation to insert, overwrite or access an element from the map.
You can also check if an item is present in the map.
You can delete an element with the `delete` function.

```go
rivers["Volga"] = 3530
kilimanjaroHeight := mountains["Kilimanjaro"]

length, ok := rivers["Rhine"] // 0, false
length, ok := rivers["Danube"] // 2888, true

delete(rivers, "Volga")
```

The `len()` function returns the number of key-value pairs in the map.

```go
len(rivers) // 3
```

## Map Keys

Any comparable type can be used as the key for a map. This means, that besides numbers, strings, booleans, also _pointers_, _interfaces_, _structs_ or _arrays_ can be used. _Slices_, _maps_ and _functions_ **can not** be used.

::: tip Usefulness of Complex Keys

Having more complex keys in a map can become handy, to avoid having to use nested maps.

:::

::: details Example

If we for example want to tally web page hits by country. One way would be to use a map, where the path (string) would be used to access another map, where the country code (string) would be used to access the number of visits. However, this would make inserting new data complicated, because you would have to check for the existence of each inner map, and create it, if there isn't one.

Instead, you yould use a struct key, where the path and the country code together in a struct would be used to access the number of visits.

```go
type Key struct {
    Path, Country string
}
hits := make(map[Key]int)
```

This way it would be easy to check, how many Swiss visited the home page

```go
n := hits[Key{"/", "ch"}]
```

:::

### Nested maps

This said, maps _can_ be nested inside other maps. Their type can be written as follows:

```go
map[string]map[string]int
map[rune]map[string]int
map[int]map[string]map[string]int
```

This might make working with your maps a bit more complicated, as you might need to check for the presence of keys in nested if-checks, but there may be situations in which nested maps are the most appropriate data structure.

::: details Example

```go
package main

func getNameCounts(names []string) map[rune]map[string]int {
    nameCounts := make(map[rune]map[string]int) // [!code highlight]
    for _, name := range names {
        runes := []rune(name)
        firstLetter := runes[0]

        if _, ok := nameCounts[firstLetter]; !ok {  // [!code highlight]
            nameCounts[firstLetter] = make(map[string]int)
        }
        nameCounts[firstLetter][name]++ // [!code highlight]
    }
    return nameCounts
}
```

:::

## Sets using Maps

You can create a set-like structure using maps. You could add the intended values of the set as keys, and assign to them boolean values to indicate if they are present or not. Or even more effective would be to assign empty structs to the keys you want to be present in the set, and check for the presence of the key to determine, if something is already in the set.

```go
attended := map[string]struct{}{
    "Ann": {},
    "Joe": {},
    ...
}

if _, ok := attended[person]; ok {
    fmt.Println(person, "was at the meeting")
}
```

You can use `delete()` to remove keys from the map.
