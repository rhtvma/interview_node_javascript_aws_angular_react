# GraphQL Concepts - Interview Ready

## Table of Contents
1. [Introduction to GraphQL](#introduction-to-graphql)
2. [Core Concepts](#core-concepts)
3. [Schema & Types](#schema--types)
4. [Queries](#queries)
5. [Mutations](#mutations)
6. [Subscriptions](#subscriptions)
7. [Resolvers](#resolvers)
8. [GraphQL vs REST](#graphql-vs-rest)
9. [Best Practices](#best-practices)
10. [Performance & Optimization](#performance--optimization)

---

## Introduction to GraphQL

### What is GraphQL?
- Query language for APIs developed by Facebook (2012)
- Allows clients to request exactly the data they need
- Single endpoint for all operations
- Strongly typed schema

### Key Benefits
- **No Over-fetching**: Get only requested fields
- **No Under-fetching**: Get all data in single request
- **Strongly Typed**: Schema validation at compile time
- **Self-documenting**: Schema serves as documentation
- **Versioning**: No need for API versioning

### When to Use GraphQL
✅ **Good For:**
- Complex data requirements
- Multiple clients (web, mobile, IoT)
- Rapid frontend development
- Microservices aggregation

❌ **Not Ideal For:**
- Simple CRUD operations
- File uploads (use REST)
- Real-time with simple pub/sub (WebSocket might be simpler)
- Caching requirements (REST caching is easier)

---

## Core Concepts

### The GraphQL Request Flow
```
Client → Query → GraphQL Server → Resolvers → Data Sources → Response
```

### Three Operation Types
1. **Query**: Read data (like GET)
2. **Mutation**: Write data (like POST/PUT/DELETE)
3. **Subscription**: Real-time data (WebSocket)

### Schema Definition Language (SDL)
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}
```

---

## Schema & Types

### Scalar Types
```graphql
# Built-in Scalars
Int       # Signed 32-bit integer
Float     # Signed double-precision floating-point
String    # UTF-8 character sequence
Boolean   # true or false
ID        # Unique identifier (serialized as String)
```

### Custom Scalar Types
```graphql
scalar Date
scalar DateTime
scalar Email
scalar URL
scalar JSON
```

### Object Types
```graphql
type User {
  id: ID!
  name: String!
  age: Int
  email: String!
  posts: [Post!]!
}
```

### Input Types
```graphql
input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}
```

### Enum Types
```graphql
enum Role {
  ADMIN
  USER
  GUEST
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

### Interface Types
```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

type Post implements Node {
  id: ID!
  title: String!
}
```

### Union Types
```graphql
union SearchResult = User | Post | Comment

type Query {
  search(text: String!): [SearchResult!]!
}
```

### Non-Null & Lists
```graphql
type User {
  name: String!        # Required field
  email: String        # Optional field
  posts: [Post!]!      # Required list of required Posts
  friends: [User!]     # Optional list of required Users
  tags: [String]       # Optional list of optional Strings
}
```

---

## Queries

### Basic Query
```graphql
query {
  user(id: "1") {
    id
    name
    email
  }
}
```

### Named Query with Variables
```graphql
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    posts {
      id
      title
    }
  }
}

# Variables
{
  "userId": "1"
}
```

### Aliases
```graphql
query {
  user1: user(id: "1") {
    name
  }
  user2: user(id: "2") {
    name
  }
}
```

### Fragments
```graphql
fragment UserFields on User {
  id
  name
  email
}

query {
  user(id: "1") {
    ...UserFields
    posts {
      title
    }
  }
}
```

### Inline Fragments (for Unions/Interfaces)
```graphql
query {
  search(text: "graphql") {
    ... on User {
      name
      email
    }
    ... on Post {
      title
      content
    }
  }
}
```

### Directives
```graphql
query GetUser($withEmail: Boolean!) {
  user(id: "1") {
    name
    email @include(if: $withEmail)
    phone @skip(if: $withEmail)
  }
}
```

### Pagination
```graphql
# Offset-based
query {
  posts(limit: 10, offset: 20) {
    id
    title
  }
}

# Cursor-based (Relay style)
query {
  posts(first: 10, after: "cursor123") {
    edges {
      node {
        id
        title
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

---

## Mutations

### Basic Mutation
```graphql
mutation {
  createUser(input: {
    name: "John Doe"
    email: "john@example.com"
  }) {
    id
    name
    email
  }
}
```

### Mutation with Variables
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    name
    email
  }
}

# Variables
{
  "input": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Multiple Mutations
```graphql
mutation {
  createUser(input: { name: "John" }) {
    id
  }
  createPost(input: { title: "Hello" }) {
    id
  }
}
```

### Update Mutation
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
  }
}
```

### Delete Mutation
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    success
    message
  }
}
```

---

## Subscriptions

### Schema Definition
```graphql
type Subscription {
  postAdded: Post!
  userUpdated(userId: ID!): User!
  messageReceived(chatId: ID!): Message!
}
```

### Client Subscription
```graphql
subscription {
  postAdded {
    id
    title
    author {
      name
    }
  }
}
```

### Implementation (Node.js)
```javascript
// Server-side with Apollo Server
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(['POST_ADDED'])
    }
  },
  Mutation: {
    createPost: async (_, { input }) => {
      const post = await createPost(input);
      pubsub.publish('POST_ADDED', { postAdded: post });
      return post;
    }
  }
};
```

---

## Resolvers

### Basic Resolver Structure
```javascript
const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return getUserById(args.id);
    },
    users: () => {
      return getAllUsers();
    }
  },
  
  Mutation: {
    createUser: (parent, { input }, context) => {
      return createUser(input);
    }
  },
  
  User: {
    posts: (parent) => {
      return getPostsByUserId(parent.id);
    }
  }
};
```

### Resolver Parameters
1. **parent**: Result from parent resolver
2. **args**: Arguments passed to the field
3. **context**: Shared across all resolvers (auth, db, etc.)
4. **info**: Field-specific information

### Resolver Chain
```javascript
const resolvers = {
  Query: {
    user: () => ({ id: 1, name: 'John' })
  },
  User: {
    // parent is the user object from Query.user
    posts: (parent) => getPostsByUserId(parent.id),
    friends: (parent) => getFriendsByUserId(parent.id)
  },
  Post: {
    // parent is each post from User.posts
    author: (parent) => getUserById(parent.authorId),
    comments: (parent) => getCommentsByPostId(parent.id)
  }
};
```

### DataLoader (Batching & Caching)
```javascript
const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (userIds) => {
  const users = await getUsersByIds(userIds);
  return userIds.map(id => users.find(u => u.id === id));
});

