# Silver Push Interview Questions

## 1. Difference Between `window.onload` and `document.ready`

`window.onload` runs after the full page is loaded, including images, stylesheets, scripts, and other assets.

`document.ready` runs when the DOM is ready, before all external assets are necessarily loaded. In jQuery, it is written as:

```js
$(document).ready(() => {
  console.log('DOM is ready');
});
```

Modern JavaScript equivalent:

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
});
```

## 2. Output of JavaScript Expressions

```js
3 + true * 2; // 5
3 * true * 2; // 6
```

Reason: `true` is converted to `1` in numeric operations. Multiplication has higher precedence than addition.

## 3. Difference Between `undefined` and `null`

| `undefined` | `null` |
| --- | --- |
| Variable declared but not assigned | Intentional empty value |
| Assigned by JavaScript by default | Assigned by developer |
| Type is `undefined` | Type is `object` due to legacy behavior |

Example:

```js
let name;
console.log(name); // undefined

let user = null;
console.log(user); // null
```

## 4. Difference Between `==` and `===`

`==` compares values after type conversion. `===` compares both value and type.

```js
0 == false; // true
0 === false; // false
```

Prefer `===` because it avoids unexpected type coercion.

## 5. Benefits of Arrow Functions

Benefits:

- Shorter syntax.
- Lexical `this`, meaning `this` is taken from the surrounding scope.
- Useful for callbacks and array methods.

Example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map((number) => number * 2);
```

Arrow functions should not be used when a dynamic `this` is required, such as some object methods or constructor functions.

## 6. Architecture of AngularJS

AngularJS follows an MVC/MVVM-style architecture.

Main parts:

- Model: Application data.
- View: HTML template.
- Controller: Handles view logic and updates model.
- Scope: Glue between controller and view.
- Services: Reusable business logic.
- Directives: Extend HTML behavior.
- Filters: Format displayed data.

## 7. Factory Methods in JavaScript

A factory function is a function that creates and returns objects without using `new`.

Example:

```js
function createUser(name, role) {
  return {
    name,
    role,
    login() {
      return `${name} logged in`;
    },
  };
}

const user = createUser('Amit', 'admin');
```

Benefits:

- Encapsulation.
- Flexible object creation.
- Avoids constructor complexity.

## 8. What Design Patterns Does Node.js Follow?

Common patterns used in Node.js:

- Module pattern: Each file acts as a module.
- Callback pattern: Function passed to handle async result.
- Event emitter pattern: Used by streams, servers, and custom events.
- Middleware pattern: Used by Express.
- Singleton pattern: Common for shared configuration or database clients.
- Factory pattern: Used to create services or objects.

## 9. Access Parent `ng-repeat` Index Inside Child `ng-repeat`

Use `$parent.$index` to access the parent loop index.

Example:

```html
<div ng-repeat="category in categories track by $index">
  Parent index: {{$index}}

  <div ng-repeat="item in category.items track by $index">
    Parent index: {{$parent.$index}}
    Child index: {{$index}}
  </div>
</div>
```

Better readability:

```html
<div ng-repeat="category in categories track by $index" ng-init="parentIndex = $index">
  <div ng-repeat="item in category.items track by $index">
    Parent index: {{parentIndex}}
    Child index: {{$index}}
  </div>
</div>
```

## 10. Global Variable in Node.js

Node.js has a global object called `global`.

Example:

```js
global.appName = 'Interview App';
console.log(global.appName);
```

However, global variables should be avoided because they make code harder to test and maintain. Prefer modules, configuration files, environment variables, or dependency injection.

## 11. How Node.js Works

Node.js runs JavaScript using the V8 engine and handles asynchronous operations with the event loop and libuv.

Flow:

1. JavaScript code runs on the main thread.
2. Async tasks like file system, timers, and network calls are delegated to libuv or the operating system.
3. When the task completes, its callback is queued.
4. The event loop picks callbacks from queues and executes them.

This model allows Node.js to handle many concurrent I/O operations efficiently.

## 12. How C++ Works With Node.js

Node.js itself is built using C++, JavaScript, V8, and libuv. C++ is used internally for performance-critical runtime features and system-level operations.

Ways C++ works with Node.js:

- V8 executes JavaScript.
- libuv provides the event loop and async I/O.
- Native addons allow developers to expose C++ code to JavaScript.

Example use cases for C++ addons:

- CPU-heavy processing.
- Working with native libraries.
- Performance-sensitive modules.

## 13. Do We Write C++ Code in the V8 Engine?

Usually, application developers do not write code inside the V8 engine. V8 is the JavaScript engine used by Node.js and Chrome.

If a developer needs C++ integration, they normally write a Node.js native addon using tools such as Node-API, not by modifying V8 directly.

## 14. Benefits of `async` / `await`

Benefits:

- Makes asynchronous code easier to read.
- Avoids deeply nested callbacks.
- Works well with `try...catch`.
- Makes Promise-based code look synchronous.

Example:

```js
async function getUser() {
  try {
    const response = await fetch('/api/user');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```
