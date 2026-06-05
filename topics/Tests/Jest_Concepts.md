# Jest Testing - Interview Ready Guide

## Table of Contents
1. [Introduction to Jest](#introduction-to-jest)
2. [Setup and Configuration](#setup-and-configuration)
3. [Basic Testing Concepts](#basic-testing-concepts)
4. [Matchers](#matchers)
5. [Async Testing](#async-testing)
6. [Mocking](#mocking)
7. [Node.js Testing Examples](#nodejs-testing-examples)
8. [React Testing](#react-testing)
9. [Best Practices](#best-practices)
10. [Interview Questions](#interview-questions)

---

## Introduction to Jest

**What is Jest?**
- JavaScript testing framework developed by Facebook
- Zero configuration for most projects
- Fast, parallel test execution
- Built-in code coverage
- Snapshot testing
- Mocking capabilities

**Why Jest?**
- Easy to set up and use
- Great developer experience
- Excellent documentation
- Works with TypeScript, React, Node.js, Vue, Angular
- Built-in assertion library

---

## Setup and Configuration

### Installation

```bash
# Using npm
npm install --save-dev jest

# Using yarn
yarn add --dev jest
```

### Package.json Configuration

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Jest Configuration (jest.config.js)

```javascript
module.exports = {
  // Test environment
  testEnvironment: 'node', // or 'jsdom' for browser-like environment
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/index.js'
  ],
  
  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Transform files
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  }
};
```

---

## Basic Testing Concepts

### Test Structure

```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
```

```javascript
// math.test.js
const { add, subtract } = require('./math');

// Test suite
describe('Math operations', () => {
  
  // Individual test
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  
  // Alternative syntax
  it('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });
  
  // Nested describe blocks
  describe('Addition', () => {
    test('handles positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    test('handles negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });
  });
});
```

### Setup and Teardown

```javascript
describe('Database operations', () => {
  let db;
  
  // Runs before all tests in this suite
  beforeAll(async () => {
    db = await connectToDatabase();
  });
  
  // Runs after all tests in this suite
  afterAll(async () => {
    await db.close();
  });
  
  // Runs before each test
  beforeEach(() => {
    db.clear();
  });
  
  // Runs after each test
  afterEach(() => {
    // Cleanup
  });
  
  test('inserts data', async () => {
    await db.insert({ name: 'John' });
    const result = await db.find({ name: 'John' });
    expect(result).toBeDefined();
  });
});
```

---

## Matchers

### Common Matchers

```javascript
describe('Matchers', () => {
  
  // Equality
  test('toBe - strict equality (===)', () => {
    expect(2 + 2).toBe(4);
    expect('hello').toBe('hello');
  });
  
  test('toEqual - deep equality', () => {
    const obj = { name: 'John', age: 30 };
    expect(obj).toEqual({ name: 'John', age: 30 });
  });
  
  // Truthiness
  test('toBeTruthy / toBeFalsy', () => {
    expect(true).toBeTruthy();
    expect(1).toBeTruthy();
    expect('hello').toBeTruthy();
    
    expect(false).toBeFalsy();
    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();
  });
  
  // Numbers
  test('number comparisons', () => {
    expect(10).toBeGreaterThan(5);
    expect(10).toBeGreaterThanOrEqual(10);
    expect(5).toBeLessThan(10);
    expect(5).toBeLessThanOrEqual(5);
    
    // Floating point
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
  
  // Strings
  test('string matchers', () => {
    expect('Hello World').toMatch(/World/);
    expect('Hello World').toContain('World');
  });
  
  // Arrays and Iterables
  test('array matchers', () => {
    const arr = ['apple', 'banana', 'orange'];
    expect(arr).toContain('banana');
    expect(arr).toHaveLength(3);
    expect(arr).toEqual(expect.arrayContaining(['apple', 'banana']));
  });
  
  // Objects
  test('object matchers', () => {
    const user = { name: 'John', age: 30, email: 'john@example.com' };
    
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('age', 30);
    expect(user).toMatchObject({ name: 'John' });
  });
  
  // Exceptions
  test('exception matchers', () => {
    function throwError() {
      throw new Error('Something went wrong');
    }
    
    expect(throwError).toThrow();
    expect(throwError).toThrow('Something went wrong');
    expect(throwError).toThrow(Error);
  });
  
  // Negation
  test('not matcher', () => {
    expect(2 + 2).not.toBe(5);
    expect('hello').not.toMatch(/world/);
  });
});
```

---

## Async Testing

### Promises

```javascript
// api.js
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json());
}

module.exports = { fetchUser };
```

```javascript
// api.test.js
const { fetchUser } = require('./api');

describe('Async tests with Promises', () => {
  
  // Method 1: Return promise
  test('fetches user data', () => {
    return fetchUser(1).then(data => {
      expect(data.name).toBe('John');
    });
  });
  
  // Method 2: resolves/rejects
  test('fetches user data - resolves', () => {
    return expect(fetchUser(1)).resolves.toHaveProperty('name');
  });
  
  test('handles error', () => {
    return expect(fetchUser(999)).rejects.toThrow('User not found');
  });
});
```

### Async/Await

```javascript
describe('Async tests with async/await', () => {
  
  test('fetches user data', async () => {
    const data = await fetchUser(1);
    expect(data.name).toBe('John');
  });
  
  test('handles error', async () => {
    await expect(fetchUser(999)).rejects.toThrow('User not found');
  });
  
  test('multiple async operations', async () => {
    const user1 = await fetchUser(1);
    const user2 = await fetchUser(2);
    
    expect(user1.name).toBe('John');
    expect(user2.name).toBe('Jane');
  });
});
```

### Callbacks

```javascript
// callback.js
function fetchData(callback) {
  setTimeout(() => {
    callback('data');
  }, 100);
}

module.exports = { fetchData };
```

```javascript
// callback.test.js
const { fetchData } = require('./callback');

test('callback test', (done) => {
  function callback(data) {
    try {
      expect(data).toBe('data');
      done(); // Must call done()
    } catch (error) {
      done(error);
    }
  }
  
  fetchData(callback);
});
```

---

## Mocking

### Function Mocks

```javascript
describe('Function mocking', () => {
  
  test('mock function', () => {
    const mockFn = jest.fn();
    
    mockFn('hello');
    mockFn('world');
    
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(mockFn).toHaveBeenCalledWith('hello');
    expect(mockFn).toHaveBeenLastCalledWith('world');
  });
  
  test('mock return values', () => {
    const mockFn = jest.fn()
      .mockReturnValue(42)
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2);
    
    expect(mockFn()).toBe(1);
    expect(mockFn()).toBe(2);
    expect(mockFn()).toBe(42);
    expect(mockFn()).toBe(42);
  });
  
  test('mock implementation', () => {
    const mockFn = jest.fn((x, y) => x + y);
    
    expect(mockFn(1, 2)).toBe(3);
    expect(mockFn).toHaveBeenCalledWith(1, 2);
  });
});
```

### Module Mocking

```javascript
// userService.js
const axios = require('axios');

async function getUser(id) {
  const response = await axios.get(`/api/users/${id}`);
  return response.data;
}

module.exports = { getUser };
```

```javascript
// userService.test.js
const axios = require('axios');
const { getUser } = require('./userService');

// Mock the entire module
jest.mock('axios');

describe('User Service', () => {
  
  test('fetches user successfully', async () => {
    const mockUser = { id: 1, name: 'John' };
    
    axios.get.mockResolvedValue({ data: mockUser });
    
    const user = await getUser(1);
    
    expect(user).toEqual(mockUser);
    expect(axios.get).toHaveBeenCalledWith('/api/users/1');
  });
  
  test('handles error', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    
    await expect(getUser(1)).rejects.toThrow('Network error');
  });
});
```

### Spy on Methods

```javascript
describe('Spying', () => {
  
  test('spy on object method', () => {
    const calculator = {
      add: (a, b) => a + b
    };
    
    const spy = jest.spyOn(calculator, 'add');
    
    calculator.add(1, 2);
    
    expect(spy).toHaveBeenCalledWith(1, 2);
    expect(spy).toHaveReturnedWith(3);
    
    spy.mockRestore(); // Restore original implementation
  });
});
```

---

## Node.js Testing Examples

### Testing Express API

```javascript
// app.js
const express = require('express');
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = app;
```

```javascript
// app.test.js
const request = require('supertest');
const app = require('./app');

describe('User API', () => {
  
  describe('GET /api/users', () => {
    test('returns all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /json/);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  
  describe('GET /api/users/:id', () => {
    test('returns user by id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);
      
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });
    
    test('returns 404 for non-existent user', async () => {
      const response = await request(app)
        .get('/api/users/999')
        .expect(404);
      
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });
  
  describe('POST /api/users', () => {
    test('creates new user', async () => {
      const newUser = {
        name: 'Bob',
        email: 'bob@example.com'
      };
      
      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);
      
      expect(response.body).toMatchObject(newUser);
      expect(response.body).toHaveProperty('id');
    });
    
    test('returns 400 for invalid data', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Bob' }) // Missing email
        .expect(400);
      
      expect(response.body).toHaveProperty('error');
    });
  });
  
  describe('PUT /api/users/:id', () => {
    test('updates user', async () => {
      const updates = { name: 'John Updated' };
      
      const response = await request(app)
        .put('/api/users/1')
        .send(updates)
        .expect(200);
      
      expect(response.body.name).toBe('John Updated');
    });
  });
  
  describe('DELETE /api/users/:id', () => {
    test('deletes user', async () => {
      await request(app)
        .delete('/api/users/1')
        .expect(204);
    });
  });
});
```

### Testing Database Operations

```javascript
// userRepository.js
class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async findAll() {
    return this.db.query('SELECT * FROM users');
  }
  
  async findById(id) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
  
  async create(user) {
    const result = await this.db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [user.name, user.email]
    );
    return result.rows[0];
  }
  
  async update(id, user) {
    const result = await this.db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [user.name, user.email, id]
    );
    return result.rows[0];
  }
  
  async delete(id) {
    await this.db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = UserRepository;
```

```javascript
// userRepository.test.js
const UserRepository = require('./userRepository');

describe('UserRepository', () => {
  let mockDb;
  let userRepo;
  
  beforeEach(() => {
    mockDb = {
      query: jest.fn()
    };
    userRepo = new UserRepository(mockDb);
  });
  
  describe('findAll', () => {
    test('returns all users', async () => {
      const mockUsers = [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
      ];
      
      mockDb.query.mockResolvedValue(mockUsers);
      
      const users = await userRepo.findAll();
      
      expect(users).toEqual(mockUsers);
      expect(mockDb.query).toHaveBeenCalledWith('SELECT * FROM users');
    });
  });
  
  describe('findById', () => {
    test('returns user by id', async () => {
      const mockUser = { id: 1, name: 'John', email: 'john@example.com' };
      
      mockDb.query.mockResolvedValue({ rows: [mockUser] });
      
      const user = await userRepo.findById(1);
      
      expect(user).toEqual(mockUser);
      expect(mockDb.query).toHaveBeenCalledWith(
        'SELECT * FROM users WHERE id = $1',
        [1]
      );
    });
  });
  
  describe('create', () => {
    test('creates new user', async () => {
      const newUser = { name: 'Bob', email: 'bob@example.com' };
      const createdUser = { id: 3, ...newUser };
      
      mockDb.query.mockResolvedValue({ rows: [createdUser] });
      
      const user = await userRepo.create(newUser);
      
      expect(user).toEqual(createdUser);
      expect(mockDb.query).toHaveBeenCalledWith(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [newUser.name, newUser.email]
      );
    });
  });
});
```

### Testing File Operations

```javascript
// fileService.js
const fs = require('fs').promises;
const path = require('path');

class FileService {
  async readFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }
  
  async writeFile(filePath, content) {
    try {
      await fs.writeFile(filePath, content, 'utf-8');
      return true;
    } catch (error) {
      throw new Error(`Failed to write file: ${error.message}`);
    }
  }
  
  async deleteFile(filePath) {
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }
  
  async fileExists(filePath) {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = FileService;
```

```javascript
// fileService.test.js
const fs = require('fs').promises;
const FileService = require('./fileService');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    unlink: jest.fn(),
    access: jest.fn()
  }
}));

describe('FileService', () => {
  let fileService;
  
  beforeEach(() => {
    fileService = new FileService();
    jest.clearAllMocks();
  });
  
  describe('readFile', () => {
    test('reads file successfully', async () => {
      const mockContent = 'file content';
      fs.readFile.mockResolvedValue(mockContent);
      
      const content = await fileService.readFile('test.txt');
      
      expect(content).toBe(mockContent);
      expect(fs.readFile).toHaveBeenCalledWith('test.txt', 'utf-8');
    });
    
    test('throws error on read failure', async () => {
      fs.readFile.mockRejectedValue(new Error('File not found'));
      
      await expect(fileService.readFile('test.txt'))
        .rejects.toThrow('Failed to read file');
    });
  });
  
  describe('writeFile', () => {
    test('writes file successfully', async () => {
      fs.writeFile.mockResolvedValue();
      
      const result = await fileService.writeFile('test.txt', 'content');
      
      expect(result).toBe(true);
      expect(fs.writeFile).toHaveBeenCalledWith('test.txt', 'content', 'utf-8');
    });
  });
  
  describe('fileExists', () => {
    test('returns true if file exists', async () => {
      fs.access.mockResolvedValue();
      
      const exists = await fileService.fileExists('test.txt');
      
      expect(exists).toBe(true);
    });
    
    test('returns false if file does not exist', async () => {
      fs.access.mockRejectedValue(new Error('File not found'));
      
      const exists = await fileService.fileExists('test.txt');
      
      expect(exists).toBe(false);
    });
  });
});
```

---

## React Testing

### Testing React Components

```javascript
// Button.jsx
import React from 'react';

function Button({ onClick, children, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
```

```javascript
// Button.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeDisabled();
  });
});
```

---

## Best Practices

### 1. Test Organization

```javascript
// ✅ Good: Descriptive test names
describe('UserService', () => {
  describe('createUser', () => {
    test('creates user with valid data', () => {});
    test('throws error when email is invalid', () => {});
    test('throws error when name is missing', () => {});
  });
});

// ❌ Bad: Vague test names
describe('UserService', () => {
  test('test1', () => {});
  test('test2', () => {});
});
```

### 2. AAA Pattern (Arrange, Act, Assert)

```javascript
test('calculates total price', () => {
  // Arrange
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  
  // Act
  const total = calculateTotal(items);
  
  // Assert
  expect(total).toBe(35);
});
```

### 3. Test Independence

```javascript
// ✅ Good: Each test is independent
describe('Counter', () => {
  let counter;
  
  beforeEach(() => {
    counter = new Counter();
  });
  
  test('increments', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });
  
  test('decrements', () => {
    counter.decrement();
    expect(counter.value).toBe(-1);
  });
});

// ❌ Bad: Tests depend on each other
describe('Counter', () => {
  const counter = new Counter();
  
  test('increments', () => {
    counter.increment();
    expect(counter.value).toBe(1);
  });
  
  test('increments again', () => {
    counter.increment(); // Depends on previous test
    expect(counter.value).toBe(2);
  });
});
```

### 4. Mock External Dependencies

```javascript
// ✅ Good: Mock external API
jest.mock('./api');
const api = require('./api');

test('fetches user data', async () => {
  api.getUser.mockResolvedValue({ name: 'John' });
  
  const user = await getUserProfile(1);
  expect(user.name).toBe('John');
});

// ❌ Bad: Real API call in test
test('fetches user data', async () => {
  const user = await getUserProfile(1); // Real API call
  expect(user.name).toBe('John');
});
```

### 5. Test Edge Cases

```javascript
describe('divide', () => {
  test('divides positive numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
  
  test('divides negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });
  
  test('throws error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });
  
  test('handles decimal results', () => {
    expect(divide(10, 3)).toBeCloseTo(3.33, 2);
  });
});
```

---

## Interview Questions

### Q1: What is Jest and why use it?
**Answer:**
Jest is a JavaScript testing framework developed by Facebook. Key benefits:
- Zero configuration for most projects
- Fast parallel test execution
- Built-in code coverage
- Snapshot testing
- Excellent mocking capabilities
- Great developer experience with watch mode
- Works with React, Node.js, TypeScript, etc.

### Q2: What is the difference between `toBe()` and `toEqual()`?
**Answer:**
- `toBe()`: Uses `===` for strict equality. Use for primitives.
- `toEqual()`: Deep equality check. Use for objects and arrays.

```javascript
expect(2 + 2).toBe(4); // ✅
expect({ name: 'John' }).toBe({ name: 'John' }); // ❌ Different references
expect({ name: 'John' }).toEqual({ name: 'John' }); // ✅ Same values
```

### Q3: How do you test async code in Jest?
**Answer:**
Three ways:
1. **Return Promise**: Return the promise from test
2. **Async/Await**: Use async/await syntax
3. **Callbacks**: Use `done()` callback

```javascript
// Method 1: Return promise
test('async test', () => {
  return fetchData().then(data => {
    expect(data).toBe('data');
  });
});

// Method 2: Async/await
test('async test', async () => {
  const data = await fetchData();
  expect(data).toBe('data');
});

// Method 3: Callback
test('async test', (done) => {
  fetchData((data) => {
    expect(data).toBe('data');
    done();
  });
});
```

### Q4: What is mocking and why is it important?
**Answer:**
Mocking replaces real implementations with fake ones for testing. Important because:
- Isolates unit under test
- Avoids external dependencies (APIs, databases)
- Makes tests faster and more reliable
- Allows testing error scenarios
- Controls test environment

```javascript
// Mock module
jest.mock('./api');
const api = require('./api');

test('test with mock', async () => {
  api.fetchUser.mockResolvedValue({ name: 'John' });
  
  const user = await getUser(1);
  expect(user.name).toBe('John');
});
```

### Q5: What is code coverage and how do you measure it?
**Answer:**
Code coverage measures how much of your code is executed during tests. Types:
- **Statement coverage**: % of statements executed
- **Branch coverage**: % of branches (if/else) executed
- **Function coverage**: % of functions called
- **Line coverage**: % of lines executed

```bash
# Run with coverage
jest --coverage

# Set thresholds in jest.config.js
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
  }
}
```

### Q6: What are setup and teardown methods?
**Answer:**
Methods that run before/after tests:
- `beforeAll()`: Runs once before all tests
- `afterAll()`: Runs once after all tests
- `beforeEach()`: Runs before each test
- `afterEach()`: Runs after each test

```javascript
describe('Database tests', () => {
  beforeAll(() => {
    // Connect to database
  });
  
  afterAll(() => {
    // Close database connection
  });
  
  beforeEach(() => {
    // Clear database
  });
  
  test('test 1', () => {});
  test('test 2', () => {});
});
```

### Q7: How do you test error handling?
**Answer:**
Use `toThrow()` matcher:

```javascript
test('throws error', () => {
  expect(() => {
    throw new Error('Error message');
  }).toThrow('Error message');
});

// Async errors
test('async error', async () => {
  await expect(fetchData()).rejects.toThrow('Network error');
});
```

### Q8: What is snapshot testing?
**Answer:**
Snapshot testing captures component output and compares it to saved snapshots. Useful for:
- UI components
- API responses
- Configuration objects

```javascript
test('renders correctly', () => {
  const tree = renderer.create(<Button>Click me</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});
```

### Q9: How do you test private methods?
**Answer:**
**Don't test private methods directly.** Test them through public methods. Private methods are implementation details.

```javascript
// ❌ Bad: Testing private method
test('private method', () => {
  const obj = new MyClass();
  expect(obj._privateMethod()).toBe(true);
});

// ✅ Good: Test through public method
test('public method', () => {
  const obj = new MyClass();
  expect(obj.publicMethod()).toBe(expected);
  // Private method is tested indirectly
});
```

### Q10: What is Test-Driven Development (TDD)?
**Answer:**
TDD is a development approach where you:
1. Write failing test first
2. Write minimal code to pass test
3. Refactor code
4. Repeat

Benefits:
- Better code design
- Higher test coverage
- Fewer bugs
- Living documentation
- Confidence in refactoring

```javascript
// 1. Write failing test
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

// 2. Write minimal code
function add(a, b) {
  return a + b;
}

// 3. Refactor if needed
// 4. Repeat for next feature
```

---

## Additional Resources

### Useful Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- userService.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should create user"

# Update snapshots
npm test -- --updateSnapshot

# Run tests in CI
npm test -- --ci --coverage --maxWorkers=2
```

### Common Patterns

```javascript
// Test data builders
function createUser(overrides = {}) {
  return {
    id: 1,
    name: 'John',
    email: 'john@example.com',
    ...overrides
  };
}

// Custom matchers
expect.extend({
  toBeValidEmail(received) {
    const pass = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(received);
    return {
      pass,
      message: () => `expected ${received} to be a valid email`
    };
  }
});

// Parameterized tests
test.each([
  [1, 2, 3],
  [2, 3, 5],
  [3, 4, 7]
])('adds %i + %i to equal %i', (a, b, expected) => {
  expect(add(a, b)).toBe(expected);
});
```

---

**Made with ❤️ for Interview Preparation**