// Include process module
const process = require("process");
/**
    As you try to understand the Node.js event loop, one important part of it is process.nextTick(). Every time the event loop takes a full trip, we call it a tick.

    When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current operation, before the next event loop tick starts:
 * 


console.log('Hello => number 1');

setImmediate(() => {
    console.log('Running before the timeout => number 3');
});

setTimeout(() => {
    console.log('The timeout running last => number 4');
}, 0);

process.nextTick(() => {
    console.log('Running at next tick => number 2');
});
 */

/** OUTPUT
    Hello => number 1
    Running at next tick => number 2
    Running before the timeout => number 3
    The timeout running last => number 4
 */

/**
    Return Value:
    The event loop is busy processing the current function code. When this operation ends, the JS engine runs all the functions passed to nextTick calls during that operation.
    It's the way we can tell the JS engine to process a function asynchronously (after the current function), but as soon as possible, not queue it.
    Calling setTimeout(() => {}, 0) will execute the function at the end of next tick, much later than when using nextTick() which prioritizes the call and executes it just before the beginning of the next tick.
    Use nextTick() when you want to make sure that in the next event loop iteration that code is already executed.
 */

// EXAMPLE 2
process.nextTick(() => {
  console.log("Executed in the next iteration");
});

console.log("Executed in the current iteration");

/** OUTPUT
    Executed in the current iteration
    Executed in the next iteration
 */

/**
    Return Value:
    In the code of snippet, the second console is printed first because this is a part of the current iteration of the event loop, 
    and the first console is a part of a callback function that is associated with the process.nextTick() executed in the next iteration of the event loop.
 */
