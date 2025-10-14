---
prev:
  text: "Pointers"
  link: "./pointers"
---

# Packages

Go programs are made up of packages. The `package main` at the top of the file tells the compiler, that we want to compile the code to an executable file. The `main()` function in this file will be the main entry point of the program.

A package by any other name is a _library package_. These have no entry points. They simply export functionality that will be used by other packages.We can import other packages in our code with the `import` keyword and specifying the package name(s).

By convention, packages are named the same as the last element of their import path. However, this _isn't_ required, only discouraged.

A directory of Go code can have _at most_ one package. All `.go` files in that directory must belong to the same package, otherwise the compiler will throw an error.
