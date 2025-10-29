---
prev:
  text: "Languages"
  link: "/languages"
next:
  text: "Go: Variables"
  link: "./variables"
---

# Introduction to Go

Go (often referred to as Golang) is an open source, statically typed, compiled programming language developed at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson, and publicly announced in 2009. Its design emphasizes simplicity, efficiency, and reliability, making it particularly well-suited for building secure, scalable systems and large-scale software infrastructure.

Go is widely used for web servers and APIs, cloud-native applications and microservices, networking tools and distributed systems, command-line utilities and system tools.

## Key Features

- **Simplicity and Readability**: Go’s syntax is concise and clear, with a limited set of keywords and uniform formatting rules, making it easy to learn and maintain.
- **Fast Compilation**: The Go compiler is known for its extremely fast build times, producing statically linked native binaries that are easy to deploy.
- **Platform Independence**: Go code can be compiled and run on various operating systems without modification, enhancing portability.
- **Automatic Memory Management**: Go features garbage collection, reducing the risk of memory leaks and simplifying memory management for developers.
- **Concurrency**: Go natively supports concurrent programming through goroutines (lightweight threads) and channels, enabling efficient parallel processing and communication between tasks—a major advantage for multicore and networked environments.
- **Rich Standard Library**: Go provides a comprehensive standard library for tasks such as networking, I/O, and text processing, allowing developers to build robust applications with minimal external dependencies.
- **Strong Tooling**: Tools like gofmt for automatic code formatting, go run for compiling and running code, go get for dependency management, and go test for testing are integral to the Go workflow.

## Compilation

The Go compiler takes the Go code, and compiles it to machine code, and produces an executable file, which can be run without any interpreter. This makes your program easier to distribute, because users don't need a specific interpreter to run the program.

In the code file, `package main` informs the compiler, that we want to run the file as a standalone program, and not use it as a library by other programs.

The code file contains a `func main() {}` function, that is the main entry point of the program.

An advantage of compiled languages, such as Go is, that oftentimes bugs are caught at compile time, and don't get into production. This said, not all bugs are compilation errors, and we have to be on the lookout for runtime errors as well.

Another advantage is, that compiled languages tend to run faster than interpreted languages, such as Python, JavaScript or Ruby. Go programs are fast, however, not as fast as C, Zig or Rust programs. On the other hand, Go programs compile faster, which makes the development process more productive.

Furthermore, Go programs are fairly lightweight: each program contains a small amount of additional code: the Go Runtime. One of its purposes is to clean up unused memory (garbage collection). Therefore, Go programs use somewhat more memory than C or Rust programs, but less than Java programs.

Garbage collection is a nice feature, which makes the life of Go developers much easier. The tradeoff is slightly larger memory usage and that Go programs are somewhat slower than Rust or C programs. This is the price of memory safety and simple syntax.

## Go Proverbs

Rob Pike summed up the basic principles of Go in the following collection of wise words (similarly to the [Zen of Python](https://peps.python.org/pep-0020/))

> Don't communicate by sharing memory, share memory by communicating.
> Concurrency is not parallelism.
> Channels orchestrate; mutexes serialize.
> The bigger the interface, the weaker the abstraction.
> Make the zero value useful.
> interface{} says nothing.
> Gofmt's style is no one's favorite, yet gofmt is everyone's favorite.
> A little copying is better than a little dependency.
> Syscall must always be guarded with build tags.
> Cgo must always be guarded with build tags.
> Cgo is not Go.
> With the unsafe package there are no guarantees.
> Clear is better than clever.
> Reflection is never clear.
> Errors are values.
> Don't just check errors, handle them gracefully.
> Design the architecture, name the components, document the details.
> Documentation is for users.
> Don't panic.
