var array = [32, 25, 18, 5, 9, 3, 8];

function swap(arr, index1, index2) {
  var temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function bubbleSort() {
  for (var i = 0; i <= array.length; i++) {
    for (var j = 0; j <= array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1);
      }
    }
  }
}

bubbleSort();
console.log(array)


for (let i = object; i < length; i++) {
  for (let j = 0; j < length - i; j++) {
    if (array[j] > array[j + 1]) {
      let temp = array[j]
      array[j] = array[j + 1]
      array[j + 1] = array[j]
    }
  }
}
