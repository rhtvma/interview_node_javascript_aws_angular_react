/*
Problem:
Generate all valid strings containing n pairs of parentheses.

Sample:
Input: n = 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

Input: n = 1
Output: ["()"]

Solution:
Backtrack while tracking how many opening and closing brackets have been used.

Time: O(Catalan(n) * n)
Space: O(n)
*/

function generateParenthesis(n) {
  const result = [];

  function backtrack(path, open, close) {
    if (path.length === 2 * n) {
      result.push(path);
      return;
    }

    if (open < n) backtrack(path + "(", open + 1, close);
    if (close < open) backtrack(path + ")", open, close + 1);
  }

  backtrack("", 0, 0);
  return result;
}

/*
Explanation:
A valid prefix never has more closing brackets than opening brackets. Backtracking
uses that rule to avoid invalid branches early.
*/
