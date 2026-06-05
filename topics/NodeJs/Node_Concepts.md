# Node.js - Complete Interview Preparation Guide

A comprehensive guide covering essential Node.js concepts for interview preparation.

---

## Table of Contents

1. [What is Node.js?](#what-is-nodejs)
2. [Node.js Architecture](#nodejs-architecture)
3. [Event Loop](#event-loop)
4. [Modules](#modules)
5. [NPM (Node Package Manager)](#npm-node-package-manager)
6. [Asynchronous Programming](#asynchronous-programming)
7. [Streams](#streams)
8. [File System](#file-system)
9. [HTTP Module](#http-module)
10. [Express.js](#expressjs)
11. [Middleware](#middleware)
12. [Error Handling](#error-handling)
13. [Best Practices](#best-practices)
14. [Common Interview Questions](#common-interview-questions)

---

## What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine that allows you to run JavaScript on the server-side.

### Key Features

- **Asynchronous & Event-Driven**: Non-blocking I/O operations
- **Single-Threaded**: Uses event loop for concurrency
- **Fast Execution**: Built on V8 engine
- **NPM**: Largest ecosystem of open-source libraries
- **Cross-Platform**: Runs on Windows, Linux, macOS
- **Scalable**: Handles concurrent connections efficiently

### Why Node.js?

✅ **JavaScript Everywhere**: Same language for frontend and backend
✅ **High Performance**: Non-blocking I/O, event-driven
✅ **Scalability**: Handles many concurrent connections
✅ **Large Ecosystem**: NPM with millions of packages
✅ **Real-Time Applications**: Perfect for chat, gaming, streaming
✅ **Microservices**: Lightweight and fast
✅ **Active Community**: Large developer community

### Node.js vs Traditional Server

| Feature | Node.js | Traditional (PHP, Java) |
|---------|---------|------------------------|
| **Threading** | Single-threaded | Multi-threaded |
| **I/O** | Non-blocking | Blocking |
| **Concurrency** | Event loop | Thread per request |
| **Performance** | High for I/O | High for CPU |
| **Memory** | Lower | Higher |
| **Scalability** | Excellent | Good |

---

## Node.js Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Node.js Application             │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         V8 JavaScript Engine            │
│      (Compiles JS to Machine Code)      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│            Node.js Bindings             │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│              libuv                      │
│  ┌────────────────────────────────────┐ │
│  │        Event Loop                  │ │
│  │  ┌──────────┐  ┌──────────────┐  │ │
│  │  │  Timers  │  │   I/O Poll   │  │ │
│  │  └──────────┘  └──────────────┘  │ │
│  │  ┌──────────┐  ┌──────────────┐  │ │
│  │  │  Check   │  │    Close     │  │ │
│  │  └──────────┘  └──────────────┘  │ │
│  └────────────────────────────────────┘ │
│  ┌────────────────────────────────────┐ │
│  │       Thread Pool                  │ │
│  │  (File I/O, DNS, Crypto, etc.)    │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│        Operating System                 │
└─────────────────────────────────────────┘
```

### Components

1. **V8 Engine**: Executes JavaScript code
2. **libuv**: Provides event loop and async I/O
3. **Node.js Bindings**: Connect JS to C++ libraries
4. **Thread Pool**: Handles blocking operations
5. **Event Queue**: Stores callbacks

---

## Event Loop

### What is Event Loop?

The **Event Loop** is the mechanism that allows Node.js to perform non-blocking I/O operations despite JavaScript being single-threaded.

### Event Loop Phases

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │           poll            │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────▼─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

### Phase Details

1. **Timers**: Executes `setTimeout()` and `setInterval()` callbacks
2. **Pending Callbacks**: Executes I/O callbacks deferred to next iteration
3. **Idle, Prepare**: Internal use only
4. **Poll**: Retrieves new I/O events, executes I/O callbacks
5. **Check**: Executes `setImmediate()` callbacks
6. **Close Callbacks**: Executes close event callbacks

### Example

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout');
}, 0);

setImmediate(() => {
  console.log('3. setImmediate');
});

process.nextTick(() => {
  console.log('4. nextTick');
});

Promise.resolve().then(() => {
  console.log('5. Promise');
});

console.log('6. End');

// Output:
// 1. Start
// 6. End
// 4. nextTick
// 5. Promise
// 2. setTimeout
// 3. setImmediate
```

### Execution Order

```
1. Synchronous code
2. process.nextTick()
3. Microtasks (Promises)
4. Timers (setTimeout, setInterval)
5. setImmediate()
```

---

## Modules

### What are Modules?

**Modules** are reusable blocks of code whose existence does not impact other code.

### Types of Modules

1. **Core Modules**: Built-in (fs, http, path, etc.)
2. **Local Modules**: Created by developers
3. **Third-Party Modules**: Installed via NPM

### CommonJS (require/module.exports)

```javascript
// math.js - Export
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// OR
exports.add = add;
exports.subtract = subtract;

// app.js - Import
const math = require('./math');
console.log(math.add(5, 3));  // 8

// OR destructuring
const { add, subtract } = require('./math');
console.log(add(5, 3));  // 8
```

### ES6 Modules (import/export)

```javascript
// math.js - Export
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// OR default export
export default function multiply(a, b) {
  return a * b;
}

// app.js - Import
import { add, subtract } from './math.js';
import multiply from './math.js';

console.log(add(5, 3));  // 8
console.log(multiply(5, 3));  // 15
```

### Core Modules

```javascript
// File System
const fs = require('fs');

// HTTP
const http = require('http');

// Path
const path = require('path');

// OS
const os = require('os');

// Events
const EventEmitter = require('events');

// Crypto
const crypto = require('crypto');

// URL
const url = require('url');

// Util
const util = require('util');
```

---

## NPM (Node Package Manager)

### What is NPM?

**NPM** is the default package manager for Node.js, providing access to millions of packages.

### Common Commands

```bash
# Initialize project
npm init
npm init -y  # Skip questions

# Install package
npm install express
npm i express  # Shorthand

# Install as dev dependency
npm install --save-dev nodemon
npm i -D nodemon

# Install globally
npm install -g typescript

# Install specific version
npm install express@4.17.1

# Update packages
npm update

# Uninstall package
npm uninstall express

# List installed packages
npm list
npm list --depth=0  # Top-level only

# Check outdated packages
npm outdated

# Run scripts
npm run dev
npm start
npm test
```

### package.json

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "My Node.js application",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "keywords": ["node", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "jest": "^27.0.0"
  }
}
```

### Semantic Versioning

```
^1.2.3  → >=1.2.3 <2.0.0  (Compatible with 1.x.x)
~1.2.3  → >=1.2.3 <1.3.0  (Compatible with 1.2.x)
1.2.3   → Exact version
*       → Latest version
```

---

## Asynchronous Programming

### Callbacks

```javascript
// Callback pattern
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});

// Callback hell (pyramid of doom)
fs.readFile('file1.txt', (err, data1) => {
  if (err) return console.error(err);
  fs.readFile('file2.txt', (err, data2) => {
    if (err) return console.error(err);
    fs.readFile('file3.txt', (err, data3) => {
      if (err) return console.error(err);
      console.log(data1, data2, data3);
    });
  });
});
```

### Promises

```javascript
const fs = require('fs').promises;

// Promise chain
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log('Data:', data);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log('Data2:', data2);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Creating promises
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

### Async/Await

```javascript
const fs = require('fs').promises;

// Async/await
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    const data3 = await fs.readFile('file3.txt', 'utf8');
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFiles();

// Parallel execution
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);
    
    console.log(data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

---

## Streams

### What are Streams?

**Streams** are objects that let you read data from a source or write data to a destination in a continuous manner.

### Types of Streams

1. **Readable**: Read data (fs.createReadStream)
2. **Writable**: Write data (fs.createWriteStream)
3. **Duplex**: Both read and write (net.Socket)
4. **Transform**: Modify data while reading/writing (zlib)

### Readable Stream

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 16 * 1024  // 16KB chunks
});

readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length);
});

readStream.on('end', () => {
  console.log('Finished reading');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});
```

### Writable Stream

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello ');
writeStream.write('World!\n');
writeStream.end();

writeStream.on('finish', () => {
  console.log('Finished writing');
});
```

### Pipe

```javascript
const fs = require('fs');

// Copy file using streams
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);

// Compress file
const zlib = require('zlib');
const gzip = zlib.createGzip();

fs.createReadStream('input.txt')
  .pipe(gzip)
  .pipe(fs.createWriteStream('input.txt.gz'));
```

---

## File System

### Reading Files

```javascript
const fs = require('fs');

// Synchronous (blocking)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Promise-based
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Writing Files

```javascript
const fs = require('fs');

// Write file
fs.writeFile('file.txt', 'Hello World!', (err) => {
  if (err) throw err;
  console.log('File written');
});

// Append to file
fs.appendFile('file.txt', '\nNew line', (err) => {
  if (err) throw err;
  console.log('Content appended');
});
```

### File Operations

```javascript
const fs = require('fs');

// Check if file exists
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? 'File does not exist' : 'File exists');
});

// Delete file
fs.unlink('file.txt', (err) => {
  if (err) throw err;
  console.log('File deleted');
});

// Rename file
fs.rename('old.txt', 'new.txt', (err) => {
  if (err) throw err;
  console.log('File renamed');
});

// Get file stats
fs.stat('file.txt', (err, stats) => {
  if (err) throw err;
  console.log('Size:', stats.size);
  console.log('Is file:', stats.isFile());
  console.log('Is directory:', stats.isDirectory());
});
```

### Directory Operations

```javascript
const fs = require('fs');

// Create directory
fs.mkdir('new-folder', (err) => {
  if (err) throw err;
  console.log('Directory created');
});

// Read directory
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log('Files:', files);
});

// Remove directory
fs.rmdir('folder', (err) => {
  if (err) throw err;
  console.log('Directory removed');
});
```

---

## HTTP Module

### Creating HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send response
  res.end('Hello World!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Routing

```javascript
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (pathname === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  } else if (pathname === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['John', 'Jane'] }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000);
```

### HTTP Request

```javascript
const http = require('http');

const options = {
  hostname: 'api.example.com',
  port: 80,
  path: '/users',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();
```

---

## Express.js

### Basic Server

```javascript
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
  res.json({ users: ['John', 'Jane'] });
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: 'User created', user });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Route Parameters

```javascript
// URL parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});
```

### Router

```javascript
// users.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.get('/:id', (req, res) => {
  res.json({ user: { id: req.params.id } });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users.routes');
app.use('/api/users', userRoutes);
```

---

## Middleware

### What is Middleware?

**Middleware** functions have access to request, response, and next function in the request-response cycle.

### Types of Middleware

```javascript
// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Router-level middleware
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Built-in middleware
app.use(express.json());
app.use(express.static('public'));

// Third-party middleware
const cors = require('cors');
app.use(cors());
```

### Custom Middleware

```javascript
// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

app.use(logger);

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});
```

---

## Error Handling

### Try-Catch

```javascript
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### Error Middleware

```javascript
// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});
```

### Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});
```

---

## Best Practices

### 1. Use Environment Variables

```javascript
// .env file
PORT=3000
DB_URL=mongodb://localhost:27017/mydb
JWT_SECRET=mysecret

// Load with dotenv
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
```

### 2. Use Async/Await

```javascript
// ✅ Good
async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
}

// ❌ Bad (callback hell)
function getUser(id, callback) {
  User.findById(id, (err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
}
```

### 3. Handle Errors Properly

```javascript
// ✅ Good
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
```

### 4. Use Clustering

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} died`);
    cluster.fork();
  });
} else {
  // Start server
  app.listen(3000);
}
```

### 5. Use Compression

```javascript
const compression = require('compression');
app.use(compression());
```

---

## Common Interview Questions

### 1. What is Node.js?

**Answer:** Node.js is a JavaScript runtime built on Chrome's V8 engine that allows running JavaScript on the server-side. It's asynchronous, event-driven, and single-threaded.

---

### 2. What is the Event Loop?

**Answer:** The Event Loop is the mechanism that allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel and handling callbacks when operations complete.

---

### 3. What is the difference between process.nextTick() and setImmediate()?

**Answer:**
- `process.nextTick()`: Executes before the event loop continues
- `setImmediate()`: Executes in the check phase of the event loop

---

### 4. What are Streams in Node.js?

**Answer:** Streams are objects that let you read/write data in chunks rather than all at once. Types: Readable, Writable, Duplex, Transform.

---

### 5. What is middleware in Express?

**Answer:** Middleware functions have access to request, response, and next function. They can execute code, modify req/res, end request-response cycle, or call next middleware.

---

### 6. What is the difference between require() and import?

**Answer:**
- `require()`: CommonJS, synchronous, dynamic
- `import`: ES6 modules, can be asynchronous, static

---

### 7. How does Node.js handle child threads?

**Answer:** Node.js is single-threaded but uses libuv's thread pool for blocking operations. Can also use `worker_threads` module for CPU-intensive tasks.

---

### 8. What is callback hell and how to avoid it?

**Answer:** Callback hell is nested callbacks making code hard to read. Avoid with:
- Promises
- Async/await
- Modularization

---

### 9. What is the purpose of package.json?

**Answer:** Contains project metadata, dependencies, scripts, and configuration. Essential for NPM package management.

---

### 10. What is clustering in Node.js?

**Answer:** Clustering allows creating child processes (workers) that share the same server port, utilizing multiple CPU cores for better performance.

---

## Quick Reference

### Node.js Cheat Sheet

| Concept | Example |
|---------|---------|
| Create Server | `http.createServer()` |
| Read File | `fs.readFile()` |
| Write File | `fs.writeFile()` |
| Stream | `fs.createReadStream()` |
| Module Export | `module.exports = {}` |
| Module Import | `require('./module')` |
| Express Route | `app.get('/path', handler)` |
| Middleware | `app.use(middleware)` |
| Async/Await | `async function() { await }` |
| Promise | `new Promise((resolve, reject))` |

---

**Master Node.js! 🚀**