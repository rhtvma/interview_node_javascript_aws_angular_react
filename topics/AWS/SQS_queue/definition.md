# Amazon SQS (Simple Queue Service)

A comprehensive guide to Amazon SQS for interview preparation.

---

## Table of Contents

1. [What is Amazon SQS?](#what-is-amazon-sqs)
2. [Architecture Pattern](#architecture-pattern)
3. [How SQS Works](#how-sqs-works)
4. [Message Lifecycle](#message-lifecycle)
5. [When to Use SQS](#when-to-use-sqs)
6. [SQS vs SNS](#sqs-vs-sns)

---

## What is Amazon SQS?

Amazon SQS (Simple Queue Service) is a **fully managed distributed queueing service** provided by AWS.

### Key Characteristics

**Poll-Based System**
- SQS is **poll-based**, not push-based
- Consumers actively check (poll) the queue for messages
- Even if it seems like push-based, it's actually pull-based

**Decoupling and Asynchronous Processing**
- Often used to decouple systems from each other
- Enables asynchronous workloads
- Buffers requests between components

---

## Architecture Pattern

```
┌─────────────┐
│  Producer   │
│   (App 1)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SQS Queue  │
│  (Messages) │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Consumer   │
│   (App 2)   │
└─────────────┘
```

### Flow

1. **Producer** sends messages to the queue
2. **Messages** remain in queue for defined time
3. **Consumer** polls queue for new messages
4. **Consumer** processes message
5. **Message** deleted if successful, or picked up by another consumer

---

## How SQS Works

### Main Pattern

#### 1. Producers Send Messages

Producers send messages to a queue:

```javascript
// Send message to SQS
const params = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue',
  MessageBody: JSON.stringify({
    orderId: '12345',
    customerId: '67890',
    amount: 99.99
  })
};

await sqs.sendMessage(params).promise();
```

#### 2. Message Retention

Messages remain in the queue for a defined time:
- **Default**: 4 days
- **Maximum**: 14 days
- **Minimum**: 1 minute

#### 3. Consumers Poll for Messages

Consumers check the queue on their schedule:

```javascript
// Poll for messages
const params = {
  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/123456789012/MyQueue',
  MaxNumberOfMessages: 10,
  WaitTimeSeconds: 20 // Long polling
};

const data = await sqs.receiveMessage(params).promise();
```

#### 4. Message Processing

- If consumer successfully processes message → **Message deleted**
- If consumer fails → Message becomes visible again
- Other consumers can pick up failed messages

---

## Message Lifecycle

### 1. Message Sent to Queue

```
Producer → [Message] → SQS Queue
```

### 2. Message Visible in Queue

```
SQS Queue: [Message 1] [Message 2] [Message 3]
           (visible)   (visible)   (visible)
```

### 3. Consumer Receives Message

```
Consumer polls → Message becomes invisible
                 (Visibility Timeout starts)
```

### 4. Two Possible Outcomes

#### Success Path
```
Consumer processes successfully
    ↓
Consumer deletes message
    ↓
Message removed from queue
```

#### Failure Path
```
Consumer fails or timeout expires
    ↓
Message becomes visible again
    ↓
Another consumer can pick it up
```

---

## Message Visibility Timeout

### What is Visibility Timeout?

When a consumer receives a message, it becomes **invisible** to other consumers for a specified period.

**Default**: 30 seconds
**Range**: 0 seconds to 12 hours

### Why It Matters

```
Time: 0s  → Consumer A receives message (invisible to others)
Time: 30s → If not deleted, message becomes visible again
Time: 31s → Consumer B can now receive the same message
```

### Changing Visibility Timeout

```javascript
// Extend visibility timeout while processing
const params = {
  QueueUrl: queueUrl,
  ReceiptHandle: message.ReceiptHandle,
  VisibilityTimeout: 60 // Extend to 60 seconds
};

await sqs.changeMessageVisibility(params).promise();
```

---

## When to Use SQS

### ✅ Use SQS When:

#### 1. Reliability is Important

Messages are persisted and won't be lost:
- Stored redundantly across multiple servers
- Retained for up to 14 days
- Guaranteed delivery (at-least-once)

**Example:**
```
Payment Processing → SQS → Payment Service
(Must not lose payment requests)
```

#### 2. You Have Only One Consumer

One consumer should process each message:
- Point-to-point messaging
- Work queue pattern
- Task distribution

**Example:**
```
Image Upload → SQS → Image Processing Service
(Each image processed once)
```

#### 3. Complicated Retry and Error Handling

Need sophisticated error handling:
- Dead Letter Queues (DLQ)
- Configurable retry attempts
- Message visibility timeout
- Delay queues

**Example:**
```
API Request → SQS → Worker
              ↓ (after 3 failures)
            DLQ → Manual Review
```

#### 4. Messages Picked Up After Some Time

Not instant delivery required:
- Batch processing
- Background jobs
- Scheduled tasks
- Load leveling

**Example:**
```
Report Request → SQS → Report Generator
(Process when resources available)
```

---

## SQS Queue Types

### 1. Standard Queue

**Characteristics:**
- Unlimited throughput
- At-least-once delivery
- Best-effort ordering
- May receive duplicates

**Use When:**
- High throughput needed
- Order doesn't matter
- Can handle duplicates

### 2. FIFO Queue

**Characteristics:**
- Exactly-once processing
- Strict ordering (First-In-First-Out)
- 300 TPS limit (3000 with batching)
- No duplicates

**Use When:**
- Order is critical
- No duplicates allowed
- Lower throughput acceptable

---

## SQS vs SNS

### Comparison Table

| Feature | SQS | SNS |
|---------|-----|-----|
| **Pattern** | Point-to-Point Queue | Publish-Subscribe |
| **Delivery** | Pull (polling) | Push (immediate) |
| **Receivers** | Single consumer per message | Multiple subscribers |
| **Message Storage** | Yes (4-14 days) | No (immediate delivery) |
| **Retry** | Built-in with DLQ | Subscriber handles |
| **Ordering** | FIFO option | No guarantee |
| **Use Case** | Decoupling, buffering | Broadcasting, notifications |

### When to Use Each

**Use SQS:**
- ✅ Need message persistence
- ✅ One consumer per message
- ✅ Decoupling systems
- ✅ Load leveling
- ✅ Batch processing

**Use SNS:**
- ✅ Multiple receivers
- ✅ Instant delivery
- ✅ Broadcasting
- ✅ Fan-out pattern

---

## Common Patterns

### 1. Work Queue Pattern

```
Multiple Producers → SQS Queue → Multiple Consumers
                                  (competing consumers)
```

**Use Case**: Distribute tasks among workers

### 2. Priority Queue Pattern

```
High Priority → SQS Queue 1 → Fast Workers
Low Priority  → SQS Queue 2 → Slow Workers
```

**Use Case**: Process urgent tasks first

### 3. Dead Letter Queue Pattern

```
Main Queue → (3 failures) → Dead Letter Queue → Manual Review
```

**Use Case**: Handle problematic messages

### 4. Delay Queue Pattern

```
Producer → SQS (15 min delay) → Consumer
```

**Use Case**: Scheduled processing

### 5. SNS + SQS Fan-Out Pattern

```
SNS Topic → [SQS Queue 1, SQS Queue 2, SQS Queue 3]
                ↓            ↓            ↓
           Consumer 1   Consumer 2   Consumer 3
```

**Use Case**: Multiple independent processors

---

## Example Use Cases

### 1. Order Processing

```
E-commerce Site → SQS Queue → Order Processing Service
                              (Process at own pace)
```

**Benefits:**
- Handle traffic spikes
- Reliable order processing
- Retry failed orders

### 2. Image Processing

```
Image Upload → SQS Queue → Image Processor
                           (Resize, optimize, etc.)
```

**Benefits:**
- Asynchronous processing
- Don't block user
- Scale processors independently

### 3. Email Sending

```
Application → SQS Queue → Email Service
                          (Send emails in batches)
```

**Benefits:**
- Rate limiting
- Retry failed sends
- Batch processing

### 4. Log Processing

```
Multiple Services → SQS Queue → Log Aggregator
                                (Process logs)
```

**Benefits:**
- Buffer log messages
- Handle bursts
- Reliable delivery

---

## SQS Features

### Long Polling

Reduce empty responses and costs:

```javascript
const params = {
  QueueUrl: queueUrl,
  WaitTimeSeconds: 20 // Wait up to 20 seconds for messages
};
```

**Benefits:**
- Fewer API calls
- Lower costs
- Reduced latency

### Message Attributes

Add metadata to messages:

```javascript
const params = {
  QueueUrl: queueUrl,
  MessageBody: 'Order data',
  MessageAttributes: {
    'Priority': {
      DataType: 'String',
      StringValue: 'High'
    },
    'OrderType': {
      DataType: 'String',
      StringValue: 'Express'
    }
  }
};
```

### Dead Letter Queue (DLQ)

Handle failed messages:

```javascript
// Configure DLQ
const params = {
  QueueUrl: mainQueueUrl,
  Attributes: {
    'RedrivePolicy': JSON.stringify({
      deadLetterTargetArn: dlqArn,
      maxReceiveCount: 3 // Move to DLQ after 3 failures
    })
  }
};
```

---

## Best Practices

1. ✅ **Use long polling** to reduce costs
2. ✅ **Set appropriate visibility timeout** for your processing time
3. ✅ **Implement DLQ** for failed messages
4. ✅ **Use batching** for better throughput
5. ✅ **Delete messages** after successful processing
6. ✅ **Monitor queue depth** with CloudWatch
7. ✅ **Use FIFO queues** when order matters
8. ✅ **Handle duplicates** in standard queues

---

## Pricing

- **Requests**: $0.40 per 1 million requests (after free tier)
- **Data Transfer**: Standard AWS data transfer rates
- **Free Tier**: 1 million requests per month

---

## Reference

For more details on SQS vs SNS differences:
[AWS SNS vs SQS - Main Differences](https://blog.awsfundamentals.com/aws-sns-vs-sqs-what-are-the-main-differences)

---

**Master SQS! 📬**