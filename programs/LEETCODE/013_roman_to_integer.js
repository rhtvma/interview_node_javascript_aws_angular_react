/*
Problem:
Convert a Roman numeral string into an integer.

Sample:
Input: s = "MCMXCIV"
Output: 1994

Input: s = "LVIII"
Output: 58

Solution:
Scan left to right. If a symbol is smaller than the next symbol, subtract it;
otherwise add it.

Time: O(n)
Space: O(1)
*/

function romanToInt(s) {
  const value = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    if (value[s[i]] < value[s[i + 1]]) {
      total -= value[s[i]];
    } else {
      total += value[s[i]];
    }
  }

  return total;
}

/*
Explanation:
Subtractive Roman pairs such as IV and IX are detected by comparing adjacent
symbols. A smaller value before a larger one contributes negatively.
*/
