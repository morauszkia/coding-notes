---
prev:
  text: "HTTP Clients & HTTPS"
  link: "./http"
next:
  text: "URIs"
  link: "./uri"
---

# DNS and IP

Computers find each other over the internet using IP (Internet Protocol) addresses.

Currently most servers use IPv4 addresses, which consist of four numbers from 0 to 255, separated by dots. This means, that there are approximately 4.3 billion different addresses, but some are reserved. Some are private, and are used in local area networks. These can be used in multiple places. Others are public, and used on the internet. These need to be unique to uniquely identify the server we want to reach.

In the era of IoT (Internet of Things), the address space offered by IPv4 will quickly become insufficient, hence, the IPv6 will supersede it. This has other benefits beside the size of the address space, but I won't go into details now.

## Domain Names

IP addresses are hard (in case of IPv6 practically impossible) to memorize. Therefore we use in human readable addresses instead. We type these into the browsers. These then need to be converted to an IP address, which tells, where the server is located on the internet. The IP address is resolved using a [Domain Name System (DNS)](#dns).

### Extract domain names from URLs

The domain name is part of a URL, which tells the computer where the server is located on the internet. It gets converted to an IP address by a DNS.
You can extract the domain name from an URL by parsing it.

::: tabs

== Go

In Go the `net/url` package can be used to work with URLs. You can instantiate a URL struct using `url.Parse()`. It may return an error, so you need to handle that case before proceeding with the struct.

```go
// [!code highlight]
parsedURL, err := url.Parse("https://google.com/maps")
if err != nil {
    .Println("error parsing url:", err)
    return
}

// [!code highlight]
domain := parsedURL.Hostname()
```

== JS/TS

In JavaScript or TypeScript you can use the `URL` API to create a new URL object.

```javascript
// [!code highlight]
const urlObj = new URL("https://google.com/maps");
console.log(urlObj.hostname);
```

:::

If you want to deploy a website on the internet, you need to acquire a domain name, and associate it with your IP address.

### DNS

The Domain Name System is like the phonebook of the internet. It resolves the human-readable domain names to their IP addresses. ICANN is an NPO that manages DNS for the entire internet. A computer can contact one of ICANN's _root nameservers_ whose address is included in the computer's network configuration. The nameserver gathers the records for the specified domain name from their distributed DNS database.

### Subdomains

A _subdomain_ is a prefix of the domain name, which allows the domain to route network traffic to different servers and resources. For example a web app, an API or a blog can be hosted on different servers with different IP addresses.
