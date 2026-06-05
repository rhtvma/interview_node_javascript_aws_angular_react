/*
Function Expression
    It is similar to a function declaration without the function name. 
    Function expressions can be stored in a variable assignment. 
*/

const mul = function (x, y) {
  return x * y;
};
console.log(mul(4, 5));

// ------------------------------------------------------------

/*
Arrow Functions
    Arrow functions are a concise syntax for writing functions, introduced in ES6, 
    and they do not bind their own this context.
*/

const a = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

const a2 = a.map(function (s) {
  return s.length;
});

console.log("Normal way ", a2);

const a3 = a.map((s) => s.length);

console.log("Using Arrow Function ", a3);

// ------------------------------------------------------------

/*
Immediately Invoked Function Expression (IIFE)
    IIFE functions are executed immediately after their definition. 
    They are often used to create isolated scopes.
*/

(function () {
  console.log("This runs immediately!");
})();

// ------------------------------------------------------------

/*
Callback Functions
    A callback function is passed as an argument to another function
    and is executed after the completion of that function.
*/

function num(n, callback) {
  return callback(n);
}

const double = (n) => n * 2;

console.log(num(5, double));

// ------------------------------------------------------------

/*
Anonymous Functions
    Anonymous functions are functions without a name. 
    They are often used as arguments to other functions.
*/
setTimeout(function () {
  console.log("Anonymous function executed!");
}, 1000);
