/**
Closures
  A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). 
  In other words, a closure gives you access to an outer function's scope from an inner function. In JavaScript, 
  closures are created every time a function is created, at function creation time.
 */

function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // Mozilla

/**
  The reason is that functions in JavaScript form closures. 
  A closure is the combination of a function and the lexical environment within which that function was declared.
  This environment consists of any local variables that were in-scope at the time the closure was created.
  In this case, myFunc is a reference to the instance of the function displayName that is created when makeFunc is run. 
  The instance of displayName maintains a reference to its lexical environment, within which the variable name exists. For this reason, 
  when myFunc is invoked, the variable name remains available for use, and "Mozilla" is passed to console.log
 */

//  ================================ ANOTHER EXAMPLE ================================

const counter = (function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }

  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
})();

console.log(counter.value()); // 0.

counter.increment();
counter.increment();
console.log(counter.value()); // 2.

counter.decrement();
console.log(counter.value()); // 1.

//
// https://www.youtube.com/watch?v=QyUFheng6J0&t=1008s

function makeAdder(n) {
  var inc = n;
  var sum = 0;
  return function add() {
    sum = sum + inc;
    console.log(sum);
    return sum;
  };
}

var adder3 = makeAdder(3);
adder3();
adder3();
adder3();

/**
    Output
    3
    6
    9
  */
