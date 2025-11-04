---
prev:
  text: "Concurrency"
  link: "./concurrency"
next:
  text: "Generics"
  link: "./generics"
---

# Mutexes

Go needs to solve the problem of multiple threads accessing the same data concurrently. It may happen, that one goroutine is changing some data, and another goroutine is trying to access and read the same data, which causes issues.

Mutexes (short for _mutual exclusion_) allow us to lock access to data that is accessed by multiple concurrent goroutines. It _excludes_ different threads from accessing the same data at the same time. This makes it possible to control which goroutines can access the data at which time, and prevent concurrent read/write problems.

Without mutexes, if one thread tries to read a variable, while at the same time another thread is trying to write to that variable, a Go program will panic, because the reader could read bad data while it's being mutated in place.

## Lock/Unlock

You can use the `sync` package's `sync.Mutex` type, and the `.Lock()` and `.Unlock()` methods to lock/unlock access to some data within a function.

::: tip Lock access to maps

This can be used, for example, to prevent parallel goroutines to access the same map, as maps are not thread-safe. Therefore it is best to lock access to maps.

:::

::: tip Defer unlock

In the code below the `safeCounter` struct has a `mu` field, which is a pointer to the `sync.Mutex`. It is best practice to structure your code so that you `defer` unlock right where you locked the data, so you don't accidentally forget to unlock it.

:::

```go
import (
    "sync" // [!code highlight]
    "time"
)

type safeCounter struct {
    counts map[string]int
    mu     *sync.Mutex // [!code highlight]
}

func (sc safeCounter) inc(key string) {
    sc.mu.Lock()  // [!code highlight]
    defer sc.mu.Unlock()  // [!code highlight]
    sc.slowIncrement(key)
}

sc := safeCounter{
    counts: make(map[string]int)
    mu: &sync.Mutex{},
}
```

If we use the `Lock`/`Unlock` methods in each function that can access the data concurrently, we can enable a function to lock access to a data before accessing it, and to unlock it only after it finishes. This blocks execution of other threads that try to access the locked data, and wait until the data becomes unlocked. This makes it possible to share the memory safely.

## RLock/RUnlock

You can let multiple readers read a piece of data concurrently, and speed up the program, while you can still ensure that only one goroutine can write at any given time using `sync.RWMutex`, which has two additional methods, `.RLock()` and `.RUnlock()` besides the usual `.Lock()`/`.Unlock()`.

The writer goroutine will still use the regular Lock/Unlock to lock out all other goroutines while it is accessing the data.

```go
package main

import (
    "sync"
    "time"
)

type safeCounter struct {
    counts map[string]int
    mu     *sync.RWMutex // [!code highlight]
}

func (sc safeCounter) inc(key string) {
    sc.mu.Lock() // [!code highlight]
    defer sc.mu.Unlock() // [!code highlight]
    sc.slowIncrement(key)
}

func (sc safeCounter) val(key string) int {
    sc.mu.RLock()   // [!code highlight]
    defer sc.mu.RUnlock() // [!code highlight]
    return sc.counts[key]
}
```
