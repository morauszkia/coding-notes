# HTTP

Modern applications need to communicate and share information between devices on the internet. For this they need a common language: a set of rules that govern their communication. The most popular _protocol_ for web communication is _HTTP_, which stands for _Hypertext Transfer Protocol_

The core of the HTTP protocol is a simple request-response system. HTTP is particularly great for websites and web applications. Each time a browser visits a website, it makes a request to that website's server. The server responds with all the content, and styling information that the browser needs to render the website.

## Clients and Servers

The _client_ computer is sending a _request_ to another computer. A client can be any type of device, but it is usually a device that the users interact with. It can be a desktop computer, a laptop, a mobile phone, or a tablet. In a web application, we also call the user's device the _front end_.

The other computer, called _server_ sends back a _response_ with the requested information. Most websites use a server to store, and manipulate data, that is used by the web page or application. This way the data can be persistent and last longer than a single session. The server is _listening_ for incoming requests constantly, so that it can respond to them. In web development we call servers the _back end_. Like clients, these are just computers, but typically computers designed to be up and running constantly are used to act as servers.

A computer can act as a client, a server, both, or neither.

### Sending a request

The most common HTTP request is GET

::: tabs

== GO

In Go the `net/http` package can be used. We can send a `GET` request using the `Get` method, and passing in a string. The method returns a response and an error. We can handle the error, and if it `nil` we can use the `io` package's `ReadAll` method on the response's `Body`.

::: warning Close the Body

The `Body` must be closed at the end of the function execution. It is often written as a deferred command.

:::

```go
import (
    "fmt"
    "io"
    "net/http" // [!code highlight]
)

func getProjects() ([]byte, error) {
    // [!code highlight]
    res, err := http.Get("https://api.jello.com/projects")
    if err != nil {
        return nil, fmt.Errorf("error making request: %w", err)
    }
    // [!code highlight]
    defer res.Body.Close()

    // [!code highlight]
    data, err := io.ReadAll(res.Body)
    if err != nil {
        return nil, fmt.Errorf("error reading response: %w", err)
    }
    return data, nil
}
```

:::

::: info URLs

The _URL_ (Uniform Resource Locator) is the address of another computer. It consists of several parts: the `http://` at the beginning specifies the protocol used for communication. Other protocols use URLs as well.

:::

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
        data, err := json.Marshal(item)
        if err != nil {
            return nil, err
        }
        result = append(result, data)
    }
    return result, nil
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
