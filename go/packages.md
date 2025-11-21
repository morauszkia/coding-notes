---
prev:
  text: "Pointers"
  link: "./pointers"
next:
  text: "Concurrency"
  link: "./concurrency"
---

# Packages and Local Development

Go **programs** are made up of packages. The `package main` at the top of the file tells the compiler, that we want to compile the code to an executable file. The `main()` function in this file will be the main entry point of the program.

A **package** by any other name is a _library package_. These have no entry points. They simply export functionality that will be used by other packages. We can import other packages in our code with the `import` keyword and specifying the package name(s). By convention, packages are named the same as the last element of their import path. However, this _isn't_ required, only discouraged.

A directory of Go code can have _at most_ one package. All `.go` files in that directory must belong to the same package, otherwise the compiler will throw an error. Types, variables, constants and functions defined in one source file are visible to all other source files within the same package (directory).

A **module** is a collection of packages that are released together. A file name `go.mod` at the root of the project declares a module. You can publish and store it in a remote repository (recommended) or locally.

It contains

- the module path: import path prefix for all packages within the module - this also indicates where the go command should look to download it - the import path will be the module path with the subdirectory of the package
- the Go version required
- external package dependencies (optional)

```text
module github.com/bootdotdev/exampleproject

go 1.25.1

require github.com/google/examplepackage v1.3.0
```

## Local Project Setup

Typically you will have

- one repository for each go project
- one module per repository
- one or more packages per module
- one or more source file in each package

::: warning GOPATH

It was recommended to work in the `$GOPATH/src` directory, but it is no longer recommended, in fact, it is discouraged, and may cause issues.

:::

You can initialize a go module using the `go mod` command. You can quickly compile and run your program using `go run` without saving the compiled binary to your project folder. This is great for local testing and debugging.

For production build you run the `go build` command, which, if you have a `main.go` and `func main()` in your source code, compiles your go code into a single, statically linked executable program. You can then ship this executable file to end users without them having installed the Go toolchain. In case of library packages, `go build` will compile and save the package to your local build cache. It's useful for checking for compile errors.

With `go install` you can compile and install packages on local machine (in the GOBIN directory) for personal usage. You should have your GOBIN directory in your PATH.

```bash
go mod init {REMOTE}/{USERNAME}/{MODULE}
# e.g. github.com/my_username/hellogo

go run main.go # For testing
go build # For production
go install # Install package to use on local machine
```

You can import from other modules. To make functions, types and variables accessible to other packages, you need to start their name with a _Capital letter_.

::: warning Public vs. private

In Go only capitalized names are public, uncapitalized names are private and are only accessible within the package.

:::

Importing other modules is done by using the module's import path. You should include your dependencies in your `go.mod` file as well. If you are using a local module, you need to tell go, where to look for it. This is useful to get started with a project, but the _proper_ way to import modules is to publish them to a remote repository. After you do that you can drop the `replace` part from `go.mod`

To download a remote package, you can use `go get`. This will include the dependency in the `go.mod` file automatically.

```go
package main

import {
  "fmt"

  // [!code highlight]
  "{REMOTE}/{USER}/{MODULE}"
}

func main() {
  // Do something
}

```

```text
module example.com/username/modulename

go 1.25.1

replace example.com/username/another_module v0.0.0 => ../another_module

require example.com/username/another_module v0.0.0
```

```bash
go get example.com/username/module_name
```

## Clean Packages

When it comes to packages, some rules of thumb help keep the code more organized

### Hide internal logic

Similarly to [OOP's encapsulation](/advanced-concepts/oop#core-principles), not everything in a package must be public. The functions doing the actual dirty work can remain private, and we expose some public API functions that can be called from outside to run the logic.

### Don't change APIs

The private functions can and should change often for testing, refactoring and bug fixing. However, the API functions should be stable so we don't introduce breaking changes with each update. In practice this means that we should avoid changing the public function signatures.

### Don't export functions from the main package

A `package main` is not a library, so we shouldn't export functions from it.

### Packages shouldn't know about their dependents

A package should never have specific knowledge about a particular application that uses it.
