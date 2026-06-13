/*
Problem:
Given digits from 2 to 9, return all possible letter combinations based on a
phone keypad mapping.

Sample:
Input: digits = "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

Input: digits = ""
Output: []

Solution:
Backtrack through the digits, appending one possible letter at each position.

Time: O(4^n)
Space: O(n) excluding output
*/

function letterCombinations(digits) {
  if (digits.length === 0) return [];

  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz"
  };
  const result = [];

  function backtrack(index, path) {
    if (index === digits.length) {
      result.push(path);
      return;
    }

    for (const ch of map[digits[index]]) {
      backtrack(index + 1, path + ch);
    }
  }

  backtrack(0, "");
  return result;
}

/*
Explanation:
Each digit contributes a small set of choices. Backtracking explores every
combination by choosing one letter per digit.
*/
