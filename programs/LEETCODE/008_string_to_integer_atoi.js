/*
Problem:
Convert a string to a signed 32-bit integer using atoi-style parsing: ignore
leading spaces, read an optional sign, then read consecutive digits.

Sample:
Input: s = "   -42"
Output: -42

Input: s = "4193 with words"
Output: 4193

Solution:
Parse the string manually and clamp the result to the signed 32-bit range.

Time: O(n)
Space: O(1)
*/

function myAtoi(s) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;
  let i = 0;
  let sign = 1;
  let result = 0;

  while (i < s.length && s[i] === " ") i++;

  if (s[i] === "+" || s[i] === "-") {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    result = result * 10 + (s.charCodeAt(i) - 48);

    if (sign * result <= INT_MIN) return INT_MIN;
    if (sign * result >= INT_MAX) return INT_MAX;

    i++;
  }

  return sign * result;
}

/*
Explanation:
The parser only accepts a sign before digits and stops at the first non-digit.
Clamping during parsing avoids unnecessary growth.
*/
