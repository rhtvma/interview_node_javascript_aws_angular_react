# Design Patterns in Node.js

A comprehensive guide to design patterns commonly used in Node.js applications.

---

## Table of Contents

1. [What are Design Patterns?](#what-are-design-patterns)
2. [Types of Design Patterns](#types-of-design-patterns)
3. [Creational Design Patterns](#creational-design-patterns)
4. [Structural Design Patterns](#structural-design-patterns)
5. [Behavioral Design Patterns](#behavioral-design-patterns)
6. [Resources](#resources)

---

## What are Design Patterns?

**Design patterns** are well-proven solutions to commonly occurring problems in software design. They represent best practices and provide a template for solving specific design issues.

### Key Characteristics

- **Reusable**: Can be applied to different situations
- **Proven**: Battle-tested solutions
- **Language-agnostic**: Concepts apply across programming languages
- **Communication tool**: Provide a common vocabulary for developers

### Benefits

- ✅ Faster development
- ✅ Better code organization
- ✅ Easier maintenance
- ✅ Improved scalability
- ✅ Enhanced team communication

---

## Types of Design Patterns

Design patterns are categorized into three main types:

### 1. Creational Design Patterns
**Focus:** Object creation mechanisms

**Purpose:** Control how objects are created to make the system more flexible and reusable

**Common Patterns:**
- Factory Pattern
- Builder Pattern
- Singleton Pattern
- Prototype Pattern
- Abstract Factory Pattern

---

### 2. Structural Design Patterns
**Focus:** Object composition and relationships

**Purpose:** Define how objects and classes are structured to form larger structures

**Common Patterns:**
- Proxy Pattern
- Adapter Pattern
- Decorator Pattern
- Facade Pattern
- Bridge Pattern

---

### 3. Behavioral Design Patterns
**Focus:** Communication between objects

**Purpose:** Define how objects interact and communicate, promoting loose coupling

**Common Patterns:**
- Observer Pattern
- State Pattern
- Iterator Pattern
- Strategy Pattern
- Command Pattern

---

## Creational Design Patterns

### 1. Singleton Pattern

Ensures a class has only one instance and provides a global point of access to it.

#### Use Case
- Database connections
- Configuration objects
- Logging services

#### Implementation

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    Database.instance = this;
  }
  
  connect() {
    if (!this.connection) {
      this.connection = 'Connected to database';
      console.log(this.connection);
    }
    return this.connection;
  }
}

// Usage
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true - same instance
```

---

### 2. Factory Pattern

Creates objects without specifying the exact class to create.

#### Use Case
- Creating different types of users
- Generating various document types
- Building different payment methods

#### Implementation

```javascript
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
}

class UserFactory {
  static createUser(name, type) {
    switch(type) {
      case 'admin':
        return new User(name, 'Administrator');
      case 'editor':
        return new User(name, 'Editor');
      case 'viewer':
        return new User(name, 'Viewer');
      default:
        return new User(name, 'Guest');
    }
  }
}

// Usage
const admin = UserFactory.createUser('John', 'admin');
const editor = UserFactory.createUser('Jane', 'editor');
```

---

### 3. Builder Pattern

Constructs complex objects step by step.

#### Use Case
- Building complex configurations
- Creating objects with many optional parameters
- Constructing SQL queries

#### Implementation

```javascript
class QueryBuilder {
  constructor() {
    this.query = {};
  }
  
  select(fields) {
    this.query.select = fields;
    return this;
  }
  
  from(table) {
    this.query.from = table;
    return this;
  }
  
  where(condition) {
    this.query.where = condition;
    return this;
  }
  
  build() {
    return `SELECT ${this.query.select} FROM ${this.query.from} WHERE ${this.query.where}`;
  }
}

// Usage
const query = new QueryBuilder()
  .select('name, email')
  .from('users')
  .where('age > 18')
  .build();

console.log(query);
// Output: SELECT name, email FROM users WHERE age > 18
```

---

## Structural Design Patterns

### 1. Proxy Pattern

Provides a surrogate or placeholder for another object to control access to it.

#### Use Case
- Lazy loading
- Access control
- Caching
- Logging

#### Implementation

```javascript
class RealImage {
  constructor(filename) {
    this.filename = filename;
    this.loadFromDisk();
  }
  
  loadFromDisk() {
    console.log(`Loading ${this.filename} from disk...`);
  }
  
  display() {
    console.log(`Displaying ${this.filename}`);
  }
}

class ProxyImage {
  constructor(filename) {
    this.filename = filename;
    this.realImage = null;
  }
  
  display() {
    // Lazy loading - only load when needed
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename);
    }
    this.realImage.display();
  }
}

// Usage
const image = new ProxyImage('photo.jpg');
// Image not loaded yet
image.display(); // Loads and displays
image.display(); // Just displays (already loaded)
```

---

### 2. Adapter Pattern

Allows incompatible interfaces to work together.

#### Use Case
- Integrating third-party libraries
- Legacy code integration
- API compatibility layers

#### Implementation

```javascript
// Old interface
class OldCalculator {
  operations(num1, num2, operation) {
    switch(operation) {
      case 'add': return num1 + num2;
      case 'sub': return num1 - num2;
    }
  }
}

// New interface
class NewCalculator {
  add(num1, num2) {
    return num1 + num2;
  }
  
  subtract(num1, num2) {
    return num1 - num2;
  }
}

// Adapter
class CalculatorAdapter {
  constructor() {
    this.newCalc = new NewCalculator();
  }
  
  operations(num1, num2, operation) {
    switch(operation) {
      case 'add':
        return this.newCalc.add(num1, num2);
      case 'sub':
        return this.newCalc.subtract(num1, num2);
    }
  }
}

// Usage
const calc = new CalculatorAdapter();
console.log(calc.operations(5, 3, 'add')); // 8
```

---

### 3. Decorator Pattern

Adds new functionality to objects dynamically without altering their structure.

#### Use Case
- Adding features to objects
- Middleware in Express.js
- Logging and monitoring

#### Implementation

```javascript
class Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Simple coffee';
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ', sugar';
  }
}

