// [0, 13, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
//     console.log(accumulator, currentValue);
//     return accumulator + currentValue;
// });

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
console.log(groupedPeople);
// groupedPeople is:
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
