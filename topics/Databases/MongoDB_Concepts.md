# MongoDB Concepts - Interview Ready

## Table of Contents
1. [Introduction to MongoDB](#introduction-to-mongodb)
2. [Data Modeling](#data-modeling)
3. [CRUD Operations](#crud-operations)
4. [Querying](#querying)
5. [Indexes](#indexes)
6. [Aggregation Framework](#aggregation-framework)
7. [Transactions](#transactions)
8. [Replication](#replication)
9. [Sharding](#sharding)
10. [Performance Optimization](#performance-optimization)
11. [Security](#security)
12. [Common Interview Questions](#common-interview-questions)

---

## Introduction to MongoDB

### What is MongoDB?
- NoSQL document-oriented database
- Stores data in flexible, JSON-like documents (BSON)
- Schema-less (flexible schema)
- Horizontally scalable
- High performance for read/write operations

### Key Features
- **Document-Oriented**: Data stored as documents
- **Schema Flexibility**: No fixed schema required
- **Scalability**: Horizontal scaling via sharding
- **High Performance**: Optimized for speed
- **Rich Query Language**: Powerful query capabilities
- **Indexing**: Support for various index types
- **Aggregation**: Built-in aggregation framework
- **Replication**: High availability with replica sets
- **GridFS**: Store large files

### MongoDB vs SQL

| Feature | MongoDB | SQL (PostgreSQL/MySQL) |
|---------|---------|------------------------|
| **Data Model** | Document (JSON-like) | Tables with rows |
| **Schema** | Flexible | Fixed |
| **Relationships** | Embedded or referenced | Foreign keys |
| **Scalability** | Horizontal (sharding) | Vertical (mainly) |
| **Transactions** | Multi-document (4.0+) | ACID compliant |
| **Query Language** | MongoDB Query Language | SQL |
| **Use Case** | Flexible data, rapid development | Complex relationships, ACID |

### When to Use MongoDB
✅ **Good For:**
- Rapid application development
- Flexible/evolving schemas
- Large volumes of unstructured data
- Real-time analytics
- Content management systems
- IoT applications
- Mobile applications

❌ **Not Ideal For:**
- Complex transactions
- Complex joins
- Financial systems requiring strict ACID
- Legacy systems with fixed schemas

---

## Data Modeling

### Document Structure
```javascript
// User document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "john_doe",
  email: "john@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    zipcode: "10001"
  },
  hobbies: ["reading", "coding", "gaming"],
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

### Embedded Documents (Denormalization)
```javascript
// Blog post with embedded comments
{
  _id: ObjectId("..."),
  title: "Introduction to MongoDB",
  content: "MongoDB is a NoSQL database...",
  author: {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com"
  },
  comments: [
    {
      _id: ObjectId("..."),
      text: "Great article!",
      author: "Jane Smith",
      createdAt: ISODate("2024-01-15T11:00:00Z")
    },
    {
      _id: ObjectId("..."),
      text: "Very helpful!",
      author: "Bob Johnson",
      createdAt: ISODate("2024-01-15T12:00:00Z")
    }
  ],
  tags: ["mongodb", "nosql", "database"],
  createdAt: ISODate("2024-01-15T10:00:00Z")
}
```

### Referenced Documents (Normalization)
```javascript
// Users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "john_doe",
  email: "john@example.com"
}

// Posts collection
{
  _id: ObjectId("507f191e810c19729de860ea"),
  title: "Introduction to MongoDB",
  content: "MongoDB is a NoSQL database...",
  authorId: ObjectId("507f1f77bcf86cd799439011"), // Reference to user
  createdAt: ISODate("2024-01-15T10:00:00Z")
}
```

### Design Patterns

#### One-to-One (Embedded)
```javascript
{
  _id: ObjectId("..."),
  username: "john_doe",
  profile: {
    bio: "Software developer",
    avatar: "avatar.jpg",
    website: "https://johndoe.com"
  }
}
```

#### One-to-Many (Embedded)
```javascript
{
  _id: ObjectId("..."),
  title: "Blog Post",
  comments: [
    { text: "Comment 1", author: "User1" },
    { text: "Comment 2", author: "User2" }
  ]
}
```

#### One-to-Many (Referenced)
```javascript
// Parent
{
  _id: ObjectId("..."),
  name: "Category"
}

// Children
{
  _id: ObjectId("..."),
  title: "Product 1",
  categoryId: ObjectId("...") // Reference
}
```

#### Many-to-Many
```javascript
// Students
{
  _id: ObjectId("..."),
  name: "John",
  courseIds: [ObjectId("..."), ObjectId("...")] // Array of references
}

// Courses
{
  _id: ObjectId("..."),
  title: "MongoDB Course",
  studentIds: [ObjectId("..."), ObjectId("...")] // Array of references
}
```

---

## CRUD Operations

### Create (Insert)

#### Insert One
```javascript
db.users.insertOne({
  username: "john_doe",
  email: "john@example.com",
  age: 30,
  createdAt: new Date()
});

// Returns: { acknowledged: true, insertedId: ObjectId("...") }
```

#### Insert Many
```javascript
db.users.insertMany([
  {
    username: "jane_doe",
    email: "jane@example.com",
    age: 28
  },
  {
    username: "bob_smith",
    email: "bob@example.com",
    age: 35
  }
]);

// Returns: { acknowledged: true, insertedIds: { '0': ObjectId("..."), '1': ObjectId("...") } }
```

### Read (Find)

#### Find All
```javascript
db.users.find();
db.users.find().pretty(); // Formatted output
```

#### Find with Filter
```javascript
// Equality
db.users.find({ username: "john_doe" });

// Comparison operators
db.users.find({ age: { $gt: 25 } }); // Greater than
db.users.find({ age: { $gte: 25 } }); // Greater than or equal
db.users.find({ age: { $lt: 30 } }); // Less than
db.users.find({ age: { $lte: 30 } }); // Less than or equal
db.users.find({ age: { $ne: 30 } }); // Not equal

// Multiple conditions (AND)
db.users.find({ age: { $gt: 25 }, username: "john_doe" });

// OR operator
db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { age: { $gt: 35 } }
  ]
});

// IN operator
db.users.find({ age: { $in: [25, 30, 35] } });

// NOT IN operator
db.users.find({ age: { $nin: [25, 30, 35] } });
```

#### Find One
```javascript
db.users.findOne({ username: "john_doe" });
```

#### Projection (Select Fields)
```javascript
// Include specific fields
db.users.find({}, { username: 1, email: 1 });

// Exclude specific fields
db.users.find({}, { password: 0 });

// Exclude _id
db.users.find({}, { username: 1, email: 1, _id: 0 });
```

#### Sorting
```javascript
// Ascending
db.users.find().sort({ age: 1 });

// Descending
db.users.find().sort({ age: -1 });

// Multiple fields
db.users.find().sort({ age: -1, username: 1 });
```

#### Limit & Skip
```javascript
// Limit
db.users.find().limit(10);

// Skip
db.users.find().skip(20);

// Pagination
db.users.find().skip(20).limit(10); // Page 3, 10 per page
```

#### Count
```javascript
db.users.countDocuments();
db.users.countDocuments({ age: { $gt: 25 } });
```

### Update

#### Update One
```javascript
db.users.updateOne(
  { username: "john_doe" }, // Filter
  { $set: { age: 31, updatedAt: new Date() } } // Update
);

// Returns: { acknowledged: true, matchedCount: 1, modifiedCount: 1 }
```

#### Update Many
```javascript
db.users.updateMany(
  { age: { $lt: 25 } },
  { $set: { status: "young" } }
);
```

#### Update Operators
```javascript
// $set: Set field value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { email: "newemail@example.com" } }
);

// $unset: Remove field
db.users.updateOne(
  { _id: ObjectId("...") },
  { $unset: { age: "" } }
);

// $inc: Increment value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { age: 1 } }
);

// $mul: Multiply value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $mul: { score: 2 } }
);

// $rename: Rename field
db.users.updateOne(
  { _id: ObjectId("...") },
  { $rename: { "name": "fullName" } }
);

// $min: Update if new value is less
db.users.updateOne(
  { _id: ObjectId("...") },
  { $min: { lowestScore: 50 } }
);

// $max: Update if new value is greater
db.users.updateOne(
  { _id: ObjectId("...") },
  { $max: { highestScore: 100 } }
);

// $currentDate: Set to current date
db.users.updateOne(
  { _id: ObjectId("...") },
  { $currentDate: { lastModified: true } }
);
```

#### Array Update Operators
```javascript
// $push: Add element to array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { hobbies: "swimming" } }
);

// $push with $each: Add multiple elements
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { hobbies: { $each: ["swimming", "cycling"] } } }
);

// $pull: Remove element from array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $pull: { hobbies: "gaming" } }
);

// $pop: Remove first or last element
db.users.updateOne(
  { _id: ObjectId("...") },
  { $pop: { hobbies: 1 } } // 1 for last, -1 for first
);

// $addToSet: Add if not exists
db.users.updateOne(
  { _id: ObjectId("...") },
  { $addToSet: { hobbies: "reading" } }
);
```

#### Replace One
```javascript
db.users.replaceOne(
  { username: "john_doe" },
  {
    username: "john_doe",
    email: "john@example.com",
    age: 31,
    updatedAt: new Date()
  }
);
```

#### Upsert (Update or Insert)
```javascript
db.users.updateOne(
  { username: "new_user" },
  { $set: { email: "new@example.com", age: 25 } },
  { upsert: true }
);
```

### Delete

#### Delete One
```javascript
db.users.deleteOne({ username: "john_doe" });

// Returns: { acknowledged: true, deletedCount: 1 }
```

#### Delete Many
```javascript
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents
db.users.deleteMany({});
```

---

## Querying

### Query Operators

#### Comparison
```javascript
$eq   // Equal
$ne   // Not equal
$gt   // Greater than
$gte  // Greater than or equal
$lt   // Less than
$lte  // Less than or equal
$in   // In array
$nin  // Not in array
```

#### Logical
```javascript
// $and
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { age: { $lte: 35 } }
  ]
});

