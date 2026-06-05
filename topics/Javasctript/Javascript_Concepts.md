# JavaScript Concepts - Interview Ready

## Table of Contents
1. [Data Types & Variables](#data-types--variables)
2. [Functions](#functions)
3. [Closures](#closures)
4. [Scope & Hoisting](#scope--hoisting)
5. [this Keyword](#this-keyword)
6. [Prototypes & Inheritance](#prototypes--inheritance)
7. [Asynchronous JavaScript](#asynchronous-javascript)
8. [Event Loop](#event-loop)
9. [ES6+ Features](#es6-features)
10. [DOM Manipulation](#dom-manipulation)
11. [Error Handling](#error-handling)
12. [Design Patterns](#design-patterns)

---

## Data Types & Variables

**Description:** JavaScript has two categories of data types: primitive types (immutable, stored by value) and reference types (mutable, stored by reference). Understanding the difference is crucial for avoiding bugs and writing efficient code. Variables can be declared using `var`, `let`, or `const`, each with different scoping rules and behaviors.

**Key Concepts:**
- 7 primitive types: String, Number, Boolean, Undefined, Null, Symbol, BigInt
- Reference types: Objects, Arrays, Functions
- Variable declarations: var (function-scoped), let (block-scoped), const (block-scoped, immutable binding)
- Type coercion and checking
- Truthy and falsy values

### Primitive Types
```javascript
// 7 Primitive Types
let str = "Hello";           // String
let num = 42;                // Number
let bool = true;             // Boolean
let undef = undefined;       // Undefined
let nul = null;              // Null
let sym = Symbol('id');      // Symbol (ES6)
let bigInt = 123n;           // BigInt (ES2020)
```

### Reference Types
```javascript
let obj = { name: "John" };  // Object
let arr = [1, 2, 3];         // Array
let func = function() {};    // Function
let date = new Date();       // Date
let regex = /pattern/;       // RegExp
```

### Variable Declaration
```javascript
// var: function-scoped, hoisted, can redeclare
var x = 1;
var x = 2; // OK

// let: block-scoped, not hoisted, cannot redeclare
let y = 1;
// let y = 2; // Error

// const: block-scoped, not hoisted, cannot reassign
const z = 1;
// z = 2; // Error

// But objects/arrays can be mutated
const obj = { a: 1 };
obj.a = 2; // OK
```

### Type Checking
```javascript
typeof "hello"              // "string"
typeof 42                   // "number"
typeof true                 // "boolean"
typeof undefined            // "undefined"
typeof null                 // "object" (bug!)
typeof Symbol()             // "symbol"
typeof {}                   // "object"
typeof []                   // "object"
typeof function(){}         // "function"

// Better array check
Array.isArray([])           // true

// Better null check
value === null              // true

// Check for NaN
Number.isNaN(NaN)           // true
```

### Type Coercion
```javascript
// Implicit coercion
"5" + 3        // "53" (string concatenation)
"5" - 3        // 2 (numeric subtraction)
"5" * "2"      // 10 (numeric multiplication)
true + 1       // 2
false + 1      // 1
"" == false    // true
"0" == false   // true
null == undefined  // true

// Explicit coercion
String(123)    // "123"
Number("123")  // 123
Boolean(0)     // false
parseInt("123px")  // 123
parseFloat("12.5")  // 12.5
```

### Truthy & Falsy Values
```javascript
// Falsy values (only 8)
false
0
-0
0n
""
null
undefined
NaN

// Everything else is truthy
"0"        // truthy
"false"    // truthy
[]         // truthy
{}         // truthy
function(){} // truthy
```

---

## Functions

**Description:** Functions are first-class citizens in JavaScript, meaning they can be assigned to variables, passed as arguments, and returned from other functions. JavaScript supports multiple ways to define functions, each with different characteristics regarding hoisting, `this` binding, and syntax.

**Key Concepts:**
- Function declarations vs expressions
- Arrow functions and lexical `this`
- IIFE (Immediately Invoked Function Expressions)
- Higher-order functions (functions that take or return functions)
- Default parameters, rest parameters, and spread operator
- Function hoisting and scope

### Function Declaration
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Function Expression
```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### Arrow Functions (ES6)
```javascript
// Single parameter, single expression
const square = x => x * x;

// Multiple parameters
const add = (a, b) => a + b;

// Multiple statements
const greet = name => {
  const message = `Hello, ${name}!`;
  return message;
};

// No parameters
const sayHi = () => "Hi!";

// Arrow functions don't have their own 'this'
const obj = {
  name: "John",
  greet: function() {
    setTimeout(() => {
      console.log(this.name); // 'this' refers to obj
    }, 1000);
  }
};
```

### IIFE (Immediately Invoked Function Expression)
```javascript
(function() {
  console.log("I run immediately!");
})();

// With parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})("John");

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();
```

### Higher-Order Functions
```javascript
// Function that returns a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplier(2);
double(5); // 10

// Function that takes a function
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, console.log); // 0, 1, 2
```

### Default Parameters
```javascript
function greet(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
greet(); // "Hello, Guest!"
greet("John"); // "Hello, John!"
```

### Rest Parameters
```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
sum(1, 2, 3, 4); // 10
```

### Spread Operator
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Function arguments
Math.max(...[1, 5, 3]); // 5
```

---

## Closures

**Description:** A closure is a function that retains access to variables from its outer (enclosing) scope, even after the outer function has finished executing. Closures are created every time a function is created and are fundamental to JavaScript's functional programming capabilities. They enable data privacy, function factories, and maintain state in asynchronous operations.

**Key Concepts:**
- Functions remember their lexical scope
- Inner functions have access to outer function variables
- Closures enable data encapsulation and privacy
- Common use cases: callbacks, event handlers, module pattern
- Memory considerations: closures keep references to outer variables

### What is a Closure?
A closure is a function that has access to variables in its outer (enclosing) scope, even after the outer function has returned.

```javascript
function outer() {
  let count = 0;
  
  function inner() {
    count++;
    console.log(count);
  }
  
  return inner;
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

### Practical Uses

#### 1. Data Privacy
```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);   // 150
account.withdraw(30);  // 120
account.getBalance();  // 120
// account.balance is not accessible
```

#### 2. Function Factory
```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10
triple(5); // 15
```

#### 3. Event Handlers
```javascript
function setupButtons() {
  for (let i = 0; i < 5; i++) {
    const button = document.createElement('button');
    button.textContent = `Button ${i}`;
    
    // Closure captures 'i'
    button.addEventListener('click', function() {
      console.log(`Button ${i} clicked`);
    });
    
    document.body.appendChild(button);
  }
}
```

---

## Scope & Hoisting

**Description:** Scope determines the accessibility of variables, functions, and objects in different parts of your code. JavaScript has function scope, block scope, and global scope. Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution, which can lead to unexpected behavior if not understood properly.

**Key Concepts:**
- Global scope: accessible everywhere
- Function scope: accessible within function (var)
- Block scope: accessible within block {} (let, const)
- Hoisting: var and function declarations are moved to top
- Temporal Dead Zone (TDZ): period where let/const exist but can't be accessed
- Best practice: use let/const instead of var

### Scope Types
```javascript
// Global scope
var globalVar = "I'm global";

function outer() {
  // Function scope
  var functionVar = "I'm in function";
  
  if (true) {
    // Block scope (let/const only)
    let blockVar = "I'm in block";
    var functionVar2 = "I'm also in function";
  }
  
  console.log(functionVar2); // OK
  // console.log(blockVar); // Error
}
```

### Hoisting
```javascript
// Variable hoisting (var)
console.log(x); // undefined (not error)
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;

// let/const are not hoisted
// console.log(y); // ReferenceError
let y = 5;

// Function hoisting
greet(); // "Hello!" (works)
function greet() {
  console.log("Hello!");
}

// Function expressions are not hoisted
// sayHi(); // TypeError
var sayHi = function() {
  console.log("Hi!");
};
```

### Temporal Dead Zone (TDZ)
```javascript
{
  // TDZ starts
  // console.log(x); // ReferenceError
  // console.log(y); // ReferenceError
  
  let x = 1; // TDZ ends for x
  const y = 2; // TDZ ends for y
}
```

---

## this Keyword

**Description:** The `this` keyword refers to the object that is executing the current function. Its value depends on how the function is called, not where it's defined. Understanding `this` is crucial for object-oriented programming in JavaScript and is a common source of bugs for beginners.

**Key Concepts:**
- Global context: `this` refers to global object (window/global)
- Object method: `this` refers to the object
- Constructor: `this` refers to the new instance
- Arrow functions: `this` is lexically inherited from enclosing scope
- call/apply/bind: explicitly set `this` value
- Event handlers: `this` refers to the element (regular functions)

### Global Context
```javascript
console.log(this); // Window (browser) or global (Node.js)
```

### Object Method
```javascript
const person = {
  name: "John",
  greet: function() {
    console.log(this.name); // "John"
  }
};
person.greet();
```

### Constructor Function
```javascript
function Person(name) {
  this.name = name;
}
const john = new Person("John");
console.log(john.name); // "John"
```

### Arrow Functions
```javascript
const obj = {
  name: "John",
  greet: () => {
    console.log(this.name); // undefined (arrow functions don't have 'this')
  }
};
```

### call, apply, bind
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: "John" };

// call: invoke immediately with arguments
greet.call(person, "Hello", "!"); // "Hello, John!"

// apply: invoke immediately with array
greet.apply(person, ["Hi", "?"]); // "Hi, John?"

// bind: return new function with bound 'this'
const boundGreet = greet.bind(person);
boundGreet("Hey", "!"); // "Hey, John!"
```

### Event Handlers
```javascript
const button = document.querySelector('button');

// Regular function: 'this' is the button
button.addEventListener('click', function() {
  console.log(this); // <button>
});

// Arrow function: 'this' is lexical
button.addEventListener('click', () => {
  console.log(this); // Window or outer context
});
```

---

## Prototypes & Inheritance

**Description:** JavaScript uses prototypal inheritance, where objects can inherit properties and methods from other objects through the prototype chain. Every object has an internal link to another object called its prototype. ES6 introduced class syntax as syntactic sugar over prototypal inheritance, making it more familiar to developers from class-based languages.

**Key Concepts:**
- Every object has a prototype (except Object.prototype)
- Prototype chain: objects inherit from their prototype
- Constructor functions and `new` keyword
- ES6 class syntax (syntactic sugar)
- `extends` for inheritance
- `super` to call parent constructor/methods
- Static methods belong to the class, not instances

### Prototype Chain
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const john = new Person("John");
john.greet(); // "Hello, I'm John"

// Prototype chain
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

### Class Syntax (ES6)
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  static species() {
    return "Homo sapiens";
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
  
  study() {
    console.log(`${this.name} is studying`);
  }
}

const student = new Student("John", 20, "A");
student.greet(); // "Hello, I'm John"
student.study(); // "John is studying"
```

### Object.create()
```javascript
const personProto = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const john = Object.create(personProto);
john.name = "John";
john.greet(); // "Hello, I'm John"
```

---

## Asynchronous JavaScript

**Description:** JavaScript is single-threaded but can handle asynchronous operations through callbacks, promises, and async/await. Asynchronous programming allows non-blocking code execution, essential for handling I/O operations, API calls, timers, and events without freezing the application.

**Key Concepts:**
- Callbacks: functions passed as arguments
- Callback hell: nested callbacks (pyramid of doom)
- Promises: objects representing eventual completion/failure
- Promise states: pending, fulfilled, rejected
- Promise methods: all, race, allSettled, any
- Async/await: syntactic sugar for promises
- Error handling with try/catch

### Callbacks
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data); // "Data received" after 1 second
});
```

### Callback Hell
```javascript
// ❌ Bad: Pyramid of doom
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});
```

### Promises
```javascript
// Creating a promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Success!");
    } else {
      reject("Error!");
    }
  }, 1000);
});

// Consuming a promise
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));
```

### Promise Chaining
```javascript
fetch('https://api.example.com/user')
  .then(response => response.json())
  .then(user => fetch(`https://api.example.com/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

### Promise Methods
```javascript
// Promise.all: Wait for all promises
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results))
  .catch(error => console.error(error));

// Promise.race: First to settle
Promise.race([promise1, promise2])
  .then(result => console.log(result));

// Promise.allSettled: Wait for all, regardless of outcome
Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));

// Promise.any: First to fulfill
Promise.any([promise1, promise2])
  .then(result => console.log(result));
```

### Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Parallel execution
async function fetchMultiple() {
  const [users, posts] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json())
  ]);
  console.log(users, posts);
}
```

---

## Event Loop

**Description:** The Event Loop is JavaScript's mechanism for handling asynchronous operations in a single-threaded environment. It continuously checks the call stack and task queues, executing code in a specific order. Understanding the event loop is crucial for writing efficient asynchronous code and avoiding blocking operations.

**Key Concepts:**
- Call Stack: executes synchronous code (LIFO)
- Web APIs: browser-provided async operations (setTimeout, fetch, DOM events)
- Callback Queue (Task Queue): holds callbacks from async operations
- Microtask Queue: holds promises, higher priority than callback queue
- Event Loop: moves tasks from queues to call stack when empty
- Execution order: Call Stack → Microtasks → Macrotasks

### Call Stack, Web APIs, Callback Queue
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2
// Explanation:
// 1. Synchronous code runs first (1, 4)
// 2. Microtasks (Promises) run next (3)
// 3. Macrotasks (setTimeout) run last (2)
```

### Microtasks vs Macrotasks
```javascript
// Microtasks (higher priority)
Promise.resolve().then(() => {});
queueMicrotask(() => {});
MutationObserver callback

// Macrotasks (lower priority)
setTimeout(() => {}, 0);
setInterval(() => {}, 0);
setImmediate(() => {}); // Node.js only
I/O operations
```

### Event Loop Phases (Node.js)
1. **Timers**: setTimeout, setInterval
2. **Pending callbacks**: I/O callbacks
3. **Idle, prepare**: Internal use
4. **Poll**: Retrieve new I/O events
5. **Check**: setImmediate callbacks
6. **Close callbacks**: socket.on('close')

---

## ES6+ Features

**Description:** ES6 (ECMAScript 2015) and later versions introduced significant improvements to JavaScript, making it more powerful, expressive, and easier to write. These features include destructuring, template literals, arrow functions, classes, modules, promises, and many syntactic enhancements that modernize the language.

**Key Concepts:**
- Destructuring: extract values from arrays/objects
- Template literals: string interpolation and multi-line strings
- Enhanced object literals: shorthand properties and methods
- Modules: import/export for code organization
- Optional chaining (?.): safe property access
- Nullish coalescing (??): default values for null/undefined
- Symbols: unique identifiers
- Generators: pausable functions with yield

### Destructuring
```javascript
// Array destructuring
const [a, b, ...rest] = [1, 2, 3, 4, 5];
// a = 1, b = 2, rest = [3, 4, 5]

// Object destructuring
const { name, age, city = "Unknown" } = person;

// Nested destructuring
const { address: { street, city } } = person;

// Function parameters
function greet({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
```

### Template Literals
```javascript
const name = "John";
const age = 30;

// String interpolation
const message = `Hello, ${name}! You are ${age} years old.`;

// Multi-line strings
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}<strong>${values[i] || ''}</strong>`;
  }, '');
}
const message = highlight`Hello, ${name}!`;
```

### Enhanced Object Literals
```javascript
const name = "John";
const age = 30;

// Property shorthand
const person = { name, age };

// Method shorthand
const obj = {
  greet() {
    console.log("Hello!");
  }
};

// Computed property names
const prop = "name";
const obj = {
  [prop]: "John",
  [`${prop}Upper`]: "JOHN"
};
```

### Modules (ES6)
```javascript
// export.js
export const name = "John";
export function greet() {}
export default class Person {}

// import.js
import Person, { name, greet } from './export.js';
import * as utils from './utils.js';
import { name as userName } from './export.js';
```

### Optional Chaining (?.)
```javascript
const user = {
  name: "John",
  address: {
    street: "Main St"
  }
};

// Without optional chaining
const city = user && user.address && user.address.city;

// With optional chaining
const city = user?.address?.city; // undefined (no error)

// Function calls
obj.method?.(); // Only calls if method exists

// Array access
arr?.[0]; // Only accesses if arr exists
```

### Nullish Coalescing (??)
```javascript
const value = null ?? "default"; // "default"
const value = undefined ?? "default"; // "default"
const value = 0 ?? "default"; // 0 (not "default")
const value = "" ?? "default"; // "" (not "default")

// vs OR operator
const value = 0 || "default"; // "default"
const value = "" || "default"; // "default"
```

### Symbols
```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');
sym1 === sym2; // false (unique)

// Use as object keys
const obj = {
  [sym1]: "value"
};

// Well-known symbols
Symbol.iterator
Symbol.toStringTag
Symbol.hasInstance
```

### Generators
```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Infinite generator
function* infiniteNumbers() {
  let i = 0;
  while (true) {
    yield i++;
  }
}
```

### Proxy & Reflect
```javascript
const target = { name: "John" };

const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const proxy = new Proxy(target, handler);
proxy.name; // "Getting name"
proxy.name = "Jane"; // "Setting name to Jane"
```

---

## DOM Manipulation

**Description:** The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page structure as a tree of objects that can be manipulated with JavaScript. DOM manipulation is essential for creating dynamic, interactive web pages by selecting, creating, modifying, and removing elements.

**Key Concepts:**
- Selecting elements: getElementById, querySelector, querySelectorAll
- Creating elements: createElement, createTextNode
- Modifying elements: innerHTML, textContent, classList
- Attributes vs Properties: getAttribute/setAttribute vs direct property access
- Event handling: addEventListener, removeEventListener
- Event delegation: handling events on parent elements
- Performance: minimize reflows and repaints

### Selecting Elements
```javascript
// Single element
document.getElementById('id');
document.querySelector('.class');
document.querySelector('#id');

// Multiple elements
document.getElementsByClassName('class');
document.getElementsByTagName('div');
document.querySelectorAll('.class');
```

### Creating & Modifying Elements
```javascript
// Create
const div = document.createElement('div');
div.textContent = "Hello";
div.innerHTML = "<strong>Hello</strong>";
div.className = "container";
div.id = "main";

// Append
document.body.appendChild(div);
parent.insertBefore(newNode, referenceNode);
element.insertAdjacentHTML('beforeend', '<p>Text</p>');

// Remove
element.remove();
parent.removeChild(child);

// Clone
const clone = element.cloneNode(true); // deep clone
```

### Attributes & Properties
```javascript
// Attributes
element.getAttribute('data-id');
element.setAttribute('data-id', '123');
element.removeAttribute('data-id');
element.hasAttribute('data-id');

// Properties
element.id = 'main';
element.className = 'container';
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
element.classList.contains('active');

// Data attributes
element.dataset.userId = '123';
const userId = element.dataset.userId;
```

### Event Handling
```javascript
// Add event listener
element.addEventListener('click', function(event) {
  console.log(event.target);
  event.preventDefault();
  event.stopPropagation();
});

// Remove event listener
const handler = () => console.log('clicked');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);

// Event delegation
document.addEventListener('click', function(event) {
  if (event.target.matches('.button')) {
    console.log('Button clicked');
  }
});
```

---

## Error Handling

**Description:** Error handling is crucial for building robust applications that can gracefully handle unexpected situations. JavaScript provides try...catch...finally blocks for synchronous error handling and special patterns for async errors. Proper error handling improves user experience and makes debugging easier.

**Key Concepts:**
- try...catch...finally: handle synchronous errors
- throw: create custom errors
- Error types: Error, TypeError, ReferenceError, SyntaxError, RangeError
- Async error handling: try/catch with async/await, .catch() with promises
- Error objects: message, name, stack properties
- Best practices: fail fast, provide meaningful error messages

### try...catch...finally
```javascript
try {
  // Code that might throw an error
  const result = riskyOperation();
} catch (error) {
  // Handle the error
  console.error(error.message);
} finally {
  // Always executes
  cleanup();
}
```

### Throwing Errors
```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

// Custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

throw new ValidationError("Invalid input");
```

### Error Types
```javascript
try {
  // Different error types
  throw new Error("Generic error");
  throw new TypeError("Type error");
  throw new ReferenceError("Reference error");
  throw new SyntaxError("Syntax error");
  throw new RangeError("Range error");
} catch (error) {
  if (error instanceof TypeError) {
    console.log("Type error occurred");
  } else if (error instanceof ReferenceError) {
    console.log("Reference error occurred");
  }
}
```

### Async Error Handling
```javascript
// Promises
promise
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw if needed
  }
}
```

---

## Design Patterns

### Module Pattern

**Description:** The Module Pattern is used to create private and public encapsulation for classes. It uses closures to create private variables and methods, exposing only a public API. This pattern helps organize code, prevents global namespace pollution, and provides data privacy.

**Use Cases:**
- Creating libraries with private implementation details
- Organizing related functionality
- Preventing variable name conflicts
- Data encapsulation and privacy

```javascript
const Module = (function() {
  // Private variables
  let privateVar = "I'm private";
  
  // Private function
  function privateMethod() {
    console.log(privateVar);
  }
  
  // Public API
  return {
    publicMethod() {
      privateMethod();
    },
    publicVar: "I'm public"
  };
})();

Module.publicMethod();
```

### Singleton Pattern

**Description:** The Singleton Pattern ensures that a class has only one instance and provides a global point of access to it. It's useful when exactly one object is needed to coordinate actions across the system.

**Use Cases:**
- Database connections
- Configuration objects
- Logging services
- Cache management
- Thread pools

```javascript
const Singleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      name: "Singleton",
      method() {}
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
```

### Observer Pattern

**Description:** The Observer Pattern defines a one-to-many dependency between objects so that when one object (subject) changes state, all its dependents (observers) are notified and updated automatically. Also known as Pub/Sub (Publish-Subscribe) pattern.

**Use Cases:**
- Event handling systems
- Real-time data updates
- Model-View synchronization
- Notification systems
- State management (like Redux)

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
  update(data) {
    console.log("Received:", data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
subject.subscribe(observer1);
subject.notify("Hello"); // "Received: Hello"
```

### Factory Pattern

**Description:** The Factory Pattern provides an interface for creating objects without specifying their exact classes. It encapsulates object creation logic and returns instances based on input parameters, promoting loose coupling and flexibility.

**Use Cases:**
- Creating objects with complex initialization
- Managing object creation based on conditions
- Hiding implementation details
- Creating different types of similar objects
- Plugin systems

```javascript
class Car {
  constructor(type) {
    this.type = type;
  }
}

class CarFactory {
  createCar(type) {
    switch(type) {
      case 'sedan':
        return new Car('Sedan');
      case 'suv':
        return new Car('SUV');
      default:
        return new Car('Unknown');
    }
  }
}

const factory = new CarFactory();
const sedan = factory.createCar('sedan');
```

---

## Common Interview Questions

**Description:** This section covers frequently asked JavaScript interview questions that test fundamental understanding of the language. These questions help assess knowledge of core concepts, best practices, and common pitfalls. Mastering these topics is essential for technical interviews and demonstrates solid JavaScript proficiency.

**Key Topics:**
- Type coercion and equality operators
- Event propagation mechanisms
- Variable declarations and scoping
- Closures and lexical scope
- Asynchronous programming patterns
- Prototypal inheritance
- Function context binding
- Array manipulation methods

### 1. What is the difference between == and ===?
- `==` performs type coercion before comparison
- `===` checks both value and type (strict equality)

### 2. Explain event bubbling and capturing
- **Bubbling**: Event propagates from target to root
- **Capturing**: Event propagates from root to target
- Use `event.stopPropagation()` to stop propagation

### 3. What is the difference between null and undefined?
- `undefined`: Variable declared but not assigned
- `null`: Intentional absence of value

### 4. What is a closure?
A function that has access to variables in its outer scope, even after the outer function has returned.

### 5. Explain the event loop
The event loop handles asynchronous operations by managing the call stack, callback queue, and microtask queue.

### 6. What is the difference between let, const, and var?
- `var`: Function-scoped, hoisted, can redeclare
- `let`: Block-scoped, not hoisted, cannot redeclare
- `const`: Block-scoped, not hoisted, cannot reassign

### 7. What is prototypal inheritance?
Objects inherit properties and methods from other objects through the prototype chain.

### 8. What is the difference between call, apply, and bind?
- `call`: Invoke immediately with arguments
- `apply`: Invoke immediately with array
- `bind`: Return new function with bound context

### 9. What is a promise?
An object representing the eventual completion or failure of an asynchronous operation.

### 10. What is the difference between map, filter, and reduce?
- `map`: Transform each element
- `filter`: Select elements based on condition
- `reduce`: Accumulate elements into single value

---

## Array Methods

**Description:** JavaScript arrays come with powerful built-in methods for manipulation, iteration, and transformation. Understanding these methods is crucial for writing clean, functional code. They enable declarative programming patterns and reduce the need for manual loops.

**Categories:**
- **Iteration Methods**: forEach, map, filter, reduce, find, findIndex, some, every
- **Modification Methods**: push, pop, shift, unshift, splice, slice
- **Transformation Methods**: concat, reverse, sort, join
- **Search Methods**: includes, indexOf, lastIndexOf
- **Modern Methods**: flat, flatMap, from, of

**Key Concepts:**
- Immutability vs mutation (map/filter vs push/pop)
- Chaining methods for complex transformations
- Performance considerations
- Callback function patterns

### Iteration Methods
```javascript
const arr = [1, 2, 3, 4, 5];

// forEach: Execute function for each element
arr.forEach((item, index) => console.log(item));

// map: Transform each element
const doubled = arr.map(x => x * 2); // [2, 4, 6, 8, 10]

// filter: Select elements
const evens = arr.filter(x => x % 2 === 0); // [2, 4]

// reduce: Accumulate
const sum = arr.reduce((acc, x) => acc + x, 0); // 15

// find: First matching element
const found = arr.find(x => x > 3); // 4

// findIndex: Index of first match
const index = arr.findIndex(x => x > 3); // 3

// some: At least one matches
const hasEven = arr.some(x => x % 2 === 0); // true

// every: All match
const allPositive = arr.every(x => x > 0); // true
```

### Modification Methods
```javascript
const arr = [1, 2, 3];

// push: Add to end
arr.push(4); // [1, 2, 3, 4]

// pop: Remove from end
arr.pop(); // [1, 2, 3]

// unshift: Add to start
arr.unshift(0); // [0, 1, 2, 3]

// shift: Remove from start
arr.shift(); // [1, 2, 3]

// splice: Add/remove at index
arr.splice(1, 1, 'a', 'b'); // [1, 'a', 'b', 3]

// slice: Extract portion
const sliced = arr.slice(1, 3); // ['a', 'b']

// concat: Combine arrays
const combined = arr.concat([4, 5]); // [1, 'a', 'b', 3, 4, 5]

// reverse: Reverse in place
arr.reverse(); // [3, 'b', 'a', 1]

// sort: Sort in place
arr.sort((a, b) => a - b);
```

---

## Resources
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [Eloquent JavaScript](https://eloquentjavascript.net/)