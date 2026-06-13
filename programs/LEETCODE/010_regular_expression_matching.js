/*
Problem:
Match a string against a pattern where "." matches any single character and "*"
matches zero or more of the previous pattern element.

Sample:
Input: s = "aab", p = "c*a*b"
Output: true

Input: s = "mississippi", p = "mis*is*p*."
Output: false

Solution:
Use dynamic programming where dp[i][j] means s[0..i) matches p[0..j).

Time: O(m * n)
Space: O(m * n)
*/

function isMatch(s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));

  dp[0][0] = true;

  for (let j = 2; j <= n; j++) {
    if (p[j - 1] === "*") {
      dp[0][j] = dp[0][j - 2];
    }
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "." || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 2];

        if (p[j - 2] === "." || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      }
    }
  }

  return dp[m][n];
}

/*
Explanation:
"*" has two choices: use zero copies of the previous token, or consume one
matching character and keep the same pattern position for more copies.
*/
