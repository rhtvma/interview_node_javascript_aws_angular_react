function maxOcc(array) {
  if (array.length === 0) return null;

  var modeMap = {};
  var maxElement = array[0]
  var maxCount = 1;

  for (var i = 0; i < array.length; i++) {
    var el = array[i];

    if (modeMap[el] == null) {
      modeMap[el] = 1;
    } else {
      modeMap[el] += 1;
    }

    if (modeMap[el] > maxCount) {
      maxElement = el;
      maxCount = modeMap[el];
    }
  }

  return {
    element: maxElement,
    count: maxCount,
  };
}

var array1 = [2, 3, 4, 3, 7, 7, 7];
console.log("Maximum repeated number:", maxOcc(array1));

// Output: { element: 7, count: 3 }
