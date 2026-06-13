/*
Problem:
Determine whether every opening bracket in a string is closed by the correct
type of bracket in the correct order.

Sample:
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Solution:
Push opening brackets onto a stack. For each closing bracket, the stack top must
be the matching opening bracket.

Time: O(n)
Space: O(n)
*/

function isValid(s) {
  const stack = [];
  const match = {
    ")": "(",
    "]": "[",
    "}": "{"
  };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else if (stack.pop() !== match[ch]) {
      return false;
    }
  }

  return stack.length === 0;
}

/*
Explanation:
Brackets are nested last-in, first-out. A stack mirrors that nesting order and
detects wrong types, early closings, and unclosed openings.
*/