const resolvers = {
  Post: {
    author: (parent, args, { loaders }) => {
      return loaders.user.load(parent.authorId);
    }
  }
};
```

---

## GraphQL vs REST

### Comparison Table

| Feature | GraphQL | REST |
|---------|---------|------|
| **Endpoints** | Single endpoint | Multiple endpoints |
| **Data Fetching** | Exact data needed | Fixed data structure |
| **Over-fetching** | No | Yes |
| **Under-fetching** | No | Yes (N+1 problem) |
| **Versioning** | Not needed | Required (v1, v2) |
| **Caching** | Complex | Simple (HTTP cache) |
| **Learning Curve** | Steeper | Easier |
| **Tooling** | GraphiQL, Playground | Swagger, Postman |
| **Real-time** | Subscriptions | WebSocket/SSE |
| **File Upload** | Complex | Simple |

### When to Use Each

**Use GraphQL:**
- Complex, nested data requirements
- Multiple clients with different needs
- Rapid frontend iteration
- Mobile apps (reduce bandwidth)

**Use REST:**
- Simple CRUD operations
- File uploads/downloads
- HTTP caching is critical
- Team unfamiliar with GraphQL

---

## Best Practices

### 1. Schema Design
```graphql
# ✅ Good: Descriptive names
type User {
  id: ID!
  fullName: String!
  emailAddress: String!
}

# ❌ Bad: Unclear names
type User {
  id: ID!
  name: String!
  email: String!
}
```

### 2. Input Types for Mutations
```graphql
# ✅ Good: Use input types
input CreateUserInput {
  name: String!
  email: String!
}

mutation {
  createUser(input: CreateUserInput!): User!
}

# ❌ Bad: Multiple arguments
mutation {
  createUser(name: String!, email: String!): User!
}
```

### 3. Pagination
```graphql
# ✅ Good: Cursor-based pagination
type PostConnection {
  edges: [PostEdge!]!
  pageInfo: PageInfo!
}

# ❌ Bad: Offset-based (doesn't scale)
type Query {
  posts(offset: Int, limit: Int): [Post!]!
}
```

### 4. Error Handling
```graphql
type MutationResponse {
  success: Boolean!
  message: String
  user: User
}

mutation {
  createUser(input: $input): MutationResponse!
}
```

### 5. Nullable Fields
```graphql
# ✅ Good: Make fields nullable by default
type User {
  id: ID!
  name: String!
  bio: String      # Optional
  avatar: String   # Optional
}

# ❌ Bad: Everything required
type User {
  id: ID!
  name: String!
  bio: String!
  avatar: String!
}
```

### 6. Naming Conventions
- **Types**: PascalCase (User, Post)
- **Fields**: camelCase (firstName, emailAddress)
- **Enums**: UPPER_CASE (ADMIN, PENDING)
- **Arguments**: camelCase (userId, postId)

---

## Performance & Optimization

### 1. N+1 Problem
```javascript
// ❌ Bad: N+1 queries
const resolvers = {
  Query: {
    posts: () => getAllPosts()
  },
  Post: {
    author: (post) => getUserById(post.authorId) // Called N times!
  }
};

