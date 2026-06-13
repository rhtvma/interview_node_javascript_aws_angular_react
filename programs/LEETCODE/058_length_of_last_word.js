/*
Problem:
Return the length of the last word in a string.

Sample:
Input: s = "Hello World"
Output: 5

Input: s = "   fly me   to   the moon  "
Output: 4

Solution:
Scan from the end, skip trailing spaces, then count non-space characters.

Time: O(n)
Space: O(1)
*/

function lengthOfLastWord(s) {
  let i = s.length - 1;

  while (i >= 0 && s[i] === " ") i--;

  let length = 0;
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}

/*
Explanation:
The last word is the final run of non-space characters before any trailing
spaces.
*/

