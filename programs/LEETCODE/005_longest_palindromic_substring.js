/*
Problem:
Return the longest substring that reads the same forward and backward.

Sample:
Input: s = "babad"
Output: "bab"

Input: s = "cbbd"
Output: "bb"

Solution:
Treat every index, and every gap between indexes, as a possible palindrome
center. Expand outward while characters match.

Time: O(n^2)
Space: O(1)
*/

function longestPalindrome(s) {
  let start = 0;
  let end = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return [left + 1, right - 1];
  }

  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = expand(i, i);
    const [l2, r2] = expand(i, i + 1);

    if (r1 - l1 > end - start) {
      start = l1;
      end = r1;
    }

    if (r2 - l2 > end - start) {
      start = l2;
      end = r2;
    }
  }

  return s.slice(start, end + 1);
}

/*
Explanation:
Every palindrome has a center. Expanding from all possible centers checks both
odd-length and even-length palindromes without storing a DP table.
*/