// Usage
let myCoffee = new Coffee();
console.log(myCoffee.description(), '-', myCoffee.cost()); // Simple coffee - 5

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description(), '-', myCoffee.cost()); // Simple coffee, milk - 7

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description(), '-', myCoffee.cost()); // Simple coffee, milk, sugar - 8
```

---

## Behavioral Design Patterns

### 1. Observer Pattern

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

#### Use Case
- Event handling systems
- Pub/Sub systems
- Real-time notifications
- State management

#### Implementation

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} received: ${data}`);
  }
}

// Usage
const subject = new Subject();

const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notify('Hello Observers!');
// Output:
// Observer 1 received: Hello Observers!
// Observer 2 received: Hello Observers!
```

---

### 2. Strategy Pattern

Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

#### Use Case
- Payment processing
- Sorting algorithms
- Validation strategies
- Authentication methods

#### Implementation

```javascript
// Strategies
class CreditCardStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class CryptoStrategy {
  pay(amount) {
    console.log(`Paid ${amount} using Cryptocurrency`);
  }
}

// Context
class PaymentContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  executePayment(amount) {
    this.strategy.pay(amount);
  }
}

// Usage
const payment = new PaymentContext(new CreditCardStrategy());
payment.executePayment(100); // Paid 100 using Credit Card

payment.setStrategy(new PayPalStrategy());
payment.executePayment(200); // Paid 200 using PayPal

payment.setStrategy(new CryptoStrategy());
payment.executePayment(300); // Paid 300 using Cryptocurrency
```

---

### 3. Iterator Pattern

Provides a way to access elements of a collection sequentially without exposing its underlying representation.

#### Use Case
- Traversing collections
- Custom data structures
- Pagination

#### Implementation

```javascript
class Iterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }
  
  hasNext() {
    return this.index < this.items.length;
  }
  
  next() {
    return this.items[this.index++];
  }
  
  reset() {
    this.index = 0;
  }
}

class Collection {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  createIterator() {
    return new Iterator(this.items);
  }
}

// Usage
const collection = new Collection();
collection.addItem('Item 1');
collection.addItem('Item 2');
collection.addItem('Item 3');

const iterator = collection.createIterator();

while(iterator.hasNext()) {
  console.log(iterator.next());
}
// Output:
// Item 1
// Item 2
// Item 3
```

---

### 4. State Pattern

Allows an object to alter its behavior when its internal state changes.

#### Use Case
- Order processing
- Document workflow
- Game character states
- Connection states

#### Implementation

```javascript
class OrderState {
  constructor(order) {
    this.order = order;
  }
}

class PendingState extends OrderState {
  confirm() {
    console.log('Order confirmed');
    this.order.setState(new ConfirmedState(this.order));
  }
  
  cancel() {
    console.log('Order cancelled');
    this.order.setState(new CancelledState(this.order));
  }
}

class ConfirmedState extends OrderState {
  ship() {
    console.log('Order shipped');
    this.order.setState(new ShippedState(this.order));
  }
  
  cancel() {
    console.log('Cannot cancel confirmed order');
  }
}

class ShippedState extends OrderState {
  deliver() {
    console.log('Order delivered');
    this.order.setState(new DeliveredState(this.order));
  }
}

class DeliveredState extends OrderState {
  // Final state
}

class CancelledState extends OrderState {
  // Final state
}

class Order {
  constructor() {
    this.state = new PendingState(this);
  }
  
  setState(state) {
    this.state = state;
  }
  
  confirm() {
    this.state.confirm?.();
  }
  
  ship() {
    this.state.ship?.();
  }
  
  deliver() {
    this.state.deliver?.();
  }
  
  cancel() {
    this.state.cancel?.();
  }
}

// Usage
const order = new Order();
order.confirm(); // Order confirmed
order.ship();    // Order shipped
order.deliver(); // Order delivered
```

---

## Pattern Selection Guide

### When to Use Each Pattern

| Pattern | Use When |
|---------|----------|
| **Singleton** | Need exactly one instance (DB connection, config) |
| **Factory** | Creating objects without specifying exact class |
| **Builder** | Constructing complex objects step by step |
| **Proxy** | Need to control access or add functionality |
| **Adapter** | Making incompatible interfaces work together |
| **Decorator** | Adding responsibilities to objects dynamically |
| **Observer** | One-to-many dependency, event handling |
| **Strategy** | Multiple algorithms for same task |
| **Iterator** | Sequential access to collection elements |
| **State** | Object behavior changes with state |

---

## Best Practices

1. ✅ **Don't Overuse**: Use patterns only when they solve a real problem
2. ✅ **Keep It Simple**: Don't make code more complex than needed
3. ✅ **Understand the Problem**: Choose the right pattern for the situation
4. ✅ **Document Usage**: Explain why you chose a particular pattern
5. ✅ **Combine Patterns**: Patterns can work together
6. ✅ **Refactor Gradually**: Introduce patterns as code evolves

---

## Resources

### Video Tutorial
- [Design Patterns in JavaScript](https://www.youtube.com/watch?v=_Ac7CTHOFMg)

### Books
- "Design Patterns: Elements of Reusable Object-Oriented Software" (Gang of Four)
- "JavaScript Patterns" by Stoyan Stefanov
- "Learning JavaScript Design Patterns" by Addy Osmani

### Online Resources
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [JavaScript Design Patterns](https://www.patterns.dev/)

---

**Master the Patterns! 🎯**