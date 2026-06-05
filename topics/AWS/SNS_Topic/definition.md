# Amazon SNS (Simple Notification Service)

A comprehensive guide to Amazon SNS for interview preparation.

---

## Table of Contents

1. [What is Amazon SNS?](#what-is-amazon-sns)
2. [Architecture Pattern](#architecture-pattern)
3. [Sending Methods](#sending-methods)
4. [Destinations](#destinations)
5. [When to Use SNS](#when-to-use-sns)
6. [SNS vs SQS](#sns-vs-sqs)

---

## What is Amazon SNS?

Amazon SNS (Simple Notification Service) is a **fully managed publish and subscribe service** provided by AWS.

### Key Characteristics

**Publish-Subscribe Model**
- A publisher sends a message to a **topic**
- Many consumers/subscribers are subscribed to this topic
- **Many-to-many relationship**: Multiple publishers and multiple subscribers

**Message Distribution**
- Messages are pushed to all subscribers immediately
- No polling required
- Fan-out pattern for distributing messages

---

## Architecture Pattern

```
┌─────────────┐
│  Publisher  │
│   (App 1)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  SNS Topic  │
└──────┬──────┘
       │
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │Lambda  │ │  SQS   │ │ Email  │ │  SMS   │
   │Function│ │ Queue  │ │        │ │        │
   └────────┘ └────────┘ └────────┘ └────────┘
```

### Flow

1. **Publisher** sends message to SNS topic
2. **SNS** immediately pushes message to all subscribers
3. **Subscribers** receive message in real-time
4. Multiple subscribers can process the same message

---

## Sending Methods

SNS differentiates between two types of sending methods:

### 1. Application to Application (A2A)

Messages sent between AWS services and applications.

**Destinations:**
- ✔ AWS Lambda
- ✔ Amazon SQS
- ✔ Amazon Kinesis Data Firehose
- ✔ AWS Event Fork Pipelines
- ✔ HTTP/HTTPS Endpoints

**Use Cases:**
- Microservices communication
- Event-driven architectures
- Workflow automation
- System integration

---

### 2. Application to Person (A2P)

Messages sent directly to end users.

**Destinations:**
- ✔ SMS (Text Messages)
- ✔ Email
- ✔ In-App Notifications
- ✔ AWS Chatbot (Slack, Chime)
- ✔ PagerDuty

**Use Cases:**
- User notifications
- Alerts and alarms
- Marketing messages
- System status updates

---

## Destinations

### Application to Application (A2A)

#### AWS Lambda
```json
{
  "Protocol": "lambda",
  "Endpoint": "arn:aws:lambda:us-east-1:123456789012:function:MyFunction"
}
```

#### Amazon SQS
```json
{
  "Protocol": "sqs",
  "Endpoint": "arn:aws:sqs:us-east-1:123456789012:MyQueue"
}
```

#### HTTP/HTTPS Endpoints
```json
{
  "Protocol": "https",
  "Endpoint": "https://example.com/webhook"
}
```

### Application to Person (A2P)

#### SMS
```json
{
  "Protocol": "sms",
  "Endpoint": "+1234567890"
}
```

#### Email
```json
{
  "Protocol": "email",
  "Endpoint": "user@example.com"
}
```

---

## When to Use SNS

### ✅ Use SNS When:

#### 1. Multiple Receivers
You need to send the same message to multiple destinations simultaneously.

**Example:**
```
Order Placed → SNS Topic → [Email, SMS, Lambda, SQS]
```

#### 2. Specific Receiver Types
The receiver type is Email, SMS, or an In-App Notification.

**Example:**
- User registration confirmation
- Password reset notifications
- System alerts to administrators

#### 3. Instant Message Delivery
The message needs to be forwarded instantly (push-based).

**Example:**
- Real-time alerts
- Critical system notifications
- Time-sensitive updates

---

## SNS vs SQS

### Comparison Table

| Feature | SNS | SQS |
|---------|-----|-----|
| **Pattern** | Publish-Subscribe | Point-to-Point Queue |
| **Delivery** | Push (immediate) | Pull (polling) |
| **Receivers** | Multiple (fan-out) | Single consumer per message |
| **Message Retention** | Not stored | 4-14 days |
| **Use Case** | Broadcasting | Decoupling, buffering |
| **Ordering** | No guarantee | FIFO option available |
| **Retry** | Subscriber handles | Built-in retry |

### When to Use Each

**Use SNS:**
- ✅ Multiple receivers need the same message
- ✅ Instant delivery required
- ✅ Broadcasting notifications
- ✅ Fan-out pattern

**Use SQS:**
- ✅ Single consumer per message
- ✅ Message persistence needed
- ✅ Decoupling systems
- ✅ Buffering requests
- ✅ Complex retry logic

### Combined Pattern (SNS + SQS)

```
Publisher → SNS Topic → [SQS Queue 1, SQS Queue 2, SQS Queue 3]
                              ↓            ↓            ↓
                         Consumer 1   Consumer 2   Consumer 3
```

**Benefits:**
- Fan-out to multiple queues
- Each consumer processes at their own pace
- Message persistence
- Independent scaling

---

## Example Use Cases

### 1. Order Processing System

```
Order Placed
    ↓
SNS Topic: "OrderEvents"
    ├─→ Email: Customer confirmation
    ├─→ SMS: Delivery notification
    ├─→ Lambda: Update inventory
    ├─→ SQS: Fulfillment queue
    └─→ HTTP: Analytics service
```

### 2. System Monitoring

```
CloudWatch Alarm
    ↓
SNS Topic: "SystemAlerts"
    ├─→ Email: DevOps team
    ├─→ SMS: On-call engineer
    ├─→ PagerDuty: Incident creation
    └─→ Slack: Team notification
```

### 3. Microservices Communication

```
User Registration
    ↓
SNS Topic: "UserEvents"
    ├─→ Lambda: Send welcome email
    ├─→ Lambda: Create user profile
    ├─→ Lambda: Add to mailing list
    └─→ SQS: Analytics processing
```

---

## SNS Features

### Message Filtering

Subscribe to specific messages based on attributes:

```json
{
  "eventType": ["order_placed", "order_shipped"],
  "priority": ["high"]
}
```

### Message Attributes

Add metadata to messages:

```json
{
  "MessageAttributes": {
    "eventType": {
      "DataType": "String",
      "StringValue": "order_placed"
    },
    "priority": {
      "DataType": "String",
      "StringValue": "high"
    }
  }
}
```

### Dead Letter Queue (DLQ)

Handle failed deliveries:
- Capture messages that couldn't be delivered
- Analyze and retry failed messages
- Prevent message loss

---

## Best Practices

1. ✅ **Use message filtering** to reduce unnecessary processing
2. ✅ **Implement DLQ** for failed deliveries
3. ✅ **Add message attributes** for better routing
4. ✅ **Monitor with CloudWatch** for delivery metrics
5. ✅ **Use encryption** for sensitive data
6. ✅ **Set appropriate retry policies**
7. ✅ **Test failover scenarios**

---

## Pricing

- **Requests**: $0.50 per 1 million requests
- **Data Transfer**: Standard AWS data transfer rates
- **SMS**: Varies by destination country
- **Email**: First 1,000 free, then $2 per 100,000

---

## Reference

For more details on SNS vs SQS differences:
[AWS SNS vs SQS - Main Differences](https://blog.awsfundamentals.com/aws-sns-vs-sqs-what-are-the-main-differences)

---

**Master SNS! 📢**