// $or
db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { age: { $gt: 35 } }
  ]
});

// $not
db.users.find({ age: { $not: { $gt: 30 } } });

// $nor
db.users.find({
  $nor: [
    { age: { $lt: 25 } },
    { status: "inactive" }
  ]
});
```

#### Element
```javascript
// $exists: Check if field exists
db.users.find({ email: { $exists: true } });

// $type: Check field type
db.users.find({ age: { $type: "number" } });
db.users.find({ age: { $type: "string" } });
```

#### Array
```javascript
// $all: Match all elements
db.users.find({ hobbies: { $all: ["reading", "coding"] } });

// $elemMatch: Match array element
db.users.find({
  scores: { $elemMatch: { $gte: 80, $lt: 90 } }
});

// $size: Match array size
db.users.find({ hobbies: { $size: 3 } });
```

#### String
```javascript
// $regex: Regular expression
db.users.find({ username: { $regex: /^john/ } });
db.users.find({ username: { $regex: /^john/i } }); // Case-insensitive

// Text search (requires text index)
db.users.createIndex({ bio: "text" });
db.users.find({ $text: { $search: "developer" } });
```

### Nested Documents
```javascript
// Dot notation
db.users.find({ "address.city": "New York" });

// Exact match
db.users.find({
  address: {
    street: "123 Main St",
    city: "New York",
    zipcode: "10001"
  }
});
```

### Array Queries
```javascript
// Match any element
db.users.find({ hobbies: "reading" });

