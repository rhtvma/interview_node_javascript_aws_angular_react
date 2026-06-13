/*
Problem:
Return whether an integer reads the same forward and backward.

Sample:
Input: x = 121
Output: true

Input: x = -121
Output: false

Solution:
Reject negative numbers and numbers ending in 0, then reverse only half of the
digits and compare both halves.

Time: O(log10(n))
Space: O(1)
*/

function isPalindrome(x) {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  let reversedHalf = 0;

  while (x > reversedHalf) {
    reversedHalf = reversedHalf * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === reversedHalf || x === Math.floor(reversedHalf / 10);
}

/*
Explanation:
For even digit counts, both halves match exactly. For odd digit counts, dropping
the middle digit from reversedHalf makes the halves comparable.
*/
