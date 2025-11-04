# DNS and IP

Computers find each other over the internet using IP (Internet Protocol) addresses.

Currently most servers use IPv4 addresses, which consist of four numbers from 0 to 255, separated by dots. This means, that there are approximately 4.3 billion different addresses, but some are reserved. Some are private, and are used in local area networks. These can be used in multiple places. Others are public, and used on the internet. These need to be unique to uniquely identify the server we want to reach.

In the era of IoT (Internet of Things), the address space offered by IPv4 will quickly become insufficient, hence, the IPv6 will supersede it. This has other benefits beside the size of the address space, but I won't go into details now.

## Domain Names

IP addresses are hard (in case of IPv6 practically impossible) to memorize. Therefore we use in human readable addresses instead. We type these into the browsers. These then need to be converted to an IP address, which tells, where the server is located on the internet. The IP address is resolved using a Domain Name Service (DNS).

::: info URLs

The domain name is part of a URL, which tells the computer where the server is located on the internet. It gets converted to an IP address by a DNS.

:::

If you want to deploy a website on the internet, you need to acquire a domain name, and associate it with your IP address.
