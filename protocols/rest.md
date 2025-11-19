---
prev:
  text: "URIs"
  link: "./uri"
---

# RESTful APIs

_REST_ (Representational State Transfer) is a popular convention followed by many dynamic HTTP servers. These follow a loose set of rules that makes building reliable and predictable web APIs easy. Not all web servers adhere to the REST convention, but it is very common.

The main idea is that resources are transferred between the client and server via well-recognized, language-agnostic interactions. Servers and clients can be implemented independently of one another, as long as some simple standards, like the names of available resources, have been established.

RESTful APIs are stateless: the server doesn't need to know what state the client is in and vice versa. This is enforced by interacting with resources instead of commands.

## REST API Paths

In REST architecture certain URL endpoints are exposed: the last part of the URL path specifies a resource that can be accessed. Depending on the [HTTP method](./http#request-methods) of the request, the resource is created, read, updated or deleted. RESTful APIs expose these resources, and not server commands.

A typical path for a REST API would specify the version, and would end with the resource. Resources can be collections or singletons, and can be nested in a hierarchical structure. As a best practice you should use nouns to name resources.

[Query parameters](./uri#structure-of-urls) can be used to sort or filter the resources further. They are often used to specify which properties we want to access, or to filter or sort the collection by some property.

```txt
https://api.example.com/v1/users
https://api.example.com/v1/users/{id}
https://api.example.com/v1/users/{id}/accounts
https://api.example.com/v1/users?sort=username&role=user
```

## Documentation

It is the server's developers' responsibility to provide documentation how to interact with the server. The documentation should tell:

- the domain of the server
- the resources (paths) that are exposed
- the supported HTTP methods
- the supported query parameterers
- and any other information needed to interact with the server
