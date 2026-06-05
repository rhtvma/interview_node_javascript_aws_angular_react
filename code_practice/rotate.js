// Question: Find how many right rotations are needed to convert one string into another.
// Example: chocolate -> echocolat -> techocola -> atechocol ... -> olatechoc

const rotate = (input) => {
  if (input.length <= 1) {
    return input;
  }

  return input[input.length - 1] + input.slice(0, -1);
};

const countRotations = (source, target) => {
  if (source.length !== target.length) {
    return -1;
  }

  let result = source;
  let count = 0;

  for (let index = 0; index < source.length; index += 1) {
    if (result === target) {
      return count;
    }

    result = rotate(result);
    count += 1;
  }

  return -1;
};

console.log(countRotations("chocolate", "olatechoc"));

// Output: 5
// Reason: Five right rotations convert "chocolate" into "olatechoc".
