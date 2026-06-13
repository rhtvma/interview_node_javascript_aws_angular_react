/*
Problem:
Count how many valid n-queens board configurations exist.

Sample:
Input: n = 4
Output: 2

Input: n = 1
Output: 1

Solution:
Backtrack row by row and count valid placements instead of storing boards.

Time: O(n!)
Space: O(n)
*/

function totalNQueens(n) {
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  let count = 0;

  function backtrack(row) {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      backtrack(row + 1);
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return count;
}

/*
Explanation:
This is the same search as N-Queens, but the interview-friendly optimization is
to avoid building board strings when only the count is needed.
*/

