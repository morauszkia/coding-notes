---
prev:
  text: "DNS & IP"
  link: "./dns"
---

# URIs

A _Uniform Resource Identifier_ (URI) is a unique character sequence that identifies some resource that is most often accessed via the internet. They have syntax rules to ensure that programs can interpret their meaning in the same way.

There are two types of URIs:

- URLs (Uniform Resource Locators) - specify the location of a resource on a computer network
- URNs (Uniform Resource Names) - globally unique persistent identifiers assigned within defined namespaces (e.g. ISBN, ISAN or ISSN numbers)

## Structure of URLs

URLs are potentially complex character sequences with several sections. They can consist of

- protocol (required)
- username
- password
- domain (required)
- port (defaults to 80 or 443)
- path (defaults to `/`)
- query (e.g. `page=1`)
- fragment (e.g. `#id`)

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
