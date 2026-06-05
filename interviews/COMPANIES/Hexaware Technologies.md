# Hexaware Technologies Interview Questions - October 2025

## 1. What Is Node.js?

Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It allows JavaScript to run outside the browser, mainly for building backend services, APIs, command-line tools, real-time applications, and microservices.

Key points:

- Uses V8 to execute JavaScript.
- Uses an event-driven, non-blocking I/O model.
- Works well for I/O-heavy applications.
- Has a large package ecosystem through npm.

Example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js');
});

server.listen(3000);
```

## 2. How Does Node.js Work If It Is Single-Threaded?

Node.js runs JavaScript code on a single main thread, but it can still handle many concurrent requests because it uses asynchronous, non-blocking I/O.

How it works:

1. JavaScript code runs on the main thread.
2. I/O tasks such as file reads, database calls, network calls, and timers are delegated to the operating system or libuv.
3. When the async task completes, its callback is placed in the event loop queue.
4. The event loop picks the callback and executes it on the main thread.

Node.js is single-threaded for JavaScript execution, but internally it uses libuv and a thread pool for some async operations.

Example:

```js
console.log('Start');

setTimeout(() => {
  console.log('Timer completed');
}, 0);

console.log('End');
```

Output:

```txt
Start
End
Timer completed
```

## 3. How Do You Optimize CPU Usage in Node.js?

Node.js is excellent for I/O-heavy work, but CPU-heavy work can block the event loop. Since modern CPUs have multiple cores, we can optimize Node.js applications by using multiple processes or worker threads.

Common approaches:

| Approach | Use Case |
| --- | --- |
| Cluster module | Run multiple Node.js processes across CPU cores |
| Worker threads | Run CPU-heavy JavaScript work in separate threads |
| Child processes | Execute separate processes for heavy tasks |
| Load balancer | Distribute traffic across multiple Node.js instances |
| Queue system | Move heavy work to background jobs |
| Native addons | Use optimized native code for performance-critical work |

Example using worker threads:

```js
const { Worker } = require('worker_threads');

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: data,
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
```

For production APIs, also use caching, database indexing, pagination, compression, and proper logging/monitoring.

## 4. What Is a Callback?

A callback is a function passed as an argument to another function. It is called later, usually after an asynchronous operation completes.

Example:

```js
const fs = require('fs');

fs.readFile('data.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
});
```

In Node.js, callbacks commonly follow the error-first pattern:

```js
function callback(error, result) {
  if (error) {
    // handle error
  }

  // use result
}
```

## 5. Why Did Promises Come Into the Picture?

Promises were introduced to make asynchronous code easier to read, compose, and manage compared to deeply nested callbacks.

Problems with callbacks:

- Callback hell or pyramid of doom.
- Harder error handling.
- Difficult chaining of async operations.
- Reduced readability in complex flows.

Promise example:

```js
getUser(userId)
  .then((user) => getOrders(user.id))
  .then((orders) => getPaymentDetails(orders))
  .then((paymentDetails) => console.log(paymentDetails))
  .catch((error) => console.error(error));
```

With `async` / `await`:

```js
async function getUserPaymentDetails(userId) {
  try {
    const user = await getUser(userId);
    const orders = await getOrders(user.id);
    return await getPaymentDetails(orders);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

## 6. Difference Between Callback and Promise

| Callback | Promise |
| --- | --- |
| Function passed to another function | Object representing future completion or failure |
| Can lead to nested code | Supports clean chaining |
| Error handling is manual | Centralized error handling with `.catch()` |
| No built-in state | Has `pending`, `fulfilled`, and `rejected` states |
| Harder to compose | Easy to compose with `Promise.all`, `Promise.race`, etc. |

Callback example:

```js
getUser(1, (error, user) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(user);
});
```

Promise example:

```js
getUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(error));
```

## 7. Difference Between `Promise.all` and `Promise.allSettled`

| Feature | `Promise.all` | `Promise.allSettled` |
| --- | --- | --- |
| Success behavior | Resolves when all promises resolve | Resolves after all promises finish |
| Failure behavior | Rejects immediately when one promise rejects | Does not reject because of individual promise failure |
| Result | Array of resolved values | Array of status objects |
| Best use | All tasks are required to succeed | Need result of every task, success or failure |

Example using `Promise.all`:

```js
Promise.all([getUser(), getOrders(), getPayments()])
  .then(([user, orders, payments]) => {
    console.log(user, orders, payments);
  })
  .catch((error) => {
    console.error('One request failed:', error);
  });
```

Example using `Promise.allSettled`:

```js
Promise.allSettled([getUser(), getOrders(), getPayments()]).then((results) => {
  results.forEach((result) => {
    if (result.status === 'fulfilled') {
      console.log('Success:', result.value);
    } else {
      console.log('Failed:', result.reason);
    }
  });
});
```

Use `Promise.all` when every operation is mandatory. Use `Promise.allSettled` when you want to know the outcome of every operation even if some fail.
