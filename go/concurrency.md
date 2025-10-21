# Concurrency

Go was designed to be concurrent, and it excels at performing tasks in parallel safely. It has a simple syntax to spawn concurrent execution. You can use the `go` keyword when calling a function to spawn a new _goroutine_, and execute code concurrently with the rest of the code.

::: warning Goroutines killed silently

If a program exits before its goroutines have completed, those goroutines will be killed silently.

:::

## Creating a Channel

Goroutines can communicate with each other via _channels_. You can _create_ a channel using the `make()` keyword. Channels can optionally be created buffered. For this you pass in the buffer length as the second argument to `make()`. A buffer allows the channel to hold a fixed number of values before sending blocks: sending on a buffered channel only blocks if the buffer is full, and receiving blocks only if the buffer is empty.

```go
ch := make(chan int) // create channel
ch2 := make(chan int, 100) // create buffered channel
```

A declared but uninitialized channel is `nil`.

```go
var ch chan string  // ch is nil
```

::: warning Interacting with nil channel

Sending to and receiving from a nil channel will block forever.

:::

## Closing Channels

Channels can be explicitly closed by a _sender_. For this you can use the `close(ch)` command, passing in the channel to be closed. You can check if a channel is closed in your code: beside the value you can receive a `bool` that indicates if the channel you try to receive from is empty and closed. In such a case the second value received will be `false`.

```go
close(ch)   // closing a channel

v, ok := <-ch   // receiving from channel and checking if closed
```

::: warning Sending on a closed channel

Sending on a closed channel will cause a [panic](./interfaces#panic), and if it happens on the main goroutine, crash the whole program. A panic in any other goroutine will case the goroutine to crash.

:::

::: info Receiving from a closed channel

Receiving from a closed channel returns the zero value.

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

### Range

Channels can be ranged over. If we do this, we will receive values over the channel until it is not closed. If nothing new is in the channel, it will block at the iteration.

```go
for item := range ch {
    // item is the value received from the channel
}
```

### Select

Select makes it possible to listen to multiple channels and process the data in the order as it comes through the channels. The first channel with a value to be received will fire and its body will be executed. If multiple channels have values to be received, one will be chosen randomly. The `ok` variables tell if the channel has been closed by the sender.
You typically use select inside a `for` loop.

```go
func logMessages(chEmails, chSms chan string) {
    for {
        select {
        case e, ok := <- chEmails:
            if !ok {
                return
            }
            logEmail(e)
        case s, ok := <- chSms:
            if !ok {
                return
            }
            logSms(s)
        }
    }
}
```

A `default` case executes if no other channel has a value ready. It stops the `select` statement from blocking.
You can ignore a channels value by not binding it to a variable. It treats the received value as a signal. You can also use the `_` blank identifier.

```go
select {
case <-ch:
    // do something after signal
    // value is ignored
default:
    // do something else
}

select {
case _ <- ch:
    // value is ignored
default:
    // do something else
}
```

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

### Read-Only and Write-Only channels

You can mark the passed in channel as read-only by casting it to a `<-chan` type. You can mark it as write-only by casting it to `chan<-`

```go
func readCh(ch <-chan int) {
    // ch can only be read from in this function
}

func writeCh(ch chan<- int) {
    // ch can only be written to in this function
}
```

## Tickers

The `time` library has useful functions to block execution or send signals at intervals or after a specified duration. The functions take a `time.Duration` as an argument. Otherwise it will default to nanoseconds.

- `time.Tick()` returns a channel that sends a value on a given interval (e.g. `time.Tick(500 * time.Millisecond)`)
- `time.After()` sends a value once after the specified duration
- `time.Sleep()` blocks the goroutine for the specified duration
