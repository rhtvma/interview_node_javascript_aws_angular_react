# Components of an API

A comprehensive guide to understanding the essential components of an API (Application Programming Interface).

---

## Table of Contents

1. [What is an API?](#what-is-an-api)
2. [API Client](#api-client)
3. [API Gateway](#api-gateway)
4. [Endpoints](#endpoints)
5. [HTTP Methods](#http-methods)
6. [Request Headers](#request-headers)
7. [Request Body](#request-body)
8. [API Response](#api-response)
9. [API Documentation](#api-documentation)
10. [Complete API Flow](#complete-api-flow)

---

## What is an API?

An **API (Application Programming Interface)** is a set of rules and protocols that allows different software applications to communicate with each other. It defines the methods and data formats that applications can use to request and exchange information.

### Key Benefits
- **Modularity**: Separate concerns between frontend and backend
- **Reusability**: Same API can serve multiple clients
- **Scalability**: Easy to scale independently
- **Security**: Controlled access to resources
- **Flexibility**: Multiple platforms can use the same API

---

## API Client

### Definition
The **API client** is the software that sends requests to the API server and receives responses.

### Types of API Clients

1. **Web Browsers**
   - JavaScript fetch/axios
   - AJAX requests
   - Single Page Applications (SPAs)

2. **Mobile Applications**
   - iOS apps
   - Android apps
   - React Native apps

3. **Server-Side Applications**
   - Backend services
   - Microservices
   - Scheduled jobs/cron tasks

4. **Desktop Applications**
   - Electron apps
   - Native desktop software

5. **IoT Devices**
   - Smart home devices
   - Wearables
   - Sensors

### Example: JavaScript Client

```javascript
// Using fetch API
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using axios
const axios = require('axios');

axios.get('https://api.example.com/users', {
  headers: {
    'Authorization': 'Bearer token123'
  }
})
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

---

## API Gateway

### Definition
The **API Gateway** is the component that receives requests from client applications and forwards them to the appropriate backend services.

### Responsibilities

1. **Request Routing**: Direct requests to correct backend service
2. **Load Balancing**: Distribute traffic across multiple servers
3. **Authentication**: Verify client identity
4. **Rate Limiting**: Control request frequency
5. **Caching**: Store frequently accessed data
6. **Logging**: Track API usage and errors
7. **Transformation**: Convert request/response formats

### Benefits

- **Single Entry Point**: Simplifies client interaction
- **Security**: Centralized authentication and authorization
- **Monitoring**: Track all API traffic
- **Versioning**: Manage multiple API versions
- **Protocol Translation**: Convert between different protocols

### Example: Express.js Gateway

```javascript
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Authentication middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verify token
  next();
});

// Route to backend services
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});
```

---

## Endpoints

### Definition
**Endpoints** are specific addresses (URLs) where APIs can be accessed. Each endpoint represents a unique function or resource.

### Structure

```
https://api.example.com/v1/users/123/posts
│      │              │  │   │    │    │
│      │              │  │   │    │    └─ Resource
│      │              │  │   │    └────── Resource ID
│      │              │  │   └─────────── Resource
│      │              │  └─────────────── Version
│      │              └────────────────── Base Path
│      └───────────────────────────────── Domain
└──────────────────────────────────────── Protocol
```

### Common Endpoint Patterns

```javascript
// Resource Collection
GET    /api/users           // Get all users
POST   /api/users           // Create new user

// Specific Resource
GET    /api/users/123       // Get user with ID 123
PUT    /api/users/123       // Update user 123
PATCH  /api/users/123       // Partially update user 123
DELETE /api/users/123       // Delete user 123

// Nested Resources
GET    /api/users/123/posts // Get posts by user 123
POST   /api/users/123/posts // Create post for user 123

// Actions
POST   /api/users/123/activate   // Activate user
POST   /api/orders/456/cancel    // Cancel order
```

### Best Practices

1. ✅ Use nouns, not verbs (e.g., `/users` not `/getUsers`)
2. ✅ Use plural nouns (e.g., `/users` not `/user`)
3. ✅ Use hyphens for multi-word resources (e.g., `/user-profiles`)
4. ✅ Keep URLs lowercase
5. ✅ Version your API (e.g., `/v1/users`)
6. ✅ Use query parameters for filtering (e.g., `/users?role=admin`)

---

## HTTP Methods

### Definition
**HTTP Methods** (also called HTTP verbs) define the actions that can be performed at the endpoints.

### Common HTTP Methods

| Method | Purpose | Idempotent | Safe |
|--------|---------|------------|------|
| GET | Retrieve data | Yes | Yes |
| POST | Create new resource | No | No |
| PUT | Replace entire resource | Yes | No |
| PATCH | Update part of resource | Yes | No |
| DELETE | Remove resource | Yes | No |
| HEAD | Get headers only | Yes | Yes |
| OPTIONS | Get allowed methods | Yes | Yes |

### Examples

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// GET - Retrieve data
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});

// POST - Create new resource
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  // Save to database
  res.status(201).json(newUser);
});

// PUT - Replace entire resource
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  // Replace user in database
  res.json(userData);
});

// PATCH - Update part of resource
app.patch('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  // Update specific fields
  res.json(updates);
});

// DELETE - Remove resource
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  // Delete from database
  res.status(204).send();
});
```

---

## Request Headers

### Definition
**Request headers** provide essential information for the server to process the request properly.

### Common Request Headers

| Header | Purpose | Example |
|--------|---------|---------|
| Content-Type | Format of request body | `application/json` |
| Authorization | Authentication credentials | `Bearer token123` |
| Accept | Desired response format | `application/json` |
| User-Agent | Client information | `Mozilla/5.0...` |
| Accept-Language | Preferred language | `en-US` |
| Cache-Control | Caching directives | `no-cache` |
| Cookie | Session cookies | `sessionId=abc123` |

### Example

```javascript
// Client-side request with headers
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    'Accept': 'application/json',
    'Accept-Language': 'en-US',
    'X-Custom-Header': 'custom-value'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});

// Server-side: Reading headers
app.post('/api/users', (req, res) => {
  const contentType = req.headers['content-type'];
  const authToken = req.headers['authorization'];
  const customHeader = req.headers['x-custom-header'];
  
  console.log('Content-Type:', contentType);
  console.log('Auth Token:', authToken);
  console.log('Custom Header:', customHeader);
  
  res.json({ message: 'Headers received' });
});
```

---

## Request Body

### Definition
The **request body** contains the data that is sent to the server. This data is usually in a structured format like JSON or XML.

### Common Formats

#### 1. JSON (Most Common)
```javascript
// Request
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  }
}
```

#### 2. Form Data
```javascript
// Request
POST /api/upload
Content-Type: multipart/form-data

name=John Doe
email=john@example.com
file=<binary data>
```

#### 3. URL Encoded
```javascript
// Request
POST /api/login
Content-Type: application/x-www-form-urlencoded

username=john&password=secret123
```

### Server-Side Handling

```javascript
const express = require('express');
const multer = require('multer');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse multipart/form-data
const upload = multer({ dest: 'uploads/' });

// JSON body
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  res.json({ message: 'User created', data: req.body });
});

// Form data with file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  const { name, email } = req.body;
  const file = req.file;
  res.json({ message: 'File uploaded', file: file.filename });
});
```

---

## API Response

### Definition
The **API response** is the data or confirmation of the result provided by the API after processing a request.

### Components of a Response

1. **Status Code**: Indicates success or failure
2. **Response Headers**: Metadata about the response
3. **Response Body**: The actual data returned

### HTTP Status Codes

| Code | Category | Meaning |
|------|----------|---------|
| 200 | Success | OK - Request succeeded |
| 201 | Success | Created - Resource created |
| 204 | Success | No Content - Success but no data |
| 400 | Client Error | Bad Request - Invalid syntax |
| 401 | Client Error | Unauthorized - Authentication required |
| 403 | Client Error | Forbidden - No permission |
| 404 | Client Error | Not Found - Resource doesn't exist |
| 500 | Server Error | Internal Server Error |
| 503 | Server Error | Service Unavailable |

### Response Structure Examples

#### Success Response
```javascript
// 200 OK
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully"
}
```

#### Error Response
```javascript
// 400 Bad Request
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

#### Paginated Response
```javascript
// 200 OK
{
  "success": true,
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Server-Side Implementation

```javascript
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'User not found'
        }
      });
    }
    
    res.status(200).json({
      success: true,
      data: user,
      message: 'User retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: 'SERVER_ERROR',
        message: 'Internal server error'
      }
    });
  }
});
```

---

## API Documentation

### Definition
**API documentation** covers the API lifecycle and provides instructions on how to use its components.

### Essential Documentation Elements

1. **Overview**: What the API does
2. **Authentication**: How to authenticate
3. **Endpoints**: Available endpoints and their purposes
4. **Request Examples**: Sample requests
5. **Response Examples**: Sample responses
6. **Error Codes**: Possible errors and meanings
7. **Rate Limits**: Usage restrictions
8. **Changelog**: Version history

### Documentation Tools

- **Swagger/OpenAPI**: Industry standard
- **Postman**: API testing and documentation
- **API Blueprint**: Markdown-based documentation
- **ReadMe**: Interactive documentation platform

### Example: Swagger/OpenAPI

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for managing users

paths:
  /users:
    get:
      summary: Get all users
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'
    post:
      summary: Create a new user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserInput'
      responses:
        '201':
          description: User created

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
```

---

## Complete API Flow

### Request-Response Cycle

```
1. Client sends request
   ↓
2. API Gateway receives request
   ↓
3. Authentication/Authorization check
   ↓
4. Rate limiting check
   ↓
5. Route to appropriate endpoint
   ↓
6. Process request (business logic)
   ↓
7. Database operations (if needed)
   ↓
8. Format response
   ↓
9. Send response to client
   ↓
10. Client receives and processes response
```

### Complete Example

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Verify token
  next();
};

// Endpoints
app.get('/api/users', authenticate, async (req, res) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

app.post('/api/users', authenticate, async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid data'
    });
  }
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
```

---

## Best Practices

1. ✅ **Use proper HTTP methods** for their intended purposes
2. ✅ **Return appropriate status codes** for all responses
3. ✅ **Implement authentication and authorization** for protected endpoints
4. ✅ **Validate all input data** before processing
5. ✅ **Use consistent response formats** across all endpoints
6. ✅ **Implement rate limiting** to prevent abuse
7. ✅ **Version your API** to maintain backward compatibility
8. ✅ **Provide comprehensive documentation** for developers
9. ✅ **Log all requests and errors** for debugging
10. ✅ **Use HTTPS** for secure communication

---

**Build Better APIs! 🚀**