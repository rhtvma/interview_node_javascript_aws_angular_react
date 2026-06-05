# Queue and Dequeue - Interview Ready Guide

A focused guide to queues, dequeue operations, double-ended queues, and message queue patterns.

---

## Table of Contents

1. [Queue Overview](#queue-overview)
2. [Enqueue vs Dequeue](#enqueue-vs-dequeue)
3. [Queue Data Structure](#queue-data-structure)
4. [Deque](#deque)
5. [Message Queues](#message-queues)
6. [Queue Delivery Patterns](#queue-delivery-patterns)
7. [Ordering and Idempotency](#ordering-and-idempotency)
8. [Retries and Dead Letters](#retries-and-dead-letters)
9. [Queue vs Stack vs Pub/Sub](#queue-vs-stack-vs-pubsub)
10. [Best Practices](#best-practices)
11. [Common Interview Questions](#common-interview-questions)

---

## Queue Overview

**Description:** A queue is a FIFO data structure where items are added at the rear and removed from the front.

**Simple Interview Answer:** Queue means first in, first out. The first item added is the first item processed.

```text
front [ A, B, C ] rear
dequeue -> A
enqueue D -> [ B, C, D ]
```

### Real-World Examples

- Print jobs.
- Background tasks.
- API request buffering.
- Order processing.
- Notification delivery.
- Breadth-first search.

---

## Enqueue vs Dequeue

| Operation | Meaning | Position |
| --- | --- | --- |
| Enqueue | Add item | Rear/end |
| Dequeue | Remove item | Front/start |
| Peek | Read next item without removing | Front/start |
| IsEmpty | Check whether queue has no items | Whole queue |

### JavaScript Example

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
```

### Interview Tip

In JavaScript, `shift()` is easy to understand but can be inefficient for large queues because it re-indexes the array. A pointer-based queue is better for performance.

---

## Queue Data Structure

### Efficient JavaScript Queue

```javascript
class EfficientQueue {
  constructor() {
    this.items = {};
    this.front = 0;
    this.rear = 0;
  }

  enqueue(value) {
    this.items[this.rear] = value;
    this.rear++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const value = this.items[this.front];
    delete this.items[this.front];
    this.front++;
    return value;
  }

  isEmpty() {
    return this.front === this.rear;
  }

  size() {
    return this.rear - this.front;
  }
}
```

### Time Complexity

| Operation | Complexity |
| --- | --- |
| Enqueue | O(1) |
| Dequeue | O(1) with pointer/object queue |
| Peek | O(1) |
| Search | O(n) |

---

## Deque

**Deque** means double-ended queue. It supports insertion and deletion from both front and rear.

```text
addFront     addRear
   v           v
[ A, B, C, D ]
   ^           ^
removeFront removeRear
```

### Deque Use Cases

- Sliding window problems.
- Palindrome checking.
- Browser history navigation.
- Undo/redo systems.
- Task scheduling.

---

## Message Queues

**Message queues** apply the queue concept to distributed systems. They store messages until consumers are ready to process them.

```text
Producer -> Queue -> Consumer
```

### Why Message Queues Are Used

- Decouple services.
- Handle traffic spikes.
- Process tasks asynchronously.
- Retry failed work.
- Improve system resilience.

### Examples

- RabbitMQ.
- AWS SQS.
- Azure Service Bus.
- Google Pub/Sub.
- Redis Streams.
- Kafka topics, though Kafka is more event log than classic queue.

---

## Queue Delivery Patterns

| Pattern | Description |
| --- | --- |
| Point-to-point | One message is processed by one consumer |
| Work queue | Multiple workers share tasks from one queue |
| Pub/Sub | One event is delivered to multiple subscribers |
| Priority queue | Higher-priority messages are processed first |
| Delay queue | Message becomes available after delay |
| FIFO queue | Preserves strict order |

---

## Ordering and Idempotency

**Ordering** means messages are processed in the expected sequence.

Strict ordering can reduce scalability because only one consumer or partition may process a sequence safely.

**Idempotency** means a consumer can safely process the same message more than once without duplicate side effects.

Examples:

- Use unique message IDs.
- Store processed event IDs.
- Use database constraints.
- Make updates conditional.

### Interview Tip

Most real queue systems provide at-least-once delivery, so duplicate processing is possible. Idempotency is essential.

---

## Retries and Dead Letters

When message processing fails, common options are:

- Retry immediately.
- Retry after delay.
- Retry with exponential backoff.
- Move to dead letter queue after max attempts.
- Alert the team for manual inspection.

```text
Main Queue -> Consumer fails -> Retry Queue -> Main Queue
                         -> too many failures -> DLQ
```

---

## Queue vs Stack vs Pub/Sub

| Concept | Order | Processing |
| --- | --- | --- |
| Queue | FIFO | First item processed first |
| Stack | LIFO | Last item processed first |
| Pub/Sub | Broadcast | Event goes to multiple subscribers |

In a queue, one message is usually consumed by one worker. In pub/sub, one event can be delivered to many subscriber groups.

---

## Best Practices

- Keep messages small.
- Store large payloads in storage and send a reference.
- Use idempotent consumers.
- Configure retry limits.
- Use dead letter queues.
- Monitor queue depth and oldest message age.
- Scale consumers based on queue lag.
- Do not rely on queue ordering unless the system explicitly guarantees it.

---

## Common Interview Questions

### 1. What is a queue?

A queue is a FIFO data structure where insertion happens at the rear and deletion happens at the front.

### 2. What is dequeue?

Dequeue is the operation of removing an item from the front of a queue.

### 3. What is a deque?

A deque is a double-ended queue that allows insertion and deletion at both ends.

### 4. Why are queues used in distributed systems?

They decouple services, absorb traffic spikes, support asynchronous processing, and improve reliability.

### 5. What is at-least-once delivery?

It means a message will be delivered one or more times. The consumer must handle duplicates safely.

### 6. How do you handle failed messages?

Use retries with limits, backoff, dead letter queues, logging, and alerts.

