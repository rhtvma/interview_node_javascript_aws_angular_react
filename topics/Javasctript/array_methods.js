// slice() returns part of an array without changing the original array.
// splice() removes/replaces/adds elements and changes the original array.

// ------------------------------- slice() -------------------------------
var array1 = [1, 2, 3, 4, 5];
console.log(array1.slice(2));

// Output: [3, 4, 5]

// ------------------------------- splice() -------------------------------
var array2 = [1, 2, 3, 4, 5];
console.log(array2.splice(2));

console.log("----after-----");
console.log(array1);
console.log(array2);

// Output:
// [3, 4, 5]
// ----after-----
// [1, 2, 3, 4, 5]
// [1, 2]

var array3 = [1, 2, 3, 4, 5];
console.log(array3.splice(2, 2));

// Output: [3, 4]
