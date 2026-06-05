const arrayVal = [1, 2, 3, 4];

//  ================================ map() EXAMPLE ================================
{
  /* MAP
      The map() function creates a new array generated from the results of callback function on every element within the array.
  OR
      The map() method in JavaScript creates a new array by calling a specific function on each element of the parent array. It does not mutate the original array.
  */
  const mapResult = arrayVal.map((val) => {
    return val * 2;
  });
  console.log("MAP - 1 ", mapResult);

  // const mapResult2 = arrayVal.map(item => item * 3)
  // console.log("MAP - 2 ", mapResult2)

  /** OUTPUT -
    [ 2, 4, 6, 8 ]
   */
  console.log("MAP - END ---------------------------------", "\n", "\n");
}

//  ================================ filter() EXAMPLE ================================

{
  /* filter
      The filter() method creates a new array with all elements that pass the test set by the callback function.
  OR
      The Array filter() method is used to create a new array from a given array consisting of only those elements from the given array which satisfy a condition set by the argument function

  */
  const filterResult = arrayVal.filter((value) => {
    return value % 2 === 0;
  });

  console.log("filter - 1 ", filterResult);

  // const filterResult = arrayVal.filter(item => item % 2 === 0)
  // console.log("filter - 2 ", filterResult)

  /** OUTPUT -
    [ 2, 4 ]
  */
  console.log("filter - END ---------------------------------", "\n", "\n");
}

//  ================================ forEach EXAMPLE ================================
{
  /* forEach
      The forEach() method executes a callback function once for each array element.
  */
  arrayVal.forEach((item) => {
    console.log("forEach - 1 ", item);
  });

  // arrayVal.forEach(item => console.log("forEach - 2 ", item))

  /** OUTPUT - 
    forEach - 1  1
    forEach - 1  2
    forEach - 1  3
    forEach - 1  4
  */
  console.log("forEach - END ---------------------------------", "\n", "\n");
}

//  ================================ find() EXAMPLE ================================
{
  /* find
      The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. 
      If no values satisfy the testing function, undefined is returned.
  */
  const inventory = [
    { name: "apples", quantity: 2 },
    { name: "bananas", quantity: 0 },
    { name: "cherries", quantity: 5 },
  ];

  function isCherries(fruit) {
    return fruit.name === "cherries";
  }

  console.log("find - 1 ", inventory.find(isCherries));

  /** OUTPUT - 
    { name: 'cherries', quantity: 5 }
  */
  console.log("find - END ---------------------------------", "\n", "\n");
}

//  ================================ reduce() EXAMPLE ================================

/**
  The reduce() method of Array instances executes a user-supplied "reducer" callback function on each element of the array, in order, 
  passing in the return value from the calculation on the preceding element. 
  The final result of running the reducer across all elements of the array is a single value.

The first time that the callback is run there is no "return value of the previous calculation". 
If supplied, an initial value may be used in its place. 
Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).
 */

const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0,
);

console.log("reduce - 1 ", sum);
/** OUTPUT - 
    6
*/
console.log("reduce - END ---------------------------------", "\n", "\n");

var people = [
  { name: "Alice", age: 21, class: "cse" },
  { name: "Max", age: 20, class: "ece" },
  { name: "Min", age: 22, class: "ece" },
  { name: "Jai", age: 22, class: "ece" },
  { name: "Min", age: 22, class: "ece" },
  { name: "Jane", age: 20, class: "mec" },
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, "class");
console.log("reduce - 2 ", groupedPeople);
/** OUTPUT -
{
    cse: [ { name: 'Alice', age: 21, class: 'cse' } ],
    ece: [
      { name: 'Max', age: 20, class: 'ece' },
      { name: 'Min', age: 22, class: 'ece' },
      { name: 'Jai', age: 22, class: 'ece' },
      { name: 'Min', age: 22, class: 'ece' }
    ],
    mec: [ { name: 'Jane', age: 20, class: 'mec' } ]
  }
*/
