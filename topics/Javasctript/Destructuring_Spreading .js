// # Destructuring
console.log("..... Array Destructuring")

// What is Array Destructuring in JavaScript?
// Let's say we have an array that contains five numbers, like this:
let array1 = [1, 2, 3, 4, 5]
// To get the elements from the array, we can do something like getting the number according to its indexes:
// array1[0];
// array1[1];
// array1[2];
// array1[3];
// array1[4];

// But this method is old and clunky, and there is a better way to do it – using array destructuring. It looks like this:

let [indexOne, indexTwo, indexThree, indexFour, indexFive] = array1;

console.log(indexOne, indexTwo, indexThree, indexFour, indexFive)

let [indexOne1, indexTwo2, , indexFour4, indexFive5] = array1;
// Here, we have skipped indexThird, and there's an empty space between indexTwo and indexFour.

console.log(indexOne1, indexTwo2, indexFour4, indexFive5)

console.log("Object Destructuring")

// What is Object Destructuring in JavaScript?
// This destructuring works well with objects too. Let me give you an example.
let object = {
    name: "Nishant",
    age: 24,
    salary: 200,
    height: '20 meters',
    weight: '70 KG'
}
// Let's say we want the name, salary, and weight from this object to be printed out in the console.

// console.log(object.name)
// console.log(object.salary)
// console.log(object.weight)
// We can get them using the keys, which are name, salary, and weight.

// But this code becomes difficult to understand sometimes. That's when destructuring comes in handy:

let { name, salary, weight } = object;
console.log(name)
console.log(salary)
console.log(weight)

console.log("============================================================================================================")

// # Spread Operator
console.log("..... Spread Operator")

// Spread Operator in JavaScript?
// Spread means spreading or expanding. And the spread operator in JavaScript is denoted by three dots.

// This spread operator has many different uses. Let's see them one by one.

// Spread Operator Examples
// Let's say we have two arrays and we want to merge them.

let array101 = [1, 2, 3, 4, 5]
let array102 = [6, 7, 8, 9, 10]

let array103 = array101.concat(array102);
console.log("Concat method", array103)

// We are getting the combination of both arrays, which are array1 and array2.

// But there is an easier way to do this:

let array1011 = [1, 2, 3, 4, 5]
let array1012 = [6, 7, 8, 9, 10]

let array1013 = [...array1011, ...array1012]
console.log("Spread Operator method", array1013)

// We can do something like this:
let array10111 = [1, 2, 3, 4, 5]
let array10112 = [6, 7, ...array10111, 8, 9, 10, 11, 12, ...[13, 14, 15]]

console.log(array10112);

console.log("Spread operator on Object")

// We have two objects here. One contains firstName, age, and salary. The second one contains lastName, height, and weight.

// Let's merge them together.

let object1 = {
    firstName: "Nishant",
    age: 24,
    salary: 300,
}

let object2 = {
    lastName: "Kumar",
    height: '20 meters',
    weight: '70 KG'
}

let object3 = { ...object1, ...object2 }
console.log(object3);


// REST operator 
const arr = [1,2,3,4,5]
const ab = (...params) => {  //<= this is REST operator here

}

ab(...arr) // <= this is spread operator