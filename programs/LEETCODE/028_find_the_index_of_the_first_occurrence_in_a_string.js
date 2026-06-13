/*
Problem:
Return the first index where needle appears in haystack, or -1 if it does not
appear.

Sample:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0

Input: haystack = "leetcode", needle = "leeto"
Output: -1

Solution:
Check each possible starting index and compare the substring.

Time: O((n - m + 1) * m)
Space: O(1)
*/

function strStr(haystack, needle) {
  if (needle.length === 0) return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;

    while (j < needle.length && haystack[i + j] === needle[j]) {
      j++;
    }

    if (j === needle.length) return i;
  }

  return -1;
}

/*
Explanation:
Every match must start within the last position that can still fit needle. The
inner loop confirms whether that candidate fully matches.
*/
