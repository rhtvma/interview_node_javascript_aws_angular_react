# Mocha + Chai Testing - Interview Ready Guide

## Table of Contents
1. [Introduction to Mocha & Chai](#introduction-to-mocha--chai)
2. [Setup and Configuration](#setup-and-configuration)
3. [Basic Testing Concepts](#basic-testing-concepts)
4. [Chai Assertions](#chai-assertions)
5. [Async Testing](#async-testing)
6. [Hooks](#hooks)
7. [Mocking with Sinon](#mocking-with-sinon)
8. [Node.js Testing Examples](#nodejs-testing-examples)
9. [Best Practices](#best-practices)
10. [Interview Questions](#interview-questions)

---

## Introduction to Mocha & Chai

### What is Mocha?
- **Mocha** is a feature-rich JavaScript test framework running on Node.js
- Flexible and extensible
- Supports multiple assertion libraries
- Async testing support
- Browser and Node.js compatible

### What is Chai?
- **Chai** is a BDD/TDD assertion library
- Works with any JavaScript testing framework
- Three assertion styles: Should, Expect, Assert
- Chainable language for readable tests
- Plugin ecosystem

### Why Mocha + Chai?
- **Flexibility**: Choose your own assertion library, mocking library, etc.
- **Mature**: Battle-tested in production
- **Extensible**: Rich plugin ecosystem
- **Clear Output**: Excellent error messages
- **Community**: Large community and resources

---

## Setup and Configuration

### Installation

```bash
# Install Mocha and Chai
npm install --save-dev mocha chai

# Install additional tools
npm install --save-dev sinon          # For mocking
npm install --save-dev chai-http      # For HTTP testing
npm install --save-dev nyc            # For code coverage
```

### Package.json Configuration

```json
{
  "scripts": {
    "test": "mocha",
    "test:watch": "mocha --watch",
    "test:coverage": "nyc mocha",
    "test:report": "nyc --reporter=html mocha"
  }
}
```

### Mocha Configuration (.mocharc.json)

```json
{
  "require": ["@babel/register"],
  "spec": "test/**/*.test.js",
  "timeout": 5000,
  "recursive": true,
  "reporter": "spec",
  "ui": "bdd",
  "color": true,
  "exit": true
}
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
const { expect } = require('chai');
const { add, subtract } = require('./math');

describe('Math Operations', function() {
  it('should add two numbers', function() {
    expect(add(2, 3)).to.equal(5);
  });
  
  it('should subtract two numbers', function() {
    expect(subtract(5, 3)).to.equal(2);
  });
});
```

---

## Chai Assertions

### Expect Style (Recommended)

```javascript
const { expect } = require('chai');

describe('Chai Assertions', function() {
  // Equality
  it('should check equality', function() {
    expect(2 + 2).to.equal(4);
    expect({ name: 'John' }).to.deep.equal({ name: 'John' });
  });
  
  // Type checking
  it('should check types', function() {
    expect('hello').to.be.a('string');
    expect(42).to.be.a('number');
    expect([]).to.be.an('array');
  });
  
  // Truthiness
  it('should check truthiness', function() {
    expect(true).to.be.true;
    expect(1).to.be.ok;
    expect('').to.not.be.ok;
  });
  
  // Arrays
  it('should check arrays', function() {
    expect([1, 2, 3]).to.have.lengthOf(3);
    expect([1, 2, 3]).to.include(2);
  });
  
  // Objects
  it('should check objects', function() {
    expect({ name: 'John' }).to.have.property('name');
    expect({ age: 30 }).to.have.property('age', 30);
  });
  
  // Exceptions
  it('should check exceptions', function() {
    expect(() => { throw new Error('error'); }).to.throw();
  });
});
```

---

## Async Testing

### Promises

```javascript
describe('Async with Promises', function() {
  it('should fetch data', function() {
    return fetchData().then(data => {
      expect(data).to.equal('data');
    });
  });
});
```

### Async/Await

```javascript
describe('Async with Async/Await', function() {
  it('should fetch data', async function() {
    const data = await fetchData();
    expect(data).to.equal('data');
  });
});
```

---

## Hooks

```javascript
describe('Hooks', function() {
  before(function() {
    // Runs once before all tests
  });
  
  after(function() {
    // Runs once after all tests
  });
  
  beforeEach(function() {
    // Runs before each test
  });
  
  afterEach(function() {
    // Runs after each test
  });
});
```

---

## Mocking with Sinon

```javascript
const sinon = require('sinon');

describe('Sinon Mocking', function() {
  it('should stub function', function() {
    const stub = sinon.stub();
    stub.returns(42);
    expect(stub()).to.equal(42);
  });
  
  it('should spy on calls', function() {
    const spy = sinon.spy();
    spy('hello');
    expect(spy.calledWith('hello')).to.be.true;
  });
});
```

---

## Node.js Testing Examples

### Express API Testing

```javascript
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', function() {
  it('should get all users', async function() {
    const res = await chai.request(app).get('/api/users');
    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');
  });
  
  it('should create user', async function() {
    const res = await chai.request(app)
      .post('/api/users')
      .send({ name: 'John', email: 'john@example.com' });
    expect(res).to.have.status(201);
  });
});
```

---

## Best Practices

1. **Descriptive test names**
2. **AAA Pattern** (Arrange, Act, Assert)
3. **Test independence**
4. **Mock external dependencies**
5. **Test edge cases**

---

## Interview Questions

### Q1: What is Mocha?
**Answer:** Mocha is a feature-rich JavaScript test framework for Node.js with flexible configuration and async support.

### Q2: What are Chai's assertion styles?
**Answer:** Chai has three styles: Should, Expect (recommended), and Assert.

### Q3: How do you test async code?
**Answer:** Use callbacks with `done()`, return promises, or use async/await.

### Q4: What are Mocha hooks?
**Answer:** before, after, beforeEach, afterEach - run at specific points in test lifecycle.

### Q5: What is Sinon used for?
**Answer:** Sinon provides spies, stubs, and mocks for testing.

---

**Made with ❤️ for Interview Preparation**