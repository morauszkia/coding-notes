---
prev:
  text: Stacks
  link: "./stacks"
---

# Queues

Queues, too, store ordered items, similarly to list, but - similarly to stacks - are restrictive, because they only allow _adding items to the tail_ (**enqueue**) and _removing items from the head_ (**dequeue**) of the queue. Queues are often referred to as a FIFO (first in, first out) data structure.

Queues support

- **enqueue/push**: add items to the tail of the queue
- **dequeue/pop**: remove items from the head of the queue
- **peek**: return item from the head without modifying the queue
- **size** (optional): return the size (length) of the queue

And, similarly to stacks all of the above can be _ideally_ performed with `O(1)` time complexity.

And, again, similarly to stacks, queues can store any type of items.

## Stacks vs. Queues

Queues and Stacks both perform the operations they are allowed to perform extremely efficiently. To choose between them, you need to consider your needs.

Stacks treat items in the reverse order, as they were added: last added item will be processed first.

Queues process items in the same order, as they were added.

## Linked Lists as Queues

Regular lists have a disadvantage, if we try to push items to them: they need to update the index of each item already present, which makes the pushing `O(n)` instead of the desired `O(1)`.

Unlike in regular lists/arrays, items in Linked Lists are not stored next to each other in memory, instead each item references the next item in the chain.

The Linked List consists of Nodes, which have a `value` and a `next` (reference to the next node). To access an item in the Linked List, we need to follow the chain of `next` references until we find the desired item. This incurs overhead over lists, whose elements can be accessed using their index.

However, Linked Lists perform better than regular lists/array, if we frequently have to _insert or delete items from the middle_. In the latter case, we need to update the indexes of several items after insertion/deletion. In the former case we only need to update the reference of the preceding node in the chain to point to the new next node. This makes insertions/deletions `O(1)` after locating the right place in the chain.

Linked Lists can also easily add items to the head, because they only need to update the reference to the head node, and reference the old head as the new head's next.

::: tip Iteration made simple in Python
While iterating through a Linked List may be quite painful, it can be made easy for the user of your code by adding an `__iter__` method to your class.
:::

::: tabs

== Python List

```python
class Queue:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.insert(0, item)

    def pop(self):
        if len(self.items) == 0:
            return None
        temp = self.items[-1]
        del self.items[-1]
        return temp

    def peek(self):
        if len(self.items) == 0:
            return None
        return self.items[-1]

    def size(self):
        return len(self.items)

    def search_and_remove(self, item):
        if item not in self.items:
            return None
        self.items.remove(item)
        return item

    def __repr__(self):
        return f"[{', '.join(self.items)}]"

```

== Python Linked List

```python
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

    def set_next(self, node):
        self.next = node

    def __repr__(self):
        return self.val

class LLQueue:
    def remove_from_head(self):
        if self.head is None:
            return None
        temp = self.head
        self.head = self.head.next
        if self.head is None:
            self.tail = None
        temp.set_next(None)
        return temp

    def add_to_tail(self, node):
        if self.head is None:
            self.head = node
            self.tail = node
            return
        self.tail.set_next(node)
        self.tail = node

    def __init__(self):
        self.tail = None
        self.head = None

    def __iter__(self):
        node = self.head
        while node is not None:
            yield node
            node = node.next

    def __repr__(self):
        nodes = []
        for node in self:
            nodes.append(node.val)
        return " <- ".join(nodes)
```

:::
