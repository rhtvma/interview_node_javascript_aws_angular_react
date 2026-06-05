// References:
// - Original note: https://bonsaiden.github.io/JavaScript-Garden/#object
// - Current mirror: https://shamansir.github.io/JavaScript-Garden/en/#object

// ------------------------------- 1. constructor property ------------------------------------
// Question: What will be printed?

function FooConstructorExample() {}

var constructorExample = new FooConstructorExample();
console.log(constructorExample.constructor);

// Output: [Function: FooConstructorExample]
// Reason: The instance inherits the constructor property from FooConstructorExample.prototype.

// ------------------------------- 2. forEach cannot be broken ------------------------------------
// Question: Can we use break inside forEach?

var numbersForEach = [1, 2, 3, 4, 5];

numbersForEach.forEach((value) => {
  "use strict";

  if (value === 3) {
    // break; // SyntaxError: Illegal break statement
    return;
  }

  console.log("forEach value:", value);
});

// Output:
// forEach value: 1
// forEach value: 2
// forEach value: 4
// forEach value: 5
// Reason: return skips only the current callback execution. It does not stop forEach.

// ------------------------------- 3. deleting a defined variable ------------------------------------
// Question: What happens when deleting implicit globals and var variables?

x = 42; // creates a configurable property on the global object
var y = 43; // creates a non-configurable global binding

console.log(delete x);
console.log(delete y);

// Output:
// true
// false

var deleteExampleA = 0;
deleteExampleB = 0;

(function () {
  console.log(delete deleteExampleB);
  console.log(deleteExampleA);

  try {
    console.log(deleteExampleB);
  } catch (error) {
    console.log(error.name);
  }
})();

// Output:
// true
// 0
// ReferenceError
// Reason: deleteExampleB was an implicit global property and was deleted.

// ------------------------------- 4. primitives as temporary objects ------------------------------------
// Question: Why do primitive values have methods?

console.log(false.toString());
console.log([1, 2, 3].toString());

function FunctionIsObjectExample() {}
FunctionIsObjectExample.customValue = 100;

console.log(FunctionIsObjectExample.customValue);

// Output:
// false
// 1,2,3
// 100
// Reason: Most JavaScript values can behave like objects temporarily. Functions are objects too.
// null and undefined are exceptions.

// ------------------------------- 5. number literal dot syntax ------------------------------------
// Question: Why is 2.toString() invalid, but the following examples work?

// console.log(2.toString()); // SyntaxError

console.log((2).toString());
console.log((2).toString());
console.log((2).toString());

// Output:
// 2
// 2
// 2
// Reason: With 2.toString(), the parser treats the dot as part of a number literal.

// ------------------------------- 6. dot notation vs bracket notation ------------------------------------
// Question: When should bracket notation be used?

var propertyExample = {
  name: "kitten",
  "user-role": "admin",
  1234: "numeric key",
};

var dynamicKey = "name";

console.log(propertyExample.name);
console.log(propertyExample[dynamicKey]);
console.log(propertyExample["user-role"]);
console.log(propertyExample[1234]);

// Output:
// kitten
// kitten
// admin
// numeric key
// Reason: Bracket notation supports dynamic keys and keys that are not valid identifiers.

// ------------------------------- 7. delete vs null vs undefined ------------------------------------
// Question: Which property is actually removed?

var deletePropertyExample = {
  bar: 1,
  foo: 2,
  baz: 3,
};

deletePropertyExample.bar = undefined;
deletePropertyExample.foo = null;
delete deletePropertyExample.baz;

console.log(Object.keys(deletePropertyExample));
console.log("baz" in deletePropertyExample);

// Output:
// [ 'bar', 'foo' ]
// false
// Reason: Setting a value to undefined or null keeps the key. delete removes the key.

// ------------------------------- 8. prototype property lookup ------------------------------------
// Question: Where does JavaScript find inherited properties?

var prototypeParent = {
  role: "admin",
};

var prototypeChild = Object.create(prototypeParent);
prototypeChild.name = "Amit";

console.log(prototypeChild.name);
console.log(prototypeChild.role);
console.log(prototypeChild.missingValue);

// Output:
// Amit
// admin
// undefined
// Reason: JavaScript first checks the object itself, then walks up the prototype chain.

// ------------------------------- 9. own property vs inherited property ------------------------------------
// Question: What is the difference between "in" and hasOwnProperty?

var hasOwnParent = {
  inheritedValue: 10,
};

var hasOwnChild = Object.create(hasOwnParent);
hasOwnChild.ownValue = undefined;

console.log("inheritedValue" in hasOwnChild);
console.log(hasOwnChild.hasOwnProperty("inheritedValue"));
console.log("ownValue" in hasOwnChild);
console.log(hasOwnChild.hasOwnProperty("ownValue"));

// Output:
// true
// false
// true
// true
// Reason: "in" checks the object and prototype chain. hasOwnProperty checks only the object itself.

