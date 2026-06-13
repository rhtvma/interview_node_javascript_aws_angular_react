/*
Problem:
Place n queens on an n x n chessboard so that no two queens attack each other.
Return all board configurations.

Sample:
Input: n = 4
Output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]

Input: n = 1
Output: [["Q"]]

Solution:
Backtrack row by row while tracking occupied columns and diagonals.

Time: O(n!)
Space: O(n)
*/

function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();

  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join("")));
      return;
    }

    for (let col = 0; col < n; col++) {
      const d1 = row - col;
      const d2 = row + col;

      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;

      board[row][col] = "Q";
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);

      backtrack(row + 1);

      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }

  backtrack(0);
  return result;
}

/*
Explanation:
One queen per row is enough, so conflicts only need column and diagonal checks.
The two diagonal identities are row - col and row + col.
*/

