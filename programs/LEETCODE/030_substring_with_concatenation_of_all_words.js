/*
Problem:
Find all start indices where a substring is formed by concatenating every word
from a list exactly once, with no extra characters.

Sample:
Input: s = "barfoothefoobarman", words = ["foo", "bar"]
Output: [0, 9]

Input: s = "wordgoodgoodgoodbestword", words = ["word", "good", "best", "word"]
Output: []

Solution:
Use a sliding window by word length and compare word frequencies.

Time: O(n * wordLength)
Space: O(number of words)
*/

function findSubstring(s, words) {
  if (words.length === 0) return [];

  const wordLen = words[0].length;
  const wordCount = words.length;
  const need = new Map();
  const result = [];

  for (const word of words) {
    need.set(word, (need.get(word) || 0) + 1);
  }

  for (let offset = 0; offset < wordLen; offset++) {
    let left = offset;
    let seen = new Map();
    let count = 0;

    for (let right = offset; right + wordLen <= s.length; right += wordLen) {
      const word = s.slice(right, right + wordLen);

      if (!need.has(word)) {
        seen = new Map();
        count = 0;
        left = right + wordLen;
        continue;
      }

      seen.set(word, (seen.get(word) || 0) + 1);
      count++;

      while (seen.get(word) > need.get(word)) {
        const leftWord = s.slice(left, left + wordLen);
        seen.set(leftWord, seen.get(leftWord) - 1);
        count--;
        left += wordLen;
      }

      if (count === wordCount) result.push(left);
    }
  }

  return result;
}

/*
Explanation:
All words have equal length, so the window can move in word-sized jumps. Frequency
maps verify that every required word appears exactly the required number of times.
*/
