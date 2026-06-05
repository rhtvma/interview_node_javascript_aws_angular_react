console.log("A");
console.log("B");

async function abc() {
  return 1;
}

async function abc1() {
  return new Promise((resolve) => {
    resolve(1);
  });
}

setTimeout(() => {
  console.log("C");
}, 0);

abc().then(() => console.log("i am promise")); // Promises have higher priority than setTimeout(), setInterval(), etc.
abc1().then(() => console.log("i am promise 2")); // Promises have higher priority than setTimeout(), setInterval(), etc.

console.log("E");

/** OUTPUT
A
B
E
i am promise
i am promise 2
C
 */

// LINK : https://app.eraser.io/workspace/ButKKPq0lWWtgr79Z2XG?origin=share   {rohit114355}

/** 

What the heck is the event loop anyway?
https://www.youtube.com/watch?v=8aGhZQkoFbQ

JavaScript VM internals, EventLoop, Async and ScopeChains:
https://www.youtube.com/watch?v=QyUFheng6J0&t=1008s

*/
