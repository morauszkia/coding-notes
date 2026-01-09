# HTTP Servers

A server is a computer that serves data over a network, usually the internet. Servers run software that listens for incoming requests from clients, and responds to these with the requested data. Servers are running forever, waiting for and responding to incoming requests.

Servers need to be able to handle many requests at the same time. For this servers need to use concurrency or asynchronous functions so that the execution of the server's program isn't blocked by an incoming request.

::: info

The page's content is organized into tabs by language. Please choose your programming language below!

:::

## Handling Requests

Servers need to be able to handle many incoming requests. Some servers can use multiple CPU cores, while JavaScript servers use only a single core, but process requests in a non-blocking way. All languages have their advantages and disadvantages when used to power http servers.

::: tabs

== Go

In Go, [goroutines](/go/concurrency) are used to serve many requests at the same time. Go was built by Google specifically to power their web infrastructure. Goroutines are lighter weight than operating system threads, but take advantage of multiple cores. Go generally outperform JavaScript and TypeScript servers in CPU-intensive work. Go performs quite well on I/O bound tasks as well.

The `net/http` package has a `Server` struct. It has two fields: a handler and an `Addr` address.

The `Handler` is any defined type that implements the Handler interface. A `ServeMux` can be created using `http.NewServeMux` and used as `Handler`. You can register route handler functions with the `ServeMux`'s `.Handle()` or `.HandleFunc()` methods.

```go
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

You can start the server with its `.ListenAndServe()` method.

```go
package main

import (
    "log"
    "net/http"
)

func main() {
    port := "8080"
    mux := http.NewServeMux()

    // register handlers

    server := &http.Server{
        Addr:   ":" + port,
        Handler: mux,
    }

    log.Printf("Server listening on port %s\n", port)
    log.Fatal(server.ListenAndServe())
}
```

== JS/TS

JavaScript and its superset TypeScript are single-threaded. Therefore, a Node.js server will use one CPU core at a time. Multiple incoming requests are handled using the async event loop. Whenever a request waits on I/O, the server puts it on pause and works on something different. Node servers do fine with I/O workloads that are associated with most CRUD apps. If the processing is offloaded to a database, it is ok, but it is not designed for CPU-intensive work.

== Python

:::

## File Servers

File servers are simple servers that serve static files, like web pages, stylesheets, images. If a GET request is sent to a specific URL, they serve the static file that corresponds to that URL on the server's file system. The URLs mirror the file system.

The only exception is that if a request is sent to a URL corresponding to a directory, the `index.html` file of that directory will be served by default.

::: tabs

== Go

In Go you can use `http.FileServer()`, which returns a handler to handle incoming requests, and serve files for a specific URL, typically `"/"`. This handler can be registered for a route using the ServeMux's `.Handle()` method. You can pass in `http.Dir()` with a directory as argument to serve files from that directory.

```go
mux := http.NewServeMux()
// [!code highlight]
mux.Handle("/", http.FileServer(http.Dir(".")))
```

:::

## Route Handlers

Requests can be sent to various routes, that you need to handle in your server code.

::: tabs

== Go

In Go you can use the `.HandleFunc()` method on a `ServeMux` to register functions to handle specific routes. A simple handler is of the type `HandlerFunc` with the following signature:

```go
type HandlerFunc func(ResponseWriter, *Request)
```

This signature is the same as the `Handler`'s `ServeHTTP` signature.
In its body it has to the `*Request`, which contains the headers, body, method, path, etc. Also, it has access to a `ResponseWriter` as an argument. Instead of returning the request as a value, the function writes to the response using this `ResponseWriter`.

```go
func main() {
    // ...

    mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "text/plain; charset=utf-8")
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })

    // ...
}
```

:::