// Match exact array
db.users.find({ hobbies: ["reading", "coding"] });

// Array element by index
db.users.find({ "hobbies.0": "reading" });
```

---

## Indexes

### Types of Indexes

#### Single Field Index
```javascript
// Create index
db.users.createIndex({ username: 1 }); // 1 for ascending, -1 for descending

// Create unique index
db.users.createIndex({ email: 1 }, { unique: true });
```

#### Compound Index
```javascript
db.users.createIndex({ age: 1, username: 1 });
```

#### Multikey Index (Arrays)
```javascript
db.users.createIndex({ hobbies: 1 });
```

#### Text Index
```javascript
db.posts.createIndex({ title: "text", content: "text" });

// Search
db.posts.find({ $text: { $search: "mongodb tutorial" } });

// Text score
db.posts.find(
  { $text: { $search: "mongodb" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

#### Geospatial Index
```javascript
// 2dsphere index for GeoJSON
db.places.createIndex({ location: "2dsphere" });

// Find nearby
db.places.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-73.9667, 40.78]
      },
      $maxDistance: 1000 // meters
    }
  }
});
```

#### Hashed Index
```javascript
db.users.createIndex({ _id: "hashed" });
```

### Index Management
```javascript
// List indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex("username_1");
db.users.dropIndex({ username: 1 });

// Drop all indexes (except _id)
db.users.dropIndexes();

// Index statistics
db.users.stats();
```

### Index Properties
```javascript
// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Sparse index (only index documents with the field)
db.users.createIndex({ email: 1 }, { sparse: true });

// TTL index (auto-delete after time)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 } // 1 hour
);

// Partial index (conditional)
db.users.createIndex(
  { age: 1 },
  { partialFilterExpression: { age: { $gte: 18 } } }
);

// Background index (non-blocking)
db.users.createIndex({ username: 1 }, { background: true });
```

---

## Aggregation Framework

### Pipeline Stages

#### $match (Filter)
```javascript
db.orders.aggregate([
  { $match: { status: "completed" } }
]);
```

#### $group (Group By)
```javascript
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalAmount: { $sum: "$amount" },
      orderCount: { $sum: 1 },
      avgAmount: { $avg: "$amount" }
    }
  }
]);
```

#### $project (Select Fields)
```javascript
db.users.aggregate([
  {
    $project: {
      username: 1,
      email: 1,
      fullName: { $concat: ["$firstName", " ", "$lastName"] }
    }
  }
]);
```

#### $sort
```javascript
db.users.aggregate([
  { $sort: { age: -1 } }
]);
```

#### $limit & $skip
```javascript
db.users.aggregate([
  { $skip: 10 },
  { $limit: 5 }
]);
```

#### $lookup (Join)
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }
]);
```

#### $unwind (Flatten Array)
```javascript
db.users.aggregate([
  { $unwind: "$hobbies" }
]);
```

#### $addFields
```javascript
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$firstName", " ", "$lastName"] }
    }
  }
]);
```

### Aggregation Operators

#### Arithmetic
```javascript
$add, $subtract, $multiply, $divide, $mod
```

#### String
```javascript
$concat, $substr, $toLower, $toUpper, $split
```

#### Array
```javascript
$size, $slice, $arrayElemAt, $filter, $map
```

#### Date
```javascript
$year, $month, $dayOfMonth, $hour, $minute, $second
```

### Complex Aggregation Example
```javascript
db.orders.aggregate([
  // Stage 1: Filter
  { $match: { status: "completed" } },
  
  // Stage 2: Join with users
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  
  // Stage 3: Unwind user array
  { $unwind: "$user" },
  
  // Stage 4: Group by user
  {
    $group: {
      _id: "$userId",
      username: { $first: "$user.username" },
      totalSpent: { $sum: "$amount" },
      orderCount: { $sum: 1 },
      avgOrderAmount: { $avg: "$amount" }
    }
  },
  
  // Stage 5: Sort by total spent
  { $sort: { totalSpent: -1 } },
  
  // Stage 6: Limit results
  { $limit: 10 }
]);
```

---

## Transactions

### Multi-Document Transactions (MongoDB 4.0+)
```javascript
const session = db.getMongo().startSession();
session.startTransaction();

