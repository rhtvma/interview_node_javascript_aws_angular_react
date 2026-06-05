//  Callback functions are used for Asynchronous events. Whenever any asynchronous
//  event has to be done it is generally preferred to use callbacks (if data is not nested or inter-dependent).

//  What are Promises?
//  A promise is basically an advancement of callbacks in Node.
//  In other words, a promise is a JavaScript object which is used to handle all the asynchronous data operations.
//  While developing an application you may encounter that you are using a lot of nested callback functions.


// # KEY NOTE
// It’s recommended to use for..of loop if it is required to wait for each promise to complete or to run the asynchronous operations sequentially for each item.
// map, forEach these will not stop for another iteration. but for..of will stop

// All these methods take array of promises as an input but deals differently with respect to their behavior.
// Promise.all()
// Promise.allSettled()
// Promise.race()
// Promise.any()

console.log("=============== [ Promise.all() ] ===============")
// ALL PROMISES MUST BE RESOLVED FOR IT TO RETURN A RESPONSE.

const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1 resolved"), 1000)
);
const promise2 = new Promise((resolve, reject) =>
    setTimeout(() => resolve("Promise 2 resolved"), 500)
);
const promise3 = new Promise((resolve, reject) =>
    setTimeout(() => reject("Promise 3 rejected"), 800)
);

const promisesArray = [promise1, promise2, promise3];

Promise.all(promisesArray)
    .then((results) => {
        console.log("all() - All promises resolved:", results);
    })
    .catch((error) => {
        console.error("all() - At least one promise rejected:", error);
    });

// Output 1 - All promises resolved: [ 'Promise 1 resolved', 'Promise 2 resolved', 'Promise 3 rejected' ]

// Output 2 - At least one promise rejected: Promise 3 rejected

console.log("=============== [ Promise.allSettled() ] ===============")
// Promise.allSettled method is used to handle multiple promises concurrently, just like Promise.all, 
// but it waits for all the promises to settle (either resolve or reject) before proceeding. 
// It returns an array of objects representing the outcomes of the input promises, 
// including their values or reasons for rejection.

// Promise.allSettled() always returns array of objects with status key which denotes fulfilled or rejected.
//  If a promise is fulfilled then you can get response with value key and if the promise is rejected 
// then you can find the reason in reason key.

const promise11 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1 resolved"), 1000)
);
const promise22 = new Promise((_, reject) =>
    setTimeout(() => reject("Promise 2 resolved"), 500)
);
const promise33 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 3 resolved"), 800)
);

const promisesArray1 = [promise11, promise22, promise33];

Promise.allSettled(promisesArray1).then((results) => {
    console.log( "allSettled() -All promises settled:", results);
});

// Output 1 - 
// All promises settled: [
//     { status: 'fulfilled', value: 'Promise 1 resolved' },
//     { status: 'rejected', reason: 'Promise 2 resolved' },
//     { status: 'fulfilled', value: 'Promise 3 resolved' }
//   ]

console.log("=============== [ Promise.race() ] ===============")

// As the name suggests, race returns first promise with shortest delay whether it is resolved or rejected.

// For example if there are 5 promises which returns result like this:
// Promise 1 ==> 1 second (rejected)
// Promise 2 ==> 2 seconds (rejected)
// Promise 3 ==> 3 seconds (resolved)
// Promise 4 ==> 4 seconds (resolved)
// Promise 5 ==> 5 seconds (resolved)

// So, it will return us Promise 1 because it was the first one being returned.

const promise111 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1 resolved"), 1000)
);
const promise122 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 2 resolved"), 500)
);
const promise133 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 3 resolved"), 800)
);

const promisesArray000 = [promise111, promise122, promise133];

Promise.race(promisesArray000)
    .then((results) => {
        console.log("race() - First promise resolved:", results);
    })
    .catch((error) => {
        console.error("race() - At least one promise rejected:", error);
    });

// Output 1 -
// First promise resolved: Promise 2 resolved

// NOTE :  Please note: race does not care if all are resolved or all are rejected. 
// It will give you first settled result whether it is resolved or rejected.

console.log("=============== [ Promise.any() ] ===============")

// It is somewhat similar to race method but with few minor differences:

// It will return with first resolved promise.
// For example if there are 5 promises which returns result like this:
// Promise 1 ==> 1 second (rejected)
// Promise 2 ==> 2 seconds (rejected)
// Promise 3 ==> 3 seconds (resolved)
// Promise 4 ==> 4 seconds (resolved)
// Promise 5 ==> 5 seconds (resolved)

// So, it will return us Promise 3 because it was the first one being resolved.

// If all promises are rejected, it will give you an aggregated error.
// For example if there are 5 promises which returns result like this:
// Promise 1 ==> 1 second (rejected)
// Promise 2 ==> 2 seconds (rejected)
// Promise 3 ==> 3 seconds (rejected)
// Promise 4 ==> 4 seconds (rejected)
// Promise 5 ==> 5 seconds (rejected)

// So, now it will return an aggregated result like this:

// [AggregateError: All promises were rejected]

const promise1111 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1 resolved"), 1000)
);
const promise1222 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 2 resolved"), 500)
);
const promise1333 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 3 resolved"), 800)
);

const promisesArray0000 = [promise1111, promise1222, promise1333];

Promise.any(promisesArray0000)
    .then((results) => {
        console.log("any() - First promise resolved:", results);
    })
    .catch((error) => {
        console.error("any() - At least one promise rejected:", error);
    });
// Output 1 -
// First promise resolved: Promise 2 resolved


// case of all promises being rejected with promise.any:
// At least one promise rejected: [AggregateError: All promises were rejected] {
//     [errors]: [ 'Promise 1 rejected', 'Promise 2 rejected', 'Promise 3 rejected' ]