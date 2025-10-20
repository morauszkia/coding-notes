# Concurrency

Go was designed to be concurrent, and it excels at performing tasks in parallel safely. It has a simple syntax to spawn concurrent execution. You can use the `go` keyword when calling a function to spawn a new _goroutine_, and execute code concurrently with the rest of the code.

## Creating a Channel

Goroutines can communicate with each other via _channels_. You can _create_ a channel using the `make()` keyword. Channels can optionally be created buffered. For this you pass in the buffer length as the second argument to `make()`. A buffer allows the channel to hold a fixed number of values before sending blocks: sending on a buffered channel only blocks if the buffer is full, and receiving blocks only if the buffer is empty.

```go
ch := make(chan int) // create channel
ch2 := make(chan int, 100) // create buffered channel
```

## Sending and Receiving

You can then send data to a channel with `<-`, which (if it is not buffered) will _block_ until another goroutine is ready to receive the value. And you can receive data from the channel using `<-` again, which will _block_ until there is a value in the channel to be read.

```go
ch <- 69 // send value to channel

v := <-ch // read value and store in v
```

::: warning Deadlock

A common bug in concurrent programming called _deadlock_ is when a group of goroutines are all blocking and none of them can continue.

:::

Sometimes we only want to send a signal through the channel, and at the receiving end wait for a signal to continue, but we don't care about the actual value sent through the channel. For example, we can signal that a longer process (e.g. file download) has completed. In such cases we can use `<-ch` in itself, without assigning it to a variable to receive the signal. [Empty structs](./structs#empty-structs) are often used as signal.

## Passing Channels

Passing a channel to a function passes a reference to the channel.

```go
func send(ch chan int) {
    ch <- 99
}

func main() {
    ch := make(chan int, 1)
    send(ch)
    fmt.Println(<-ch) // 99
}
```

## Closing Channels

Channels can be explicitly closed by a _sender_. For this you can use the `close(ch)` command, passing in the channel to be closed. You can check if a channel is closed in your code: beside the value you can receive a `bool` that indicates if the channel you try to receive from is empty and closed. In such a case the second value received will be `false`.

```go
close(ch)   // closing a channel

v, ok := <-ch   // receiving from channel and checking if closed
```

::: warning Sending on a closed channel

Sending on a closed channel will cause a [panic](./interfaces#panic), and if it happens on the main goroutine, crash the whole program. A panic in any other goroutine will case the goroutine to crash.

:::

::: tip When to close?

There is nothing wrong with leaving a channel open. It will be garbage collected after it is no longer used. You should close the channel to _indicate explicitly_ to the receiver that nothing else is going to come across the channel. For example, you might want to count things coming through a channel, and return the count after the channel was closed.

```go
func countReports(numSentCh chan int) int {
    var numReports int
    for {
        // [!code highlight]
        if numSent, ok := <-numSentCh; ok {
            numReports += numSent
        } else {
            break
        }
    }
    return numReports
}
```

:::
