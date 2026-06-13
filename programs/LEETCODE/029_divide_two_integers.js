/*
Problem:
Divide two signed integers without using multiplication, division, or modulo.
Clamp overflow to the signed 32-bit range.

Sample:
Input: dividend = 10, divisor = 3
Output: 3

Input: dividend = 7, divisor = -3
Output: -2

Solution:
Use repeated doubling with bit shifts to subtract large chunks of the divisor.

Time: O(log n)
Space: O(1)
*/

function divide(dividend, divisor) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;
  if (dividend === INT_MIN && divisor === -1) return INT_MAX;

  const negative = (dividend < 0) !== (divisor < 0);
  let a = Math.abs(dividend);
  let b = Math.abs(divisor);
  let result = 0;

  while (a >= b) {
    let value = b;
    let multiple = 1;

    while (value + value <= a) {
      value += value;
      multiple += multiple;
    }

    a -= value;
    result += multiple;
  }

  return negative ? -result : result;
}

/*
Explanation:
Doubling finds the largest divisor multiple that can be removed each round,
similar to long division in binary.
*/
