---
prev:
  text: "Introduction to Protocols"
  link: "./"
next:
  text: "DNS & IP"
  link: "./dns"
---

# HTTP

Modern applications need to communicate and share information between devices on the internet. For this they need a common language: a set of rules that govern their communication. The most popular _protocol_ for web communication is _HTTP_, which stands for _Hypertext Transfer Protocol_

The core of the HTTP protocol is a simple request-response system. HTTP is particularly great for websites and web applications. Each time a browser visits a website, it makes a request to that website's server. The server responds with all the content, and styling information that the browser needs to render the website.

## Clients and Servers

The _client_ computer is sending a _request_ to another computer. A client can be any type of device, but it is usually a device that the users interact with. It can be a desktop computer, a laptop, a mobile phone, or a tablet. In a web application, we also call the user's device the _front end_.

The other computer, called _server_ sends back a _response_ with the requested information. Most websites use a server to store, and manipulate data, that is used by the web page or application. This way the data can be persistent and last longer than a single session. The server is _listening_ for incoming requests constantly, so that it can respond to them. In web development we call servers the _back end_. Like clients, these are just computers, but typically computers designed to be up and running constantly are used to act as servers.

A computer can act as a client, a server, both, or neither.

### Sending requests & reading responses

The most common HTTP request is GET

::: tabs

== GO

In Go the `net/http` package can be used. We can send a `GET` request using the `Get` method, and passing in a string. The method returns a response and an error. We can handle the error, and if it `nil` we can use the `io` package's `ReadAll` method on the response's `Body` to convert it to a string. There are also other ways to process the response, which is typically in [JSON](./data#json).
The `Body` must be closed at the end of the function execution. It is often written as a deferred command.

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

== JavaScript/TypeScript

In JavaScript (and TypeScript) the `fetch` API can be used to make HTTP requests. In the browser the `fetch()` function is available to us. The function takes a [URL](./uri) as its first parameter, and a `settings` object as the second parameter. By default `fetch` will send a `GET` request. The response, which is typically in [JSON](./data#json) can be parsed using the `.json()` method. These are asynchronous functions, therefore `.then()` with a callback function that receives the resolved Promise, or `await` should be used to wait until the Promises are resolved.

Http requests can run into errors (e.g. if a server is down), so you should handle potential errors in your code, e.g. with `try/catch` blocks. If you use the `.then` syntax for handling promises, `.catch()` can be used with a callback function to handle potential errors.

```javascript
async function getProjects() {
    try {
        const response = await fetch("https://api.jello.com/projects")
        const responseData = await response.json();
        return responseData.projects;
    } catch (err) {
        console.log(`Error fetching data: ${err.message}`);
    }
```

:::

::: info URLs

The _URL_ (Uniform Resource Locator) is the address of another computer. It consists of several parts: the `http://` at the beginning specifies the protocol used for communication. Other protocols use URLs as well.

:::

### HTTP Headers

An _HTTP header_ allows to pass additional information with the request or response. Headers are _case-insesitive_ key-value pairs that store metadata: e.g. type of client, operaring system, preferred language, API keys for authentication, content type, etc.

::: tip DevTools

The browser's Developer Tools can be used the examine the requests and responses, including the headers.

:::

::: tabs

== Go

In Go you can use the tools provided by the `net/http` package, to work with the headers. Both the `http.Request` and `http.Response` types have a `Header` field, which is of type `Header`. This has useful methods to work with the headers.

- `Add(key, value string)` will add the key-value pair to the header: if the key already exists, it _appends_ the value
- `Set(key, value string)` will set the field associated with key in the header to value: if the key already exists, it _replaces_ the current value
- `Del(key string)` will delete a key-value pair from the header
- `Get(key string)` will return the value associated with key

```go
// creating a new request
req, err := http.NewRequest("GET", "https://api.example.com/users", nil)
if err != nil {
    fmt.Println("error creating request: ", err)
    return
}

// setting a header on the new request
req.Header.Set("x-api-key", "123456789")

// making the request
client := http.Client{} // or &http.Client{}
res, err := client.Do(req)
if err != nil {
    fmt.Println("error making request: ", err)
    return
}
defer res.Body.Close()

// reading a header from the response
header := res.Header.Get("last-modified")
fmt.Println("last modified: ", header)

// deleting a header from the response
res.Header.Del("last-modified")
```

== JS/TS

In JavaScript/TypeScript you can set the headers of a request by passing in an options object to `fetch`. This can have a `headers` option, which is another object, with string keys corresponding to the header we want to set and string values we want to set fot the particular headers.

Similarly responses have a `header` property that contains the headers as key-value pairs of an object.

```javascript
const requestUsers = async function () {
  try {
    const res = await fetch("https://api.example.com/users", {
      method: "GET",
      headers: {
        "X-Api-Key": "123456789",
      },
    });
    const data = await res.json();
    console.log(res.headers["last-modified"]);
  } catch (err) {
    console.log(`Error fetching users: ${err.message}`);
  }
};
```

:::
