# Structured Data

## JSON

_JSON_ (JavaScript Object Notation) is a standard for representing structured data, which is based on JavaScript objects. It is in fact a stringified JavaScript object. It is commonly used to transmit data via HTTP not only in JavaScript. It is supported by every major programming language.

JSON is used for

- request and response bodies
- for configuration files
- in NoSQL databases (e.g. MongoDB, Firestore)

JSON supports

- strings
- numbers
- booleans
- null
- arrays
- object literals

The keys are always strings, and the values can be any data type of the above.

::: details JSON example

```json
{
  "countries": [
    {
      "country": "Hungary",
      "capital": "Budapest",
      "region": "Europe",
      "population": 9700000,
      "area_km2": 93030,
      "major_cities": ["Budapest", "Debrecen", "Szeged", "Miskolc", "Pécs"],
      "visited": false
    },
    {
      "country": "Germany",
      "capital": "Berlin",
      "region": "Europe",
      "population": 84000000,
      "area_km2": 357588,
      "major_cities": ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
      "visited": true
    }
  ]
}
```

:::

### Parsing JSON data

While JSON data can be treated as a string, it is typically parsed or decoded.

::: tabs

== Go

In Go the `encoding/json` package provides tools to encode and decode JSON files into structs. For this we need to know the JSON fields and their types. Struct fields must be exported (capitalized) to decode JSON.

You can use _Struct tags_ that the `encoding/json` package will examine and use in the encoded `.json` file as field names.

If the structure of the JSON data is unknown, a `map[string]interface{}` can be used as type for the parsed data.

For the decoding we create an empty slice and then use the `&` "address of" operator to mutate it with a `Decoder`. We create a JSON `Decoder` with the `NewDecoder` method and pass in the response's `Body`.

```go
package main

import (
    "fmt"
    "net/http"
    "encoding/json"
)

type Issue struct {
    Title    string `json:"title"`
    Estimate int    `json:"estimate"`
}

func getIssues(url string) ([]Issue, error) {
    res, err := http.Get(url)
    if err != nil {
        return nil, fmt.Errorf("error creating request: %w", err)
    }
    defer res.Body.Close()

    // [!code highlight]
    var issues []Issue
    // [!code highlight]
    // var issues []map[string]interface{}
    // [!code highlight]
    decoder := json.NewDecoder(res.Body)
    // [!code highlight]
    if err := decoder.Decode(&issues); err != nil {
        return nil, fmt.Errorf("error decoding response body")
    }

    return issues, nil
}
```

You can also use `Unmarshal` for smaller JSON files, that you already converted to `[]byte` with `io.ReadAll`

```go
package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
)

func getIssues(url string) ([]Issue, error) {
    res, err := http.Get(url)
    if err != nil {
    return nil, fmt.Errorf("error creating request: %w", err)
    }
    defer res.Body.Close()

    data, err := io.ReadAll(res.Body)
    if err != nil {
    return nil, err
    }

    var issues []Issue
    // [!code highlight]
    if err := json.Unmarshal(data, &issues); err != nil {
    return nil, err
    }
    return issues, nil
}
```

== JavaScript/TypeScript

In JavaScript or TypeScript you can use the response's `.json()` method to parse the response into a JavaScript object.

In TypeScript a parsed JSON resolves to type `any` because the compiler has no way to know the type of data being requested. You can explicitly set the return type of the function, or use [type assertion](/ts/type-assertion) to tell the compiler what type you expect to get if everything goes according to plan.

```typescript
async function getUsers() {
  try {
    const response = await fetch("https://api.jello.com/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const responseData = (await response.json()) as User[];
    return responseData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error fetching data: ${err.message}`);
    } else {
      console.log(`Unknown error: ${err}`);
    }
  }
}
```

or

```typescript
async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch("https://api.jello.com/users", {
      method: "GET",
      mode: "cors",
      headers: {
        "X-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    if (err instanceof Error) {
      console.log(`Error fetching data: ${err.message}`);
    } else {
      console.log(`Unknown error: ${err}`);
    }
  }
}
```

You can also use the `JSON.parse()` method to parse a JSON string into a JavaScript value/object.

```javascript
const user = JSON.parse(userString);
```

:::

### Converting to JSON

Data is converted, stringified to JSON.

::: tabs

== Go

In Go the `encoding/json` package's `Marshal` method is used to convert a struct to a JSON string.

```go
package main

import (
    "encoding/json"
)

func marshalAll[T any](items []T) ([][]byte, error) {
    var result [][]byte
    for _, item := range items {
        // [!code highlight]
        data, err := json.Marshal(item)
        if err != nil {
            return nil, err
        }
        result = append(result, data)
    }
    return result, nil
}
```

== JavaScript/TypeScript

In JavaScript/TypeScript the `JSON.stringify()` static method can convert a JavaScript value (e.g. an object) to a JSON string.

```javascript
import { getHeaders } from "./util.js";

async function updateUser(id, userData) {
  const path = `api.example.com/users/${id}`;
  const res = await fetch(path, {
    method: "PUT",
    mode: "cors",
    headers: getHeaders(),
    // [!code highlight]
    body: JSON.stringify(userData),
  });
  return res.json();
}
```

:::

## XML

XML is another file type used to store data. It is similar to HTML: it uses tags, but its tags are not predefined. XML can serve similar purposes as JSON. Nowadays, JSON is used more often, because it is smaller, easier to read, and is supported by all major programming languages.

```xml
<root>
  <id>1</id>
  <genre>Action</genre>
  <title>Iron Man</title>
  <director>Jon Favreau</director>
</root>
```
