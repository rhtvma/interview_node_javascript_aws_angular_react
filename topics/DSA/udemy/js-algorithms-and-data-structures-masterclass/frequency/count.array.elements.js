/************************************************************************
 * Write a function called array element frequency count, which accepts one array.
 * The function should return each element with its occurrence count.
 *************************************************************************/

/*************************************************************************
 * Solution 1
 * - Make an object to return at the end.
 * - Loop over array, for each elements
 * - if element is already in object then increment counter
 * - Return Object at end
 *************************************************************************/
const arrayEl = ["a", "a", "a", 2, 3, 4, 2, 2, 3, 4, 2, 2, 4];

function elementCount(arr) {
  let result = {};
  for (let el of arr) {
    if (result[el] > 0) {
      result[el]++;
    } else {
      result[el] = 1;
    }
  }
  return result;
}

console.log(elementCount(arrayEl));
/*************************************************************************
 * Output
 * { '2': 5, '3': 2, '4': 3, a: 3 }
 *
 *************************************************************************/
