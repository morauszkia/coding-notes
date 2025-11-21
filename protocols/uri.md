---
prev:
  text: "DNS & IP"
  link: "./dns"
next:
  text: "REST"
  link: "./rest"
---

# URIs

A _Uniform Resource Identifier_ (URI) is a unique character sequence that identifies some resource that is most often accessed via the internet. They have syntax rules to ensure that programs can interpret their meaning in the same way.

There are two types of URIs:

- URLs (Uniform Resource Locators) - specify the location of a resource on a computer network
- URNs (Uniform Resource Names) - globally unique persistent identifiers assigned within defined namespaces (e.g. ISBN, ISAN or ISSN numbers)

## Structure of URLs

URLs are potentially complex character sequences with several sections. They can consist of

- protocol (required): protocol or scheme defines the rules by which the data being communicated is displayed, encoded and formatted. This can be `http`, `https`, `ftp` (file transfer), `mailto`, etc.
- username
- password
- domain (required)
- port: optional, defaults to 80 (`http`) or 443 (`https`), but other ports as well can be used to connect to the host (e.g. `3000` or `8080` is often used for development servers)
- path (defaults to `/`): typically mirrors the server's filesystem hierarchy, but this is just a convention, the server can be configured otherwise, and paths can be used to pass in parameters (e.g. id, slug), API version, type of requested resource to a server serving a dynamic web application
- query (e.g. `?page=1&sort=population`): are optional key-value pairs, that typically do not change which page is served, but are often used for marketing analytics or for changing a variable on the page, e.g. search query, page, ordering, etc. Query parameteres start with a `?` and the key-value pairs are separated by `&`
- fragment (e.g. `#id`): can be used to scroll to some point within the page with the specified id value.

::: tabs

== Go

In Go the `net/url` package can be used to parse URLs. The resulting URL struct will have the necessary fields and methods to extract all these sections.

```go
package main

import (
    "net/url"
)

func newParsedURL(urlString string) ParsedURL {
    parsedUrl, err := url.Parse(urlString)
    if err != nil {
        return ParsedURL{}
    }

    password, _ := parsedUrl.User.Password()

    return ParsedURL{
        protocol: parsedUrl.Scheme,
        username: parsedUrl.User.Username(),
        password: password,
        hostname: parsedUrl.Hostname(),
        port:     parsedUrl.Port(),
        pathname: parsedUrl.Path,
        search:   parsedUrl.RawQuery,
        hash:     parsedUrl.Fragment,
    }
}
```

== JS/TS

In JavaScript or TypeScript we can use the `URL` API. The resulting URL object will have the properties for all the sections.

```javascript
function printURLParts(urlString: string): void {
  const urlObj = new URL(urlString);
  console.log("protocol: ", urlObj.protocol);
  console.log("username: ", urlObj.username);
  console.log("password: ", urlObj.password);
  console.log("hostname: ", urlObj.hostname);
  console.log("port: ", urlObj.port);
  console.log("pathname: ", urlObj.pathname);
  console.log("search: ", urlObj.search);
  console.log("hash: ", urlObj.hash);
}
```

:::
