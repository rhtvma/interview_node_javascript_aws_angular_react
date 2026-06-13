/*
Problem:
Multiply two non-negative integers given as strings and return the product as a
string.

Sample:
Input: num1 = "2", num2 = "3"
Output: "6"

Input: num1 = "123", num2 = "456"
Output: "56088"

Solution:
Simulate grade-school multiplication with an array of digit positions.

Time: O(m * n)
Space: O(m + n)
*/

function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";

  const result = Array(num1.length + num2.length).fill(0);

  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const product = Number(num1[i]) * Number(num2[j]);
      const sum = product + result[i + j + 1];

      result[i + j + 1] = sum % 10;
      result[i + j] += Math.floor(sum / 10);
    }
  }

  while (result[0] === 0) result.shift();
  return result.join("");
}

/*
Explanation:
The product of digits at i and j contributes to positions i + j and i + j + 1,
matching manual multiplication carry placement.
*/

