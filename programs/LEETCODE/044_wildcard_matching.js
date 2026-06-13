/*
Problem:
Match a string against a pattern where "?" matches one character and "*" matches
any sequence, including empty.

Sample:
Input: s = "aa", p = "a"
Output: false

Input: s = "adceb", p = "*a*b"
Output: true

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

  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === "*") dp[0][j] = dp[0][j - 1];
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (p[j - 1] === "?" || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[m][n];
}

/*
Explanation:
"*" can represent an empty sequence, dp[i][j - 1], or consume one more character,
dp[i - 1][j]. Other pattern characters consume exactly one character.
*/

