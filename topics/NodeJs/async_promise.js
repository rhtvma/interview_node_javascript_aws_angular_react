/**
      Key Differences:

      Syntax: 
      ------
      Promises use .then() and .catch() chaining, while async/await uses async and await keywords to make asynchronous code look more like synchronous code.
      
      Readability: 
      ------------
      async/await generally improves readability, especially for complex sequences of asynchronous operations, as it avoids deeply nested .then() calls (callback hell).
      
      Error Handling: 
      ---------------
      Promises use .catch() for error handling. async/await uses standard try...catch blocks, 
      which can feel more natural to developers familiar with synchronous error handling.
      
      Execution Flow: 
      ---------------
      When await is encountered, the async function pauses, but the main thread (event loop) remains unblocked, allowing other tasks to run. 
      In contrast, with Promises, the code after the Promise creation continues to execute synchronously, 
      and the Promise's callback is placed in the microtask queue to be processed later.
 */
