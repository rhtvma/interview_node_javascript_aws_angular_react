# Redis - Interview Ready Guide

A practical guide to Redis concepts for backend, caching, queues, and system design interviews.

---

## Table of Contents

1. [Redis Overview](#redis-overview)
2. [Why Redis Matters](#why-redis-matters)
3. [Core Data Types](#core-data-types)
4. [Caching Patterns](#caching-patterns)
5. [Expiration and Eviction](#expiration-and-eviction)
6. [Persistence](#persistence)
7. [Pub/Sub and Streams](#pubsub-and-streams)
8. [Distributed Locks](#distributed-locks)
9. [Replication and High Availability](#replication-and-high-availability)
10. [Redis vs Memcached vs Database](#redis-vs-memcached-vs-database)
11. [Best Practices](#best-practices)
12. [Common Interview Questions](#common-interview-questions)

---

## Redis Overview

**Description:** Redis is an in-memory data store commonly used as a cache, session store, rate limiter, lightweight queue, pub/sub system, and fast key-value database.

**Simple Interview Answer:** Redis stores data mostly in memory, so reads and writes are very fast. It is often used to reduce database load and support low-latency features.

### Key Features

- In-memory speed.
- Rich data structures.
- Key expiration.
- Pub/Sub and Streams.
- Persistence options.
- Replication and clustering.
- Atomic operations.

---

## Why Redis Matters

| Problem | Redis Solution |
| --- | --- |
| Database reads are slow | Cache hot data |
| Session lookup must be fast | Store sessions in Redis |
| Need request throttling | Atomic counters with expiry |
| Need leaderboard | Sorted sets |
| Need lightweight event stream | Redis Streams |
| Need temporary lock | SET NX with expiry |

---

## Core Data Types

| Type | Description | Use Case |
| --- | --- | --- |
| String | Simple key-value | Cache value, token, counter |
| Hash | Object-like fields | User profile, session object |
| List | Ordered list | Queue, recent items |
| Set | Unique unordered values | Tags, unique visitors |
| Sorted Set | Unique values with score | Leaderboard, ranking |
| Stream | Append-only event log | Event processing |
| Bitmap | Bit-level operations | Feature flags, daily activity |
| HyperLogLog | Approximate unique count | Analytics |

### Example Commands

```text
SET user:1 "Amit"
GET user:1
EXPIRE user:1 3600

HSET session:123 userId 1 role admin
HGET session:123 role

ZADD leaderboard 100 "player1"
ZREVRANGE leaderboard 0 9 WITHSCORES
```

---

## Caching Patterns

### Cache-Aside

Application checks Redis first. If data is missing, it reads from the database and stores the result in Redis.

```text
App -> Redis miss -> Database -> Redis SET -> App
```

Best for read-heavy systems.

### Write-Through

Application writes data to cache and database as part of the same flow.

Best when cache should stay warm and consistent.

### Write-Behind

Application writes to cache first, and the database is updated later asynchronously.

Best for high write throughput, but it has higher data-loss risk if not designed carefully.

---

## Expiration and Eviction

### Expiration

TTL automatically removes keys after a configured time.

```text
SET otp:123456 "user:1" EX 300
TTL otp:123456
```

### Eviction

Eviction happens when Redis reaches memory limits and removes keys based on policy.

| Policy | Meaning |
| --- | --- |
| noeviction | Return error when memory is full |
| allkeys-lru | Remove least recently used keys |
| volatile-lru | Remove least recently used keys with TTL |
| allkeys-lfu | Remove least frequently used keys |
| volatile-ttl | Remove keys with shortest TTL |

### Interview Tip

TTL is planned expiration. Eviction is memory-pressure cleanup.

---

## Persistence

Redis can persist data to disk.

| Mode | Description |
| --- | --- |
| RDB | Point-in-time snapshots |
| AOF | Append-only log of write operations |
| RDB + AOF | Uses both approaches |

### Tradeoff

RDB is compact and faster to restore, but may lose recent writes. AOF is more durable, but uses more disk and can be slower.

---

## Pub/Sub and Streams

### Pub/Sub

Redis Pub/Sub sends messages to active subscribers.

```text
PUBLISH notifications "order created"
SUBSCRIBE notifications
```

If a subscriber is offline, it misses the message.

### Streams

Redis Streams store events and allow consumers to read them later.

```text
XADD orders * type created orderId 101
XREAD COUNT 10 STREAMS orders 0
```

Streams are better than Pub/Sub when durability and consumer groups matter.

---

## Distributed Locks

Redis can create simple distributed locks using `SET key value NX EX seconds`.

```text
SET lock:order:101 worker-1 NX EX 30
```

Important rules:

- Always set expiry.
- Use a unique lock value.
- Release only if the value matches.
- Keep lock duration short.
- Understand failure cases before using locks for critical financial operations.

---

## Replication and High Availability

| Feature | Description |
| --- | --- |
| Replica | Copies data from primary |
| Sentinel | Monitors Redis and performs failover |
| Cluster | Splits data across nodes using hash slots |

### Interview Tip

Replication improves read scalability and availability, but it can be eventually consistent. A write may not immediately appear on a replica.

---

## Redis vs Memcached vs Database

| Feature | Redis | Memcached | Database |
| --- | --- | --- | --- |
| Data Model | Rich structures | Simple key-value | Tables/documents |
| Persistence | Optional | No built-in persistence | Durable |
| Use Case | Cache, sessions, counters, streams | Simple cache | Source of truth |
| Querying | Key-based | Key-based | Query language |
| Speed | Very fast | Very fast | Usually slower |

### Simple Rule

Use Redis for fast temporary or derived data. Use the database as the source of truth for important business data.

---

## Best Practices

- Use clear key naming like `user:123:profile`.
- Set TTL for cache keys.
- Avoid storing huge values.
- Cache only data that is safe to regenerate.
- Use atomic commands for counters and rate limits.
- Protect Redis from public internet access.
- Monitor memory, hit rate, evictions, slow commands, and connected clients.
- Plan persistence and backup strategy if Redis stores important data.

---

## Common Interview Questions

### 1. What is Redis?

Redis is an in-memory data store used for caching, sessions, counters, queues, pub/sub, streams, and fast key-value access.

### 2. Why is Redis fast?

Redis keeps data in memory and uses efficient data structures with mostly single-threaded command execution.

### 3. What is cache-aside?

Cache-aside means the application reads from cache first, falls back to the database on a miss, then stores the result in cache.

### 4. What is the difference between TTL and eviction?

TTL removes a key after a defined time. Eviction removes keys when Redis needs memory.

### 5. Can Redis be used as a database?

It can store persistent data, but most systems use Redis as a cache or fast auxiliary store while the main database remains the source of truth.

### 6. What is Redis Streams?

Redis Streams is an append-only event log that supports durable message processing and consumer groups.

### 7. How do you implement rate limiting in Redis?

Use atomic counters with expiration, such as incrementing a key per user/IP and setting a TTL for the time window.

