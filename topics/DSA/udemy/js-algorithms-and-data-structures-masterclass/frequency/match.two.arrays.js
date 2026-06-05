/************************************************************************
 * Write a function called same, which accepts two arrays.
 * The function should return true when every value in the first array has its corresponding squared value in the second array.
 * The frequency of values must be the same.
 *
 *same([1,2,3], [4,1,9]) // true
 *same([1,2,3], [4,9]) // false
 *same([1,2,1], [4,4,1]) // false (must be of same frequency)
 *************************************************************************/

/************************************************************************
 * Solution 1
 * - check if both arrays are equal or not
 * - Loop over one of the array, and find index in second array
 * - Return Object at end
 *
 * Time Complexity: n**2
 *************************************************************************/
function sameSolution1(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    const currentIndex = arr2.indexOf(arr1[i] ** 2); // this is second for loop, worst thing to do
    if (currentIndex === -1) {
      return false;
    }
    arr2.splice(currentIndex, 1);
  }
  return true;
}

console.log(sameSolution1([1, 2, 3], [4, 1, 9]));
/*************************************************************************
 * Output
 * true
 *
 * Note: A nested loop is not considered a good solution for large inputs.
 *************************************************************************/

/************************************************************************
 * Solution 2
 * - Will remove second loop from solution 1
 *
 * - Make objects to return at the end.
 *
 * Time Complexity: O(n)
 *************************************************************************/
function sameSolution2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }

  for (let key in frequencyCounter1) {
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  return true;
}

console.log(sameSolution2([1, 2, 3], [4, 1, 9]));
/*************************************************************************
 * Output
 * true
 *
 * Note: This is the best solution because there is no nested loop.
 *************************************************************************/
