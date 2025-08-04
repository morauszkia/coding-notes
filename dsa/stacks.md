---
prev:
  text: Data Structures Intro
  link: "./data-structures"
next:
  text: Queues
  link: "./queues"
---

# Stacks

A stack is a data structure that stores ordered items. Compared to a regular [list](./data-structures#lists), a stack is more restricted: it only allows to add or remove items **from the top of the stack**.

By restricting the way that the data of a stack can be accessed, we guarantee that the allowed operations will be fast.

Stacks support

- **push**: adding an item to the top
- **pop**: removing an item from the top
- **peek**: return the item from the top without modifying the stack
- **size**: return the number of items in the stack

All of the above can be performed with `O(1)` time complexity. When all we need is a stack, it is the best choice, because it is extremely fast.

Stacks are referred to as a _LIFO_ (last in, first out) data structure.

::: tip FIFO
If you need the performance of a Stack, but need to process items in the same order as they were added, use a [queue](./queues)
:::

Stacks can store any type of items, and are often used for

- undo/redo functionality
- function call management (call stack)
- expression evaluation
- browser history

## Implementation

Stacks can be implemented using arrays or linked lists

:::tabs

== Python

```python
class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def size(self):
        return len(self.items)

    def peek(self):
        if self.size() == 0:
            return None
        return self.items[-1]

    def pop(self):
        if self.size() == 0:
            return None
        item = self.items[-1]
        del self.items[-1]
        return item
```

== JavaScript

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  size() {
    return this.items.length;
  }

  peek() {
    if (this.size() == 0) {
      return undefined;
    }
    return this.items.[this.size() - 1];
  }
  pop() {
    if (this.size() == 0) {
      return undefined;
    }
    return this.items.pop();
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

:::
