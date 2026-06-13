/*
Problem:
Compute x raised to integer power n.

Sample:
Input: x = 2, n = 10
Output: 1024

Input: x = 2, n = -2
Output: 0.25

Solution:
Use fast exponentiation by repeatedly squaring the base.

Time: O(log n)
Space: O(1)
*/

function myPow(x, n) {
  let power = Math.abs(n);
  let base = x;
  let result = 1;

  while (power > 0) {
    if (power % 2 === 1) result *= base;
    base *= base;
    power = Math.floor(power / 2);
  }

  return n < 0 ? 1 / result : result;
}

/*
Explanation:
Exponent bits decide which squared bases contribute to the result. Negative
exponents are handled by taking the reciprocal at the end.
*/

