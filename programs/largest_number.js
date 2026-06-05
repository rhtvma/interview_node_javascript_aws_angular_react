var array1 = [2, 3, 4, 5, 3, 2, 4, 5, 6, 98, 3, 2, 2, 4, 5, 5];

// Find the largest number without using Math.max.
function highestNumber(array) {
  if (array.length === 0) {
    return null;
  }

  var maxNumber = array[0];

  for (var i = 0; i < array.length; i++) {
    var currentElement = array[i];

    if (maxNumber < currentElement) {
      maxNumber = currentElement;
    }
  }

  return maxNumber;
}

console.log(highestNumber(array1));

// Output: 98
