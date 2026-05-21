/*
setTimeout(() => {
    console.log('timeout');
}, 0);

setImmediate(() => {
    console.log('immediate');
});
// output:
    timeout
    immediate
*/

// if you move the two calls within an I/O cycle, the immediate callback is always executed first:
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log("timeout");
  }, 0);

  setImmediate(() => {
    console.log("immediate");
  });
});

/*
The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.
*/

// ============================================ Another Example ==========================================================
/*1: setTimeout is simply like calling the function after delay has finished. Whenever a function is called it is not executed immediately, 
           but queued so that it is executed after all the executing and currently queued eventhandlers finish first. 
           setTimeout(,0) essentially means execute after all current functions in the present queue get executed. 
           No guarantees can be made about how long it could take.

2: setImmediate is similar in this regard except that it doesn't use queue of functions. 
           It checks queue of I/O eventhandlers. If all I/O events in the current snapshot are processed, 
           it executes the callback. It queues them immediately after the last I/O handler somewhat like process.nextTick. 
           So it is faster.

Also (setTimeout,0) will be slow because it will check the timer at least once before executing. At times it can be twice as slow. Here is a benchmark.
*/
var Suite = require("benchmark").Suite;

var suite = new Suite();

suite.add(
  "deffered.resolve()",
  function (deferred) {
    deferred.resolve();
  },
  { defer: true },
);

suite.add(
  "setImmediate()",
  function (deferred) {
    setImmediate(function () {
      deferred.resolve();
    });
  },
  { defer: true },
);

suite.add(
  "setTimeout(,0)",
  function (deferred) {
    setTimeout(function () {
      deferred.resolve();
    }, 0);
  },
  { defer: true },
);

suite
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").pluck("name"));
  })
  .run({ async: true });

// Output :
// deffered.resolve() x 993 ops/sec Â±0.67% (22 runs sampled)
// setImmediate() x 914 ops/sec Â±2.48% (57 runs sampled)
// setTimeout(,0) x 445 ops/sec Â±2.79% (82 runs sampled)

/** 
First one gives idea of fastest possible calls. You can check yourself if setTimeout gets called half as many times as other. Also remember setImmediate will adjust to your filesystem calls. So under load it will perform less. I don't think setTimeout can do better.

setTimeout is un-intrusive way of calling functions after some time. Its just like its in the browser. It may not be suited for server-side (think why I used benchmark.js not setTimeout).

*/

// ============================== Another Example ======================================

// http://voidcanvas.com/setimmediate-vs-nexttick-vs-settimeout/

setTimeout(function () {
  console.log("SETTIMEOUT");
});
setImmediate(function () {
  console.log("SETIMMEDIATE");
});

//run it
// node index.js
// OUTPUT
// SETTIMEOUT
// SETIMMEDIATE

// In this setTimeout printed before why ?
