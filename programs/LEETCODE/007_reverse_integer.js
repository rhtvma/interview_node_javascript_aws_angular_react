/*
Problem:
Reverse the digits of a signed 32-bit integer. Return 0 if the reversed value
would go outside the signed 32-bit range.

Sample:
Input: x = 123
Output: 321

Input: x = -120
Output: -21

Solution:
Repeatedly pop the last digit and append it to the reversed result. Check the
final range before returning.

Time: O(log10(n))
Space: O(1)
*/

function reverse(x) {
  const sign = x < 0 ? -1 : 1;
  let num = Math.abs(x);
  let reversed = 0;

  while (num > 0) {
    reversed = reversed * 10 + (num % 10);
    num = Math.floor(num / 10);
  }

  reversed *= sign;

  if (reversed < -(2 ** 31) || reversed > 2 ** 31 - 1) {
    return 0;
  }

  return reversed;
}

/*
Explanation:
Modulo extracts the current last digit. Multiplying the result by 10 shifts its
digits left before appending the extracted digit.
*/


// ============================ ANOTHER EXAMPLE ============================

function reverseNumber(n) {
  const sign = n < 0 ? -1 : 1;
  let x = Math.abs(n);
  let rev = 0;

  while (x > 0) {
    const digit = x % 10;
    rev = rev * 10 + digit;
    x = Math.floor(x / 10);
  }

  return sign * rev;
}