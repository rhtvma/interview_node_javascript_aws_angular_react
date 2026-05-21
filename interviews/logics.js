// LINK: https://bonsaiden.github.io/JavaScript-Garden/#object

// -------------------------------1------------------------------------
function foo() {}
var var1 = new foo();
console.log(var1.constructor);
//output : [Function: foo]

// -------------------------------2------------------------------------/
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

array.forEach((value) => {
  "use strict";
  if (value === 3) {
    // break; // error
    return;
  }
  console.log("hello");
});
//output : SyntaxError: Illegal break statement
//Reason : You can't break from a forEach
// -------------------------------3 deleting a defined variable ------------------------------------

x = 42; // creates the property x on the global object
var y = 43; // creates the property y on the global object, and marks it as non-configurable

// x is a property of the global object and can be deleted
delete x; // returns true

// y is not configurable, so it cannot be deleted
delete y; // returns false

// example : link(https://stackoverflow.com/questions/33239464/javascript-delete-object-property-not-working)

var a = 0;
b = 0;
(function () {
  console.log(delete b);
  console.log(a);
  console.log(b);
})();

//output :
//   true
//   0
//   console.log(b);
//               ^
//   ReferenceError: b is not defined

// -------------------------------4------------------------------------
//
//output :
// -------------------------------5------------------------------------