// ------------------------------- 10. safe hasOwnProperty call ------------------------------------
// Question: What if an object overrides hasOwnProperty?

var dangerousObject = {
  hasOwnProperty: function () {
    return false;
  },
  name: "Policy Bazar",
};

console.log(dangerousObject.hasOwnProperty("name"));
console.log(Object.prototype.hasOwnProperty.call(dangerousObject, "name"));

// Output:
// false
// true
// Reason: The object's own hasOwnProperty method can be shadowed. Use Object.prototype.hasOwnProperty.call.

// ------------------------------- 11. for in includes inherited enumerable properties ------------------------------------
// Question: Why should for in loops be filtered?

var forInParent = {
  inheritedName: "parent",
};

var forInChild = Object.create(forInParent);
forInChild.ownName = "child";

for (var key in forInChild) {
  console.log("without filter:", key);
}

for (var ownKey in forInChild) {
  if (Object.prototype.hasOwnProperty.call(forInChild, ownKey)) {
    console.log("with filter:", ownKey);
  }
}

// Output:
// without filter: ownName
// without filter: inheritedName
// with filter: ownName
// Reason: for in walks enumerable properties on the prototype chain too.

// ------------------------------- 12. arrays are objects ------------------------------------
// Question: Why is for in not preferred for arrays?

var arrayIterationExample = [10, 20, 30];
arrayIterationExample.customProperty = "extra";

for (var arrayKey in arrayIterationExample) {
  console.log("for in array key:", arrayKey);
}

for (var index = 0; index < arrayIterationExample.length; index += 1) {
  console.log("normal array value:", arrayIterationExample[index]);
}

// Output:
// for in array key: 0
// for in array key: 1
// for in array key: 2
// for in array key: customProperty
// normal array value: 10
// normal array value: 20
// normal array value: 30
// Reason: Arrays are objects, so for in can include custom enumerable properties.

// ------------------------------- 13. function declaration vs function expression ------------------------------------
// Question: Which function can be called before its definition?

console.log(declaredFunction());

try {
  console.log(functionExpression());
} catch (error) {
  console.log(error.name);
}

function declaredFunction() {
  return "declaration works before definition";
}

var functionExpression = function () {
  return "expression works only after assignment";
};

console.log(functionExpression());

// Output:
// declaration works before definition
// TypeError
// expression works only after assignment
// Reason: Function declarations are hoisted with their body. var declarations are hoisted as undefined.

// ------------------------------- 14. losing this when method is assigned ------------------------------------
// Question: What happens when an object method is assigned to a variable?

var thisExample = {
  name: "Node.js",
  printName: function () {
    return this.name;
  },
};

var detachedPrintName = thisExample.printName;

console.log(thisExample.printName());
console.log(detachedPrintName());
console.log(thisExample.printName.call({ name: "Angular" }));

// Output in non-strict mode:
// Node.js
// undefined
// Angular
// Reason: this is based on how a function is called, not where it was defined.

// ------------------------------- 15. closure in loop with var ------------------------------------
// Question: Why does var print the final loop value?

var closureFunctions = [];

for (var closureIndex = 0; closureIndex < 3; closureIndex += 1) {
  closureFunctions.push(function () {
    return closureIndex;
  });
}

console.log(closureFunctions[0]());
console.log(closureFunctions[1]());
console.log(closureFunctions[2]());

// Output:
// 3
// 3
// 3
// Reason: var is function scoped, so all functions close over the same variable.

var fixedClosureFunctions = [];

for (let fixedIndex = 0; fixedIndex < 3; fixedIndex += 1) {
  fixedClosureFunctions.push(function () {
    return fixedIndex;
  });
}

console.log(fixedClosureFunctions[0]());
console.log(fixedClosureFunctions[1]());
console.log(fixedClosureFunctions[2]());

// Output:
// 0
// 1
// 2
// Reason: let creates a new block-scoped binding for each loop iteration.

// ------------------------------- 16. typeof surprises ------------------------------------
// Question: What are the outputs?

console.log(typeof null);
console.log(typeof []);
console.log(typeof {});
console.log(typeof function () {});
console.log(typeof missingVariable);

// Output:
// object
// object
// object
// function
// undefined
// Reason: typeof has historical quirks, but it is safe for checking undeclared variables.

// ------------------------------- 17. reliable object type check ------------------------------------
// Question: How do we reliably detect Array, Date, and Null?

function getObjectType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getObjectType([]));
console.log(getObjectType(new Date()));
console.log(getObjectType(null));
console.log(getObjectType(undefined));

// Output:
// Array
// Date
// Null
// Undefined
// Reason: Object.prototype.toString gives the internal object tag.

// ------------------------------- 18. == type coercion ------------------------------------
// Question: What are the outputs?

console.log(10 == "10");
console.log(10 === "10");
console.log(null == undefined);
console.log(null === undefined);
console.log(new Number(10) == 10);
console.log(new Number(10) === 10);

// Output:
// true
// false
// true
// false
// true
// false
// Reason: == allows type coercion. === compares value and type.
