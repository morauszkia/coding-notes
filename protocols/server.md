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

Requests can be sent to various routes, that you need to handle in your server code. Furthermore requests can use various [methods](./http#request-methods), and these can be handled separately.

::: tabs

== Go

In Go you can use the `.HandleFunc()` method on a `ServeMux` to register functions to handle specific routes. A simple handler is of the type `HandlerFunc` with the following signature:

```go
type HandlerFunc func(ResponseWriter, *Request)
```

This signature is the same as the `Handler`'s `ServeHTTP` signature.
In its body it has access to the `*Request`, which contains the headers, body, method, path, etc. Also, it has access to a `ResponseWriter` as an argument. Instead of returning the request as a value, the function writes to the response using this `ResponseWriter`.

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

As of Go 1.22 handler functions can be registered for specific method and route combinations. Go also has powerful routing libraries like [Gorilla Mux](https://github.com/gorilla/mux) and [Chi](https://github.com/go-chi/chi) beside the standard library's solutions.

Adding the `GET` method before the path limits the handler function to only the cases when the specified method was used for that endpoint.

```go
//...
    mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
        // ...
    }
//...
```

Go's `ServeMux` router uses the provided patterns to dispatch requests to appropriate handler functions. These patterns have the structure `[METHOD][HOST]/[PATH]`. All three parts are optional.

- fixed URL path patterns: `/about`
- subtree paths (end with `/`): `/blog/` - this is useful to serve a directory of static files or structuring application

If more than one pattern matches a request path, the **longest** match is chosen. As a result, more specific handlers will override more general ones.

The HOST part of the pattern lets you serve different content based on the Host header of the request.

:::

## Middleware

Middleware is a way to wrap a handler with additional functionality. It is a common pattern in web applications that allows us to write DRY code. For example a common middleware is one that logs all requests without writing the logging logic in every route handler.

::: tabs

== Go

In Go we can write a middleware function and wrap the function with it in the route handler. The middleware function receives the handler as its parameter, and returns a new HandlerFunction that performs all the necessary actions, and then calls the passed in handlers `.ServeHTTP` method with the forwarded `ResponseWriter` and `Request`.

```go
func middlewareLog(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s", r.Method, r.URL.Path)
        next.ServeHTTP(w, r)
    })
}

// ...

mux.Handle("/app/", middlewareLog(handler))
```

:::

### Stateful middleware

Often we want our application to have a state, and the middleware to be aware of that state, and access it. For example, we want to keep track of how many requests came in to a specific route.

::: tabs

== Go

In Go we can create an apiConfig `struct` with the state variables on it, and create the handler functions as methods on this struct. Then we can create an instance of this struct in the main function and register the methods as route handlers.

```go
// ...

type apiConfig struct {
    fileserverHits atomic.Int32
}

func (cfg *apiConfig) middlewareMetricsInc(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        cfg.fileserverHits.Add(1)
        next.ServeHTTP(w, r)
    })
}

func (cfg *apiConfig) reset(w http.ResponseWriter, r *http.Request) {
    cfg.fileserverHits.Store(0)
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Metrics reset \n"))
}

func (cfg *apiConfig) getHits(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "text/plain; charset=utf-8")
    w.WriteHeader(http.StatusOK)
    metrics := fmt.Sprintf("Hits: %d\n", cfg.fileserverHits.Load())
    w.Write([]byte(metrics))
}

func main() {
    // ...
    apiCfg := &apiConfig{
        fileserverHits: atomic.Int32{},
    }
    // ...
    mux.HandleFunc("GET /api/metrics", apiCfg.getHits)
    mux.HandleFunc("POST /api/reset", apiCfg.reset)
    // ...
}


```

:::

## Monoliths and Decoupled Architectures

Web applications can either be _monoliths_ and contain both the back end and the front end code and functionality, or these can be separated into different codebases (_decoupled_).

Monoliths are simpler to get started with. They may contain a REST API for hosting the raw data (e.g. in JSON format) from a subpath, such as `/api/` or data can be injected into the HTML and the complete pages are served. The advantage of a separate data endpoint is, that they can be consumed by any client. On the other hand, injection is more performant and therefore result in better UX, and better SEO. In the case of monoliths the deployment of new versions as easier because the front end and the back end are always in sync.

The decoupled architectures are easier and cheaper to scale as traffic grows. The separation of concerns is easier, too. In the decoupled case the the front end and the back end can be served from the same domain, or from different domains or subdomains. If hosted on different servers, decoupled architectures can benefit from using separate technologies. Embedding data in HTML is more complicated but not impossible with pre-rendered pages.

An application can start as a monolith but with logically decoupled API and front-end, and later migrated to a fully decoupled architecture.

Server architecture influences your deployment choices. Monoliths are, of course, deployed as a single application, for example to a VPS in the cloud. In the case of decoupled applications, the front end and beck end code can be deployed separately. Some options are more suitable for the front end (e.g. hosting static files on a CDN, or GitHub Pages, Netlify, etc.), some for the back end. You can host both in the cloud on a VPS or a physical server.

## Testing the Server

Servers are built to be accessed by [HTTP Clients](./http). If you want to test your server, you would use some client to send requests to your server, running on some free port on your computer.

You could use a browser for [`GET`](./http#1-get) requests, however, for other [methods](./http#request-methods) you will need some tool that makes sending such requests easy. Some examples would be [cURL](https://curl.se/), [Postman](https://www.postman.com/), [Postman for VS Code](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode) or [Rest Client for VS Code](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). These let you create the request with any method, and add the desired headers and body, and also to check the returned response.

## Parsing Requests

Requests often contain data, typically in the [JSON](./data#json) format. This data needs to be parsed.

::: tabs

== Go

In Go the parsing of JSON files on the server is done in the [same way as on the front end](./http#reading-responses). You would define the struct corresponding to the data with struct tags. The struct fields should be exported for parsing. Then you can use a `decoder` to decode the incoming data.

Decoder will validate the incoming data, and will return an error, if the data are invalid or have wrong types. Missing fields will have zero values.

```go
func handler(w http.ResponseWriter, r *http.Request) {
    type parameters struct {
        Name string `json:"name"`
        Age int `json:"age"`
        IsAdmin bool `json:"admin"`
    }

    decoder := json.NewDecoder(r.Body)
    params := parameters{}
    err := decoder.Decode(&params)
    if err != nil {
        log.Printf("Error decoding parameters: %s", err)
        w.WriteHeader(500)
        return
    }
    // params now contains the data
}
```

== JavaScript/TypeScript

The incoming JSON data can be parsed manually in Node using streams: the incoming data chunks can be appended to a body string, and the `end` event can trigger a `JSON.parse`, but Express.js also has a convenient [middleware](#middleware) to parse JSON request bodies.

```typescript
function handlerValidation(req: Request, res: Response) {
  let reqBody = "";

  req.on("data", (chunk) => {
    reqBody += chunk;
  });

  req.on("end", () => {
    try {
      // [!code highlight]
      const parsedReq = JSON.parse(reqBody);

      // validate incoming data
    } catch (e) {
      // handle errors with incoming data
    }
  });
}
```

With middleware you will access the parsed body on the request's `body` property.

```typescript
app.use(express.json());

function handlerValidation(req: Request, res: Response) {
  const body = req.body;

  // validate body
}
```

:::

## Encoding Responses

After decoding the requests, the responses will be typically sent in JSON format, too. For this the data needs to be encoded.

::: tabs

== Go

As in the case of decoding, we use structs with struct tags to encode data to JSON. After defining and instantiating the struct, we can use `json.Marshal()` to encode the data, and the `.Write()` it to the `ResponseWriter`.

```go
func handler(w http.ResponseWriter, r *http.Request) {
    type responseValues struct {
        Id int `json:"id"`
        CreatedAt time.Time `json."created_at"`
    }

    respBody := responseValues{
        Id: 12345,
        CreatedAt: time.Now(),
    }

    encodedData, err := json.Marshal(respBody)
    if err != nil {
        log.Printf("Encoding failed: %s", err)
        w.WriteHeader(500)
        return
    }
    w.Header.Set("Content-Type", "application/json")
    w.WriteHeader(200)
    w.Write(encodedData)
}
```

== JavaScript/TypeScript

In JS/TS after constructing your response body as an object, you can use `JSON.stringify()` to encode it as JSON. In Express you can use the `.send()` method on the request to send the stringified data. Before this you can set a status code with `.status()`

```typescript
const handler = (req: Request, res: Response) => {
  const responseBody = {
    id: 1234,
    createdAt: new Date(),
  };

  res.header("Content-Type", "application/json");
  res.status(200).send(JSON.stringify(responseBody));
};
```

:::
