/*
Promises handle asynchronous operations in JavaScript.

Interview points:
- A Promise can be pending, fulfilled, or rejected.
- .then() handles fulfillment.
- .catch() handles rejection.
- Promise utility methods help run multiple async operations together.
- Use for...of with await when async tasks must run sequentially.
*/

console.log("=============== [ Promise.all() ] ===============");

// Promise.all() resolves only when all promises resolve.
// If any promise rejects, Promise.all() rejects immediately.
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 1 resolved"), 1000),
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 2 resolved"), 500),
);
const promise3 = new Promise((_, reject) =>
  setTimeout(() => reject("Promise 3 rejected"), 800),
);

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("all() - All promises resolved:", results);
  })
  .catch((error) => {
    console.error("all() - At least one promise rejected:", error);
  });

// Output:
// all() - At least one promise rejected: Promise 3 rejected

console.log("=============== [ Promise.allSettled() ] ===============");

// Promise.allSettled() waits until every promise is either fulfilled or rejected.
// It never rejects because of an individual failed promise.
const promise11 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 1 resolved"), 1000),
);
const promise22 = new Promise((_, reject) =>
  setTimeout(() => reject("Promise 2 rejected"), 500),
);
const promise33 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 3 resolved"), 800),
);

Promise.allSettled([promise11, promise22, promise33]).then((results) => {
  console.log("allSettled() - All promises settled:", results);
});

// Output:
// [
//   { status: 'fulfilled', value: 'Promise 1 resolved' },
//   { status: 'rejected', reason: 'Promise 2 rejected' },
//   { status: 'fulfilled', value: 'Promise 3 resolved' }
// ]

console.log("=============== [ Promise.race() ] ===============");

// Promise.race() returns the first settled promise, whether it resolves or rejects.
const racePromise1 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 1 resolved"), 1000),
);
const racePromise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 2 resolved"), 500),
);
const racePromise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 3 resolved"), 800),
);

Promise.race([racePromise1, racePromise2, racePromise3])
  .then((result) => {
    console.log("race() - First settled promise:", result);
  })
  .catch((error) => {
    console.error("race() - First settled promise rejected:", error);
  });

// Output:
// race() - First settled promise: Promise 2 resolved

console.log("=============== [ Promise.any() ] ===============");

// Promise.any() returns the first fulfilled promise.
// If all promises reject, it rejects with AggregateError.
const anyPromise1 = new Promise((_, reject) =>
  setTimeout(() => reject("Promise 1 rejected"), 1000),
);
const anyPromise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 2 resolved"), 500),
);
const anyPromise3 = new Promise((resolve) =>
  setTimeout(() => resolve("Promise 3 resolved"), 800),
);

Promise.any([anyPromise1, anyPromise2, anyPromise3])
  .then((result) => {
    console.log("any() - First fulfilled promise:", result);
  })
  .catch((error) => {
    console.error("any() - All promises rejected:", error);
  });

// Output:
// any() - First fulfilled promise: Promise 2 resolved
