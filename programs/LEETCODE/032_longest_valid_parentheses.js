/*
Problem:
Return the length of the longest valid parentheses substring.

Sample:
Input: s = "(()"
Output: 2

Input: s = ")()())"
Output: 4

Solution:
Use a stack of indices. Keep a base index for the most recent unmatched closing
parenthesis.

Time: O(n)
Space: O(n)
*/

function longestValidParentheses(s) {
  const stack = [-1];
  let best = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();

      if (stack.length === 0) {
        stack.push(i);
      } else {
        best = Math.max(best, i - stack[stack.length - 1]);
      }
    }
  }

  return best;
}

/*
Explanation:
The stack top is the index before the current valid region. When a closing
bracket cannot match anything, it becomes the new base.
*/

