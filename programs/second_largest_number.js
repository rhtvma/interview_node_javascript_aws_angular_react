var myArray = [12, 35, 1, 10, 34, 1];

// Find the second largest distinct number in one pass.
function secondLargestNumber(numbers) {
  if (numbers.length < 2) {
    return null;
  }

  var largest = -Infinity;
  var secondLargest = -Infinity;

  for (var i = 0; i < numbers.length; i++) {
    var current = numbers[i];

    if (current > largest) {
      secondLargest = largest;
      largest = current;
    } else if (current > secondLargest && current !== largest) {
      secondLargest = current;
    }
  }

  return secondLargest === -Infinity ? null : secondLargest;
}

console.log(secondLargestNumber(myArray));

// Output: 34


// ============================ ANOTHER EXAMPLE ============================

var biggest = myArray[0];
var nextbiggest = myArray[0];
for (var i = 0; i < myArray.length; i++) {
  if (myArray[i] > biggest) {
    nextbiggest = biggest;
    biggest = myArray[i];
  }
  else if (myArray[i] > nextbiggest && myArray[i] != biggest)
    nextbiggest = myArray[i];
}

console.log(nextbiggest) 