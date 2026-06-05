// # Destructuring
console.log("..... Array Destructuring");

// Array destructuring lets us unpack array values into variables.
let array1 = [1, 2, 3, 4, 5];

let [indexOne, indexTwo, indexThree, indexFour, indexFive] = array1;
console.log(indexOne, indexTwo, indexThree, indexFour, indexFive);

let [indexOne1, indexTwo2, , indexFour4, indexFive5] = array1;
console.log(indexOne1, indexTwo2, indexFour4, indexFive5);

// Output:
// 1 2 3 4 5
// 1 2 4 5

// # Object Destructuring
console.log("Object Destructuring");

let object = {
  name: "Nishant",
  age: 24,
  salary: 200,
  height: "20 meters",
  weight: "70 KG",
};

let { name, salary, weight } = object;
console.log(name);
console.log(salary);
console.log(weight);

// Output:
// Nishant
// 200
// 70 KG

console.log(
  "============================================================================================================",
);

// # Spread Operator
console.log("..... Spread Operator");

// Spread expands arrays or objects into another array/object/function call.
let array101 = [1, 2, 3, 4, 5];
let array102 = [6, 7, 8, 9, 10];

let array103 = array101.concat(array102);
console.log("Concat method", array103);

let array1011 = [1, 2, 3, 4, 5];
let array1012 = [6, 7, 8, 9, 10];

let array1013 = [...array1011, ...array1012];
console.log("Spread Operator method", array1013);

let array10111 = [1, 2, 3, 4, 5];
let array10112 = [6, 7, ...array10111, 8, 9, 10, 11, 12, ...[13, 14, 15]];
console.log(array10112);

console.log("Spread operator on Object");

let object1 = {
  firstName: "Nishant",
  age: 24,
  salary: 300,
};

let object2 = {
  lastName: "Kumar",
  height: "20 meters",
  weight: "70 KG",
};

let object3 = { ...object1, ...object2 };
console.log(object3);

// # Rest Operator
// Rest collects multiple values into one array.
const arr = [1, 2, 3, 4, 5];

const collectValues = (...params) => {
  console.log(params);
};

collectValues(...arr);

// Interview point:
// Spread expands values. Rest collects values.