// ✅ Good: Use DataLoader
const resolvers = {
  Post: {
    author: (post, args, { loaders }) => {
      return loaders.user.load(post.authorId); // Batched!
    }
  }
};
```

### 2. Query Complexity Analysis
```javascript
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const server = new ApolloServer({
  validationRules: [
    createComplexityLimitRule(1000, {
      onCost: (cost) => console.log('Query cost:', cost)
    })
  ]
});
```

### 3. Query Depth Limiting
```javascript
const depthLimit = require('graphql-depth-limit');

const server = new ApolloServer({
  validationRules: [depthLimit(5)]
});
```

### 4. Persisted Queries
```javascript
// Client sends hash instead of full query
{
  "operationName": "GetUser",
  "extensions": {
    "persistedQuery": {
      "version": 1,
      "sha256Hash": "abc123..."
    }
  }
}
```

### 5. Caching Strategies
```javascript
// Field-level caching
const resolvers = {
  Query: {
    user: async (_, { id }, { cache }) => {
      const cached = await cache.get(`user:${id}`);
      if (cached) return cached;
      
      const user = await getUserById(id);
      await cache.set(`user:${id}`, user, { ttl: 300 });
      return user;
    }
  }
};
```

### 6. Response Caching
```javascript
// Apollo Server cache control
const resolvers = {
  Query: {
    posts: (_, __, { cacheControl }) => {
      cacheControl.setCacheHint({ maxAge: 60 });
      return getAllPosts();
    }
  }
};
```

---

## Common Interview Questions

### 1. What is GraphQL and how does it differ from REST?
GraphQL is a query language that allows clients to request exactly the data they need through a single endpoint, while REST uses multiple endpoints with fixed data structures.

### 2. Explain the N+1 problem and how to solve it
The N+1 problem occurs when fetching a list of items (1 query) and then fetching related data for each item (N queries). Solve with DataLoader for batching and caching.

### 3. What are resolvers?
Resolvers are functions that return data for each field in a GraphQL schema. They receive parent, args, context, and info parameters.

### 4. How do you handle authentication in GraphQL?
Use context to pass authentication data to resolvers, validate tokens in middleware, and check permissions in resolvers or directives.

### 5. What are fragments and why use them?
Fragments are reusable units of fields that can be shared across queries to avoid duplication and maintain consistency.

### 6. Explain GraphQL subscriptions
Subscriptions enable real-time data updates using WebSocket connections, allowing servers to push data to clients when events occur.

### 7. How do you handle errors in GraphQL?
Return errors in the errors array of the response, use custom error classes, and implement proper error handling in resolvers.

### 8. What is schema stitching?
Schema stitching combines multiple GraphQL schemas into a single schema, useful for microservices architecture.

### 9. How do you optimize GraphQL performance?
Use DataLoader, implement query complexity analysis, depth limiting, caching, and persisted queries.

### 10. What are directives?
Directives are annotations that modify execution behavior, like @include, @skip, @deprecated, or custom directives.

---

## Popular GraphQL Tools

### Server Frameworks
- **Apollo Server**: Most popular, feature-rich
- **Express GraphQL**: Simple, Express middleware
- **GraphQL Yoga**: Easy setup, batteries included
- **Mercurius**: Fastify plugin, high performance

### Client Libraries
- **Apollo Client**: Full-featured, React integration
- **Relay**: Facebook's client, optimized for React
- **urql**: Lightweight, extensible
- **graphql-request**: Minimal, simple queries

### Development Tools
- **GraphiQL**: In-browser IDE
- **GraphQL Playground**: Enhanced IDE
- **Apollo Studio**: Schema management, analytics
- **GraphQL Code Generator**: Generate TypeScript types

---

## Example: Complete GraphQL Server (Node.js)

```javascript
const { ApolloServer, gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String
    author: User!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    post(id: ID!): Post
    posts: [Post!]!
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Subscription {
    userAdded: User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    user: (_, { id }) => users.find(u => u.id === id),
    users: () => users,
    post: (_, { id }) => posts.find(p => p.id === id),
    posts: () => posts
  },
  
  Mutation: {
    createUser: (_, { input }) => {
      const user = { id: String(users.length + 1), ...input };
      users.push(user);
      pubsub.publish('USER_ADDED', { userAdded: user });
      return user;
    },
    deleteUser: (_, { id }) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) return false;
      users.splice(index, 1);
      return true;
    }
  },
  
  Subscription: {
    userAdded: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED'])
    }
  },
  
  User: {
    posts: (user) => posts.filter(p => p.authorId === user.id)
  },
  
  Post: {
    author: (post) => users.find(u => u.id === post.authorId)
  }
};

// Server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

---

## Resources
- [GraphQL Official Documentation](https://graphql.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [How to GraphQL](https://www.howtographql.com/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)