try {
  const usersCollection = session.getDatabase("mydb").users;
  const accountsCollection = session.getDatabase("mydb").accounts;
  
  // Deduct from sender
  usersCollection.updateOne(
    { _id: senderId },
    { $inc: { balance: -amount } },
    { session }
  );
  
  // Add to receiver
  usersCollection.updateOne(
    { _id: receiverId },
    { $inc: { balance: amount } },
    { session }
  );
  
  // Commit transaction
  session.commitTransaction();
} catch (error) {
  // Rollback on error
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

### Using Node.js Driver
```javascript
const { MongoClient } = require('mongodb');

async function transferMoney(senderId, receiverId, amount) {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  
  const session = client.startSession();
  
  try {
    await session.withTransaction(async () => {
      const users = client.db('mydb').collection('users');
      
      await users.updateOne(
        { _id: senderId },
        { $inc: { balance: -amount } },
        { session }
      );
      
      await users.updateOne(
        { _id: receiverId },
        { $inc: { balance: amount } },
        { session }
      );
    });
  } finally {
    await session.endSession();
    await client.close();
  }
}
```

---

## Replication

### Replica Set
A group of MongoDB instances that maintain the same data set.

#### Components
- **Primary**: Receives all write operations
- **Secondary**: Replicate primary's data
- **Arbiter**: Participates in elections but doesn't hold data

#### Setup Replica Set
```javascript
// Initialize replica set
rs.initiate({
  _id: "myReplicaSet",
  members: [
    { _id: 0, host: "mongodb0.example.net:27017" },
    { _id: 1, host: "mongodb1.example.net:27017" },
    { _id: 2, host: "mongodb2.example.net:27017" }
  ]
});

// Check status
rs.status();

// Add member
rs.add("mongodb3.example.net:27017");

// Remove member
rs.remove("mongodb3.example.net:27017");
```

#### Read Preference
```javascript
// Primary (default)
db.users.find().readPref("primary");

// Primary preferred
db.users.find().readPref("primaryPreferred");

// Secondary
db.users.find().readPref("secondary");

// Secondary preferred
db.users.find().readPref("secondaryPreferred");

// Nearest
db.users.find().readPref("nearest");
```

---

## Sharding

### What is Sharding?
Horizontal partitioning of data across multiple servers.

#### Components
- **Shard**: Holds subset of data
- **Config Server**: Stores metadata
- **Mongos**: Query router

#### Enable Sharding
```javascript
// Enable sharding for database
sh.enableSharding("mydb");

// Shard collection
sh.shardCollection("mydb.users", { _id: "hashed" });

// Shard with range
sh.shardCollection("mydb.orders", { customerId: 1 });

// Check sharding status
sh.status();
```

#### Shard Key Selection
- **Hashed**: Even distribution
- **Range**: Query optimization
- **Compound**: Balance both

---

## Performance Optimization

### Query Optimization
```javascript
// Use explain to analyze query
db.users.find({ age: { $gt: 25 } }).explain("executionStats");

// Create appropriate indexes
db.users.createIndex({ age: 1 });

// Use projection to limit fields
db.users.find({}, { username: 1, email: 1 });

// Use limit
db.users.find().limit(100);
```

### Index Optimization
```javascript
// Analyze index usage
db.users.aggregate([
  { $indexStats: {} }
]);

// Remove unused indexes
db.users.dropIndex("unused_index");
```

### Connection Pooling
```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', {
  maxPoolSize: 50,
  minPoolSize: 10
});
```

### Bulk Operations
```javascript
// Bulk insert
db.users.insertMany([
  { username: "user1", email: "user1@example.com" },
  { username: "user2", email: "user2@example.com" }
], { ordered: false }); // Parallel execution

// Bulk write
db.users.bulkWrite([
  { insertOne: { document: { username: "user3" } } },
  { updateOne: { filter: { username: "user1" }, update: { $set: { age: 30 } } } },
  { deleteOne: { filter: { username: "user2" } } }
]);
```

---

## Security

### Authentication
```javascript
// Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
});

// Create database user
use mydb
db.createUser({
  user: "appUser",
  pwd: "appPassword",
  roles: [ { role: "readWrite", db: "mydb" } ]
});

// Connect with authentication
mongo -u admin -p securePassword --authenticationDatabase admin
```

### Authorization (Roles)
```javascript
// Built-in roles
read, readWrite, dbAdmin, userAdmin, clusterAdmin

// Create custom role
db.createRole({
  role: "customRole",
  privileges: [
    {
      resource: { db: "mydb", collection: "users" },
      actions: [ "find", "insert", "update" ]
    }
  ],
  roles: []
});

// Grant role to user
db.grantRolesToUser("appUser", [ "customRole" ]);
```

### Encryption
```javascript
// Enable encryption at rest (mongod.conf)
security:
  enableEncryption: true
  encryptionKeyFile: /path/to/keyfile

// TLS/SSL
net:
  ssl:
    mode: requireSSL
    PEMKeyFile: /path/to/certificate.pem
```

---

## Common Interview Questions

### 1. What is MongoDB and when should you use it?
MongoDB is a NoSQL document database. Use it for flexible schemas, rapid development, horizontal scaling, and handling large volumes of unstructured data.

### 2. Explain the difference between embedding and referencing
- **Embedding**: Store related data in a single document (denormalization)
- **Referencing**: Store references to documents in other collections (normalization)

### 3. What is sharding in MongoDB?
Sharding is horizontal partitioning of data across multiple servers for scalability.

### 4. Explain replica sets
A replica set is a group of MongoDB instances that maintain the same data for high availability and redundancy.

### 5. What are indexes and why are they important?
Indexes improve query performance by creating data structures that allow faster lookups. Without indexes, MongoDB must scan every document.

### 6. What is the aggregation framework?
A pipeline-based framework for data processing and transformation, similar to SQL GROUP BY but more powerful.

### 7. How does MongoDB ensure ACID properties?
MongoDB supports multi-document ACID transactions (4.0+) within replica sets and sharded clusters.

### 8. What is the difference between find() and aggregate()?
- **find()**: Simple queries with filtering, sorting, projection
- **aggregate()**: Complex data processing with multiple pipeline stages

### 9. Explain the _id field
Every document has a unique _id field. If not provided, MongoDB generates an ObjectId automatically.

### 10. What is BSON?
Binary JSON - MongoDB's internal data format that extends JSON with additional types like Date, ObjectId, Binary data.

---

## Best Practices

### Schema Design
- Embed for one-to-one and one-to-few relationships
- Reference for one-to-many and many-to-many relationships
- Consider query patterns when designing schema
- Denormalize for read-heavy workloads

### Indexing
- Create indexes for frequently queried fields
- Use compound indexes for multiple field queries
- Monitor index usage and remove unused indexes
- Consider index size and memory usage

### Query Optimization
- Use projection to limit returned fields
- Use appropriate indexes
- Avoid large skip values
- Use aggregation for complex queries

### Connection Management
- Use connection pooling
- Reuse connections
- Set appropriate pool size

### Security
- Enable authentication
- Use role-based access control
- Encrypt data at rest and in transit
- Regular security audits

---

## Resources
- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)