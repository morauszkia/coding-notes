---
prev:
  text: "Generics"
  link: "./generics"
---

# Limitations

As Go values simplicity over expressiveness, Go's type system lacks some powerful features that are present in other languages. While it has some features that can be used in a somewhat similar fashion, they don't provide the same level of type safety. Go developers must be aware of these limitations and act accordingly.

## Lack of Enums

Go doesn't have the type of Enums other statically typed languages have. Go's type system is more concerned with simplicity than expressiveness.

::: warning Ignored Errors

In Go errors can be ignored, as they are simple values, and only work with the potentially invalid data. You shouldn't ignore errors, and if there is a possibility that you get an error, you should handle it in your code.
For example, Rust functions sometimes return a `Result` type, which is an Enum that can have two values: `Ok` or `Error` and you are forced to handle the error case.

:::

## Lack of Union Types

Another lack is some variation of TypeScript's union types. The closest to that is a type definition, which creates a distinct type with an underlying type. In the example `sendingChannel` is just a wrapper for `string`.

::: warning Invalid Values

This will prevent us from doing certain things, but is not completely safe. Creating some constants of the wrapped type makes it easy to do the right thing, but doesn't make it impossible to do something invalid. Developers can use the constants, but can also do things, that wouldn't be allowed with TypeScript's union types.

:::

```go
type sendingChannel string

const (
    Email sendingChannel = "email"
    SMS   sendingChannel = "sms"
    Phone sendingChannel = "phone"
)

func sendNotification(ch sendingChannel, message string) {
    // send the message
}

sendingCh := "slack"
// [!code error]
sendNotification(sendingCh, "hello") // string is not sendingChannel

// GO WON'T STOP US DOING THIS

// "slack" is automatically implied as a sendingChannel
// [!code warning]
sendNotification("slack", "hello")

sendingCh := "slack"
// [!code warning]
convertedSendingCh := sendingChannel(sendingCh)
sendNotification(convertedSendingCh, "hello")
```

## Iota

While it does not make up for Go's limitations, the `iota` can be used similarly, as you would use an `Enum` in other languages. The `iota` keyword used in a `const` block will create a sequence of numbers for the constants.

```go
type sendingChannel int

const (
    Email sendingChannel = iota
    SMS
    Phone
)
```
