// S LICE = Gives part of array & NO splitting original array

// SP LICE = Gives part of array & SPlitting original array

//slice
var array1=[1,2,3,4,5]
console.log(array1.slice(2));

//splice
var array2=[1,2,3,4,5];
console.log(array2.splice(2));


console.log("----after-----");
console.log(array1);
console.log(array2);

// Output
// [ 3, 4, 5 ]
// [ 3, 4, 5 ]
// ----after-----
// [ 1, 2, 3, 4, 5 ]
// [ 1, 2 ]


var array=[1,2,3,4,5];
console.log(array.splice(2, 2));
// Output - [ 3, 4 ]