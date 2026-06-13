/*
Problem:
Find the length of the longest substring that contains no repeated characters.

Sample:
Input: s = "abcabcbb"
Output: 3

Input: s = "bbbbb"
Output: 1

Solution:
Use a sliding window and remember the most recent index of each character.
Move the left edge past a repeated character when needed.

Time: O(n)
Space: O(min(n, alphabet))
*/

function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }

    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}

/*
Explanation:
The window always contains unique characters. When a duplicate appears inside
the window, shifting left just after its previous position restores the invariant.
*/
