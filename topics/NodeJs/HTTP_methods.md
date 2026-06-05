# HTTP Methods - PUT vs PATCH

A guide to understanding the differences between PUT and PATCH HTTP methods for updating resources.

---

## Table of Contents

1. [Overview](#overview)
2. [PUT Method](#put-method)
3. [PATCH Method](#patch-method)
4. [Key Differences](#key-differences)
5. [When to Use Each](#when-to-use-each)
6. [Examples](#examples)

---

## Overview

PUT and PATCH are HTTP methods used to update resources on a server. While both are used for updates, they serve different purposes and have distinct behaviors.

### Quick Comparison

| Aspect | PUT | PATCH |
|--------|-----|-------|
| Purpose | Replace entire resource | Update part of resource |
| Data Required | Complete resource data | Partial resource data |
| Idempotent | Yes | Yes (usually) |
| Use Case | Full replacement | Partial updates |

---

## PUT Method

### What is PUT?

PUT is used to **replace an entire resource** with new data. When you send a PUT request, you're essentially saying "replace everything with this new data."

### Characteristics

- Replaces the entire dataset with the data transmitted by the client
- Requires the client to send all fields, even unchanged ones
- If a field is not included, it may be set to null or default value
- Idempotent: Multiple identical requests have the same effect as a single request

### Example

```javascript
// PUT request - Replace entire user
PUT /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": "123 Main St",
  "phone": "555-1234"
}
```

**Result:** The entire user resource is replaced with this new data.

---

## PATCH Method

### What is PATCH?

PATCH is used to **update a part of a resource**. When you send a PATCH request, you're saying "update only these specific fields."

### Characteristics

- Applies only the partial data transmitted by the client
- Does not modify the entire dataset
- Only the fields included in the request are updated
- Other fields remain unchanged
- More efficient for small updates

### Example

```javascript
// PATCH request - Update only email
PATCH /api/users/123
Content-Type: application/json

{
  "email": "newemail@example.com"
}
```

**Result:** Only the email field is updated; all other fields remain unchanged.

---

## Key Differences

### 1. Data Scope

**PUT:**
```javascript
// Must send complete resource
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": "123 Main St",
  "phone": "555-1234"
}
```

**PATCH:**
```javascript
// Send only what needs to change
{
  "email": "newemail@example.com"
}
```

### 2. Behavior

**PUT:**
- Replaces the entire dataset
- Missing fields may be set to null or removed
- Complete replacement operation

**PATCH:**
- Updates only specified fields
- Unspecified fields remain unchanged
- Partial update operation

### 3. Network Efficiency

**PUT:**
- Requires more bandwidth (complete resource)
- Suitable when you have all the data

**PATCH:**
- More efficient (only changed fields)
- Better for large resources with small changes

---

## When to Use Each

### Use PUT When:

1. **Complete Data Available**
   - The client has all the data and can send it at once
   - You're replacing an entire resource

2. **Full Replacement Needed**
   - You want to completely replace an existing resource with new data
   - You need to ensure all fields are explicitly set

3. **Idempotency is Critical**
   - Multiple identical requests should have the same effect
   - You want predictable behavior

### Example Use Cases for PUT:
- Updating a user profile with all fields
- Replacing a configuration file
- Updating a complete document

```javascript
// Express.js PUT endpoint
app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  
  // Replace entire user record
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    userData,
    { overwrite: true, new: true }
  );
  
  res.json(updatedUser);
});
```

---

### Use PATCH When:

1. **Partial Updates Needed**
   - You want to make partial updates to a resource
   - Only a subset of the resource needs to be modified

2. **Single or Few Fields**
   - You want to update a single field or a few fields
   - You don't have or need the complete resource data

3. **Efficiency Matters**
   - Large resources where sending complete data is wasteful
   - Mobile or low-bandwidth scenarios

### Example Use Cases for PATCH:
- Updating just the email address
- Changing a user's status
- Incrementing a counter
- Toggling a boolean flag

```javascript
// Express.js PATCH endpoint
app.patch('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  
  // Update only specified fields
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updates },
    { new: true }
  );
  
  res.json(updatedUser);
});
```

---

## Examples

### Scenario: Updating a User Profile

#### Initial User Data
```json
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": "123 Main St",
  "phone": "555-1234",
  "status": "active"
}
```

#### Using PUT (Full Replacement)

**Request:**
```http
PUT /api/users/123
Content-Type: application/json

{
  "id": 123,
  "name": "John Doe",
  "email": "john.doe@newdomain.com",
  "age": 31,
  "address": "456 Oak Ave",
  "phone": "555-5678",
  "status": "active"
}
```

**Result:** Entire user object is replaced.

---

#### Using PATCH (Partial Update)

**Request:**
```http
PATCH /api/users/123
Content-Type: application/json

{
  "email": "john.doe@newdomain.com",
  "age": 31
}
```

**Result:** Only email and age are updated; other fields remain unchanged.

---

### Real-World Implementation

#### Node.js/Express Example

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Sample data store
let users = {
  123: {
    id: 123,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    address: "123 Main St"
  }
};

// PUT - Replace entire resource
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  
  // Validate that all required fields are present
  if (!userData.name || !userData.email || !userData.age) {
    return res.status(400).json({ 
      error: 'PUT requires all fields' 
    });
  }
  
  // Replace entire user
  users[userId] = {
    id: parseInt(userId),
    ...userData
  };
  
  res.json(users[userId]);
});

// PATCH - Update specific fields
app.patch('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  
  // Check if user exists
  if (!users[userId]) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Update only provided fields
  users[userId] = {
    ...users[userId],
    ...updates
  };
  
  res.json(users[userId]);
});
```

---

## Best Practices

### For PUT:
1. ✅ Always send complete resource data
2. ✅ Validate all required fields
3. ✅ Use for full replacements
4. ✅ Document required fields clearly

### For PATCH:
1. ✅ Send only fields that need updating
2. ✅ Validate individual fields
3. ✅ Use for partial updates
4. ✅ Consider using JSON Patch format for complex updates

### General:
1. ✅ Choose the method based on your use case
2. ✅ Be consistent across your API
3. ✅ Document your API behavior clearly
4. ✅ Consider idempotency requirements
5. ✅ Handle errors appropriately

---

## Common Pitfalls

### ❌ Using PUT for Partial Updates
```javascript
// Wrong - Using PUT but only sending partial data
PUT /api/users/123
{
  "email": "new@example.com"
}
// This might set other fields to null!
```

### ❌ Using PATCH for Full Replacement
```javascript
// Inefficient - Using PATCH but sending all fields
PATCH /api/users/123
{
  "name": "John",
  "email": "john@example.com",
  "age": 30,
  "address": "123 Main St",
  "phone": "555-1234"
}
// Should use PUT instead
```

---

## Conclusion

The choice between PUT and PATCH depends on your specific use case:

- **Use PUT** when you need to replace the entire resource
- **Use PATCH** when you need to update specific fields

Using the correct method helps:
- Avoid unintended consequences
- Improve API efficiency
- Make your API more intuitive
- Follow REST best practices

---

**Choose Wisely! 🎯**