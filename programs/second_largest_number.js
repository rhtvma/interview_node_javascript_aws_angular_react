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
