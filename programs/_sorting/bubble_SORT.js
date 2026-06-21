var array = [32, 25, 18, 5, 9, 3, 8];

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

// Bubble sort repeatedly swaps adjacent values when they are in the wrong order.
// Time complexity: O(n^2), space complexity: O(1).
function bubbleSort(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
}

console.log(bubbleSort(array));

// Output: [3, 5, 8, 9, 18, 25, 32]
