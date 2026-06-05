# System Design Concepts - Interview Ready

## Table of Contents
1. [Scalability](#scalability)
2. [Load Balancing](#load-balancing)
3. [Caching](#caching)
4. [Database Design](#database-design)
5. [Microservices Architecture](#microservices-architecture)
6. [API Design](#api-design)
7. [Message Queues](#message-queues)
8. [CAP Theorem](#cap-theorem)
9. [Distributed Systems](#distributed-systems)
10. [System Design Patterns](#system-design-patterns)

---

## Scalability

**Description:** Scalability is the ability of a system to handle increased load by adding resources. It's fundamental to building systems that can grow with user demand. Understanding scalability trade-offs between vertical and horizontal scaling is crucial for system design interviews.

**Key Concepts:**
- Vertical scaling: Add more power to existing machines (scale up)
- Horizontal scaling: Add more machines (scale out)
- Stateless vs Stateful services
- Key metrics: Throughput, latency, availability, consistency
- Bottlenecks: Database, network, CPU, memory
- Load testing: Identify scaling limits

### Vertical Scaling (Scale Up)
- Adding more power (CPU, RAM) to existing machine
- **Pros**: Simple, no code changes
- **Cons**: Hardware limits, single point of failure, expensive
- **Use Case**: Legacy applications, databases requiring ACID

### Horizontal Scaling (Scale Out)
- Adding more machines to the pool
- **Pros**: No limit, fault tolerant, cost-effective
- **Cons**: Complex, requires load balancing, data consistency challenges
- **Use Case**: Web servers, stateless applications

### Key Metrics
- **Throughput**: Requests per second
- **Latency**: Response time
- **Availability**: Uptime percentage (99.9%, 99.99%)
- **Consistency**: Data accuracy across nodes

---

## Load Balancing

**Description:** Load balancers distribute incoming traffic across multiple servers to ensure no single server bears too much load. They improve availability, reliability, and performance. Understanding load balancing is essential for designing scalable distributed systems.

**Key Concepts:**
- Distributes traffic across multiple servers
- Types: Hardware, Software, DNS-based
- Algorithms: Round Robin, Least Connections, IP Hash, Weighted
- Health checks: Monitor server availability
- Session persistence: Sticky sessions for stateful apps
- Layer 4 (Transport) vs Layer 7 (Application) load balancing

### Types of Load Balancers
1. **Hardware Load Balancers**: F5, Citrix NetScaler
2. **Software Load Balancers**: Nginx, HAProxy, AWS ELB
3. **DNS Load Balancing**: Route53, CloudFlare

### Load Balancing Algorithms
- **Round Robin**: Distributes requests sequentially
- **Least Connections**: Routes to server with fewest active connections
- **IP Hash**: Routes based on client IP
- **Weighted Round Robin**: Assigns weights based on server capacity
- **Least Response Time**: Routes to fastest responding server

### Health Checks
- Active monitoring of backend servers
- Automatic removal of unhealthy instances
- Graceful degradation

---

## Caching

**Description:** Caching stores frequently accessed data in fast-access storage to reduce latency and database load. It's one of the most effective ways to improve system performance. Understanding caching strategies and eviction policies is crucial for optimizing applications.

**Key Concepts:**
- Multiple cache levels: Client, CDN, Application, Database
- Caching strategies: Cache-Aside, Write-Through, Write-Behind, Refresh-Ahead
- Eviction policies: LRU, LFU, FIFO, TTL
- Cache invalidation: Time-based, Event-based, Manual
- Cache hit ratio: Measure of cache effectiveness
- Trade-offs: Stale data vs performance

### Cache Levels
1. **Client-side**: Browser cache, localStorage
2. **CDN**: CloudFront, Cloudflare, Akamai
3. **Application**: Redis, Memcached
4. **Database**: Query cache, buffer pool

### Caching Strategies
- **Cache-Aside (Lazy Loading)**: App checks cache first, loads from DB on miss
- **Write-Through**: Write to cache and DB simultaneously
- **Write-Behind (Write-Back)**: Write to cache, async write to DB
- **Refresh-Ahead**: Proactively refresh cache before expiry

### Cache Eviction Policies
- **LRU (Least Recently Used)**: Remove least recently accessed
- **LFU (Least Frequently Used)**: Remove least frequently accessed
- **FIFO**: First In First Out
- **TTL (Time To Live)**: Expire after set time

### Cache Invalidation
- **Time-based**: TTL expiration
- **Event-based**: Invalidate on data update
- **Manual**: Explicit cache clear

---

## Database Design

**Description:** Database design involves choosing the right database type and optimizing its structure for your use case. SQL databases offer ACID guarantees and complex queries, while NoSQL databases provide flexibility and horizontal scalability. Understanding trade-offs is key to making informed decisions.

**Key Concepts:**
- SQL: ACID, structured data, complex queries, vertical scaling
- NoSQL: Flexible schema, horizontal scaling, eventual consistency
- Database optimization: Indexing, partitioning, replication, denormalization
- Sharding: Distribute data across multiple databases
- CAP theorem: Consistency, Availability, Partition tolerance
- Read vs Write optimization

### SQL vs NoSQL

#### SQL (Relational)
- **Examples**: PostgreSQL, MySQL, Oracle
- **Pros**: ACID, complex queries, relationships
- **Cons**: Vertical scaling, schema rigidity
- **Use Case**: Financial systems, ERP, CRM

#### NoSQL
- **Document**: MongoDB, CouchDB
- **Key-Value**: Redis, DynamoDB
- **Column-Family**: Cassandra, HBase
- **Graph**: Neo4j, Amazon Neptune
- **Pros**: Horizontal scaling, flexible schema
- **Cons**: Limited ACID, eventual consistency
- **Use Case**: Real-time analytics, IoT, social networks

### Database Optimization
- **Indexing**: B-tree, Hash, Full-text
- **Partitioning**: Horizontal (sharding), Vertical
- **Replication**: Master-Slave, Master-Master
- **Denormalization**: Trade storage for speed
- **Connection Pooling**: Reuse database connections

### Sharding Strategies
- **Range-based**: Partition by ID ranges
- **Hash-based**: Hash function determines shard
- **Geographic**: Partition by location
- **Directory-based**: Lookup table for routing

---

## Microservices Architecture

**Description:** Microservices architecture breaks applications into small, independent services that communicate over networks. Each service is independently deployable and scalable. This approach enables faster development, better fault isolation, and technology flexibility, but adds complexity in deployment and monitoring.

**Key Concepts:**
- Single responsibility: Each service does one thing well
- Independent deployment and scaling
- Decentralized data management
- Communication: Synchronous (REST, gRPC) vs Asynchronous (Message queues)
- Challenges: Distributed transactions, service discovery, monitoring
- Patterns: API Gateway, Service Mesh, Circuit Breaker, Saga

### Characteristics
- **Single Responsibility**: Each service does one thing
- **Independently Deployable**: Deploy without affecting others
- **Decentralized Data**: Each service owns its data
- **Technology Agnostic**: Use different tech stacks

### Communication Patterns
- **Synchronous**: REST, gRPC
- **Asynchronous**: Message queues, Event streaming
- **Service Mesh**: Istio, Linkerd

### Challenges
- **Distributed Transactions**: Saga pattern, 2PC
- **Service Discovery**: Consul, Eureka, Kubernetes DNS
- **API Gateway**: Kong, AWS API Gateway, Nginx
- **Monitoring**: Distributed tracing (Jaeger, Zipkin)
- **Data Consistency**: Eventual consistency, CQRS

---

## API Design

**Description:** API design defines how services communicate with each other and with clients. Well-designed APIs are intuitive, consistent, and versioned. REST is the most common, GraphQL offers flexibility, and gRPC provides high performance. Understanding API design principles is crucial for building maintainable systems.

**Key Concepts:**
- REST: Resource-based, HTTP methods, stateless
- GraphQL: Single endpoint, flexible queries, no over-fetching
- gRPC: Binary protocol, high performance, streaming support
- Best practices: Versioning, pagination, error handling, documentation
- Security: Authentication, authorization, rate limiting
- API Gateway: Single entry point, routing, authentication

### REST API Best Practices
- **Resource-based URLs**: `/users`, `/orders`
- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE
- **Status Codes**: 200, 201, 400, 401, 404, 500
- **Versioning**: `/v1/users`, header-based
- **Pagination**: Limit, offset, cursor-based
- **Filtering & Sorting**: Query parameters
- **HATEOAS**: Hypermedia links in responses

### GraphQL
- **Single Endpoint**: Query exactly what you need
- **Type System**: Strong typing, schema validation
- **Real-time**: Subscriptions for live data
- **Pros**: No over-fetching, flexible queries
- **Cons**: Complexity, caching challenges

### gRPC
- **Protocol Buffers**: Binary serialization
- **HTTP/2**: Multiplexing, streaming
- **Use Case**: Microservices, high-performance APIs

---

## Message Queues

**Description:** Message queues enable asynchronous communication between services by storing messages until they're processed. They decouple services, improve reliability, and handle traffic spikes. Understanding message queues is essential for building resilient distributed systems.

**Key Concepts:**
- Asynchronous communication between services
- Patterns: Point-to-Point, Publish-Subscribe, Request-Reply
- Benefits: Decoupling, load leveling, reliability, scalability
- Popular solutions: RabbitMQ, Kafka, AWS SQS/SNS, Redis Pub/Sub
- Message persistence and delivery guarantees
- Dead letter queues for failed messages

### Popular Solutions
- **RabbitMQ**: AMQP protocol, complex routing
- **Apache Kafka**: High throughput, event streaming
- **AWS SQS/SNS**: Managed, scalable
- **Redis Pub/Sub**: Simple, fast

### Patterns
- **Point-to-Point**: Queue, single consumer
- **Publish-Subscribe**: Topic, multiple consumers
- **Request-Reply**: Synchronous-like async
- **Dead Letter Queue**: Handle failed messages

### Benefits
- **Decoupling**: Services don't need to know each other
- **Asynchronous Processing**: Non-blocking operations
- **Load Leveling**: Smooth traffic spikes
- **Reliability**: Message persistence, retry logic

---

## CAP Theorem

**Description:** CAP Theorem states that distributed systems can only guarantee two of three properties: Consistency, Availability, and Partition Tolerance. Since network partitions are inevitable, systems must choose between consistency and availability. Understanding CAP helps make informed database and architecture decisions.

**Key Concepts:**
- Consistency: All nodes see same data simultaneously
- Availability: Every request gets a response
- Partition Tolerance: System works despite network failures
- Trade-offs: CP (MongoDB, HBase) vs AP (Cassandra, DynamoDB)
- In practice: Choose based on business requirements
- PACELC: Extension considering latency and consistency

**You can only guarantee 2 out of 3:**

### Consistency (C)
- All nodes see the same data at the same time
- **Example**: Traditional RDBMS

### Availability (A)
- Every request receives a response
- **Example**: Cassandra, DynamoDB

### Partition Tolerance (P)
- System continues despite network failures
- **Required** in distributed systems

### Trade-offs
- **CP Systems**: MongoDB, HBase (sacrifice availability)
- **AP Systems**: Cassandra, CouchDB (sacrifice consistency)
- **CA Systems**: PostgreSQL (not partition tolerant)

---

## Distributed Systems

**Description:** Distributed systems consist of multiple computers working together as a single system. They provide scalability and fault tolerance but introduce complexity in coordination, consistency, and failure handling. Understanding distributed systems concepts is crucial for designing large-scale applications.

**Key Concepts:**
- Consensus algorithms: Paxos, Raft for agreement
- Distributed transactions: 2PC, Saga pattern, Event Sourcing
- Challenges: Network latency, partial failures, clock synchronization
- Consistency models: Strong, eventual, causal consistency
- Replication: Master-slave, multi-master
- Distributed locks and coordination

### Consensus Algorithms
- **Paxos**: Complex, proven
- **Raft**: Simpler, understandable
- **Use Case**: Leader election, distributed locks

### Distributed Transactions
- **2-Phase Commit (2PC)**: Blocking, coordinator-based
- **Saga Pattern**: Compensating transactions
- **Event Sourcing**: Store events, rebuild state

### Challenges
- **Network Latency**: Geographic distribution
- **Partial Failures**: Some nodes fail
- **Clock Synchronization**: NTP, logical clocks
- **Data Consistency**: Eventual consistency models

---

## System Design Patterns

**Description**: System design patterns are proven solutions to common architectural challenges in distributed systems. These patterns help build resilient, scalable, and maintainable systems by addressing specific problems like failure handling, resource management, and data consistency. Understanding these patterns is crucial for designing robust production systems.

**Key Concepts**:
- **Resilience Patterns**: Circuit breaker, bulkhead, retry mechanisms
- **Rate Control**: Token bucket, leaky bucket, sliding window algorithms
- **Data Patterns**: CQRS, event sourcing, saga pattern
- **Failure Handling**: Graceful degradation, fallback strategies

### Circuit Breaker
- Prevent cascading failures
- States: Closed, Open, Half-Open
- **Example**: Netflix Hystrix, Resilience4j

### Rate Limiting
- **Token Bucket**: Smooth rate limiting
- **Leaky Bucket**: Fixed rate processing
- **Fixed Window**: Simple, can have bursts
- **Sliding Window**: More accurate

### Bulkhead
- Isolate resources to prevent total failure
- Thread pools, connection pools

### Retry with Exponential Backoff
- Retry failed requests with increasing delays
- Prevent overwhelming failing services

### CQRS (Command Query Responsibility Segregation)
- Separate read and write models
- Optimize each independently

### Event Sourcing
- Store state changes as events
- Rebuild state by replaying events
- Audit trail, time travel

---

## Common System Design Interview Questions

**Description**: System design interviews assess your ability to design large-scale distributed systems. These questions test your understanding of scalability, reliability, performance optimization, and trade-offs. Common scenarios include designing popular services like URL shorteners, social media platforms, and streaming services.

**Key Concepts**:
- **Requirements Analysis**: Functional and non-functional requirements
- **Scale Estimation**: Users, requests, storage, bandwidth calculations
- **Component Design**: Services, databases, caches, load balancers
- **Trade-offs**: Consistency vs availability, latency vs throughput

### Design URL Shortener (bit.ly)
- **Requirements**: Shorten URL, redirect, analytics
- **Components**: Hash function, database, cache, load balancer
- **Scale**: Billions of URLs, high read:write ratio

### Design Twitter/Social Media Feed
- **Requirements**: Post tweets, follow users, timeline
- **Components**: User service, tweet service, timeline service, cache
- **Scale**: Millions of users, real-time updates

### Design Netflix/Video Streaming
- **Requirements**: Upload, encode, stream, recommendations
- **Components**: CDN, encoding service, metadata DB, recommendation engine
- **Scale**: Petabytes of data, global distribution

### Design Uber/Ride Sharing
- **Requirements**: Match riders/drivers, real-time location, pricing
- **Components**: Location service, matching algorithm, payment service
- **Scale**: Real-time, geospatial queries

### Design WhatsApp/Chat Application
- **Requirements**: 1-1 chat, group chat, media sharing, online status
- **Components**: WebSocket server, message queue, media storage
- **Scale**: Billions of messages, low latency

### Design E-commerce Platform (Amazon)
- **Requirements**: Product catalog, cart, checkout, inventory
- **Components**: Product service, order service, payment gateway, inventory
- **Scale**: High availability, ACID transactions

---

## Interview Approach

**Description**: A structured approach to system design interviews helps you communicate effectively and demonstrate your problem-solving skills. This framework ensures you cover all important aspects of system design while managing time efficiently during the interview.

**Key Concepts**:
- **Clarification**: Understand requirements and constraints
- **Estimation**: Calculate scale and capacity needs
- **Design**: Create high-level architecture and detailed components
- **Discussion**: Address bottlenecks, trade-offs, and improvements

### 1. Requirements Clarification (5 min)
- Functional requirements
- Non-functional requirements (scale, performance)
- Constraints and assumptions

### 2. Capacity Estimation (5 min)
- Users, requests per second
- Storage requirements
- Bandwidth calculations

### 3. High-Level Design (10 min)
- Draw major components
- Data flow between components
- API design

### 4. Deep Dive (15 min)
- Database schema
- Scaling strategies
- Bottlenecks and solutions
- Trade-offs

### 5. Wrap Up (5 min)
- Monitoring and alerting
- Security considerations
- Future enhancements

---

## Key Metrics to Remember

**Description**: Understanding key performance metrics and latency numbers is essential for making informed design decisions. These numbers help you estimate system capacity, identify bottlenecks, and choose appropriate technologies for your architecture.

**Key Concepts**:
- **Latency Hierarchy**: From nanoseconds (cache) to milliseconds (network)
- **Availability Targets**: SLA requirements and downtime calculations
- **Scale Estimates**: Request rates, storage needs, bandwidth requirements
- **Use Cases**: Capacity planning, performance optimization, technology selection

### Latency Numbers
- L1 cache: 0.5 ns
- L2 cache: 7 ns
- RAM: 100 ns
- SSD: 150 μs
- HDD: 10 ms
- Network (same datacenter): 0.5 ms
- Network (cross-continent): 150 ms

### Availability
- 99% = 3.65 days downtime/year
- 99.9% = 8.76 hours downtime/year
- 99.99% = 52.56 minutes downtime/year
- 99.999% = 5.26 minutes downtime/year

### Scale Numbers
- 1 million requests/day = ~12 requests/second
- 1 billion requests/day = ~12,000 requests/second
- 1 GB = 1 billion bytes
- 1 TB = 1 trillion bytes

---

## Resources
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Designing Data-Intensive Applications](https://dataintensive.net/)
- [High Scalability Blog](http://highscalability.com/)