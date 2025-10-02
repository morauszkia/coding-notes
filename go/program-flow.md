---
prev:
  text: "Variables"
  link: "./variables"
next:
  text: "Functions"
  link: "./functions"
---

# Program Flow

## Conditionals

Oftentimes we want to run a code (on run different commands) based on a condition. Go, similarly to most programming languages offers if-else statements and switch statements to achieve this.

### If-else

In go you can use an `if` statement to run a block of code only if a condition is met. The syntax is:

```go
if condition {
  // do this
}
```

If statements can be followed by optional `else if` statements, that only run if the previous `if` and `else if` statements didn't, because their conditions were not met. Finally, an `else` statement can come at the end, which runs only if neither of the previous `if` or `else if` blocks' conditions was met.

```go
if result > 90 {
  fmt.Println("Great work!")
} else if result > 60 {
  fmt.Println("You did well!")
} else {
  fmt.Println("Don't be discouraged! Next time will be better.")
}
```

If statements can be introduced with an **initial statement**, in which we can declare the variables that will be used in the condition. This makes these variables only being defined in the scope of the `if` body. This makes the code shorter, and also doesn't create variables that we won't need anymore, after the `if` block ran.

```go
if length := getLength(email); length < 1 {
    fmt.Println("Email is invalid")
}
```

There are no one-liner `if` statements in Go, the codeblock always needs to be surrounded by curly braces (`{}`).

### Switch

A longer sequence of `if/else if/else` statements can be substituted with a `switch` statement. These are introduced with a `switch varname` stament and the cases are surrounded by curly braces. The code for the cases is indented. The code of the first matching case will run. In Go (unlike in C, Java, JavaSript or PHP) the `break` after a case is implicit and happens automatically, so only the first succeeding case will run. If you want a case to fallthrough, you need to explicitly tell the program, to do that.

```go
func getCreator(os string) string {
    var creator string
    switch os {
    case "linux":
        creator = "Linus Torvalds"
    case "windows":
        creator = "Bill Gates"
    case "mac":
        creator = "A Steve"
    default:
        creator = "Unknown"
    }
    return creator
}

func getColor(fruit string) string {
  switch fruit {
  case "orange":
    return "orange"
  case "banana":
    return "yellow"
  case "strawberry":
    fallthrough
  case "raspberry":
    return "red"
  default:
    return "unknown"
  }
}
```

A switch can be written with no condition, in which case it is the same as `switch true`, which can be used to substitute for long if-else chains.

```go
switch {
case t.Hour() < 12:
  fmt.Println("Good morning!")
case t.Hour() < 17:
  fmt.Println("Good afternoon.")
default:
  fmt.Println("Good evening.")
}
```

## Loops

The basic `for` loop follows more or less a C-like syntax.

```go
for i := 0; i < 10; i++ {
  // do something
}
```

You can also omit the condition (2nd part) to create an infinite loop. You need to break out of such a loop (e.g. `return` something) to make it stop.

There is no `while` loop in Go. You can use a `for` loop with only the condition instead.

```go
for health > 0 {
  damage = getDamage()
  fmt.Printf("Your character took %v damage", damage)
  health -= damage
}
fmt.Printf("Your character died.")
```

### continue and break

You can use the `continue` and `break` keywords to change the flow of your loop. As in other languages, `continue` stops the current iteration of the loop and moves on to the next iteration, and `break` stops the current iteration and exits the loop.

```go
func printPrimes(max int) {
  for n := 2; n <= max; n++ {
    if n == 2 {
      fmt.Println(n)
      // will move on to the next iteration of the loop
      continue // [!code highlight]
    }
    if n % 2 == 0 {
      continue // [!code highlight]
    }

    isPrime := true
    for i := 3; i * i <= n; i += 2 {
      if n % i == 0 {
        isPrime = false
        // will break from inner loop and continue with the code of the outer loop
        break // [!code highlight]
      }
    }

    if isPrime {
      fmt.Println(n)
    }
  }
}
```
