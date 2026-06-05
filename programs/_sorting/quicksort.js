var array = [7, 2, 9, 1, 5, 6, 2];

function quicksort(data) {
  if (data.length === 0) return [];

  var left = [],
    right = [],
    pivot = data[0];

  for (var i = 1; i < data.length; i++) {
    if (data[i] < pivot) left.push(data[i]);
    else right.push(data[i]);
  }

  return quicksort(left).concat(pivot, quicksort(right));
}

console.log(quicksort(array));
