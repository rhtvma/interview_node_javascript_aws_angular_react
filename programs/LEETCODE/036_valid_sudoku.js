/*
Problem:
Check whether a partially filled 9x9 Sudoku board is valid.

Sample:
Input: board = standard valid partial Sudoku board
Output: true

Input: board = same board but with duplicate "8" in the first column
Output: false

Solution:
Track seen values for each row, column, and 3x3 box.

Time: O(1)
Space: O(1)
*/

function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const value = board[r][c];
      if (value === ".") continue;

      const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(value) || cols[c].has(value) || boxes[box].has(value)) {
        return false;
      }

      rows[r].add(value);
      cols[c].add(value);
      boxes[box].add(value);
    }
  }

  return true;
}

/*
Explanation:
Sudoku validity only requires no duplicate filled digits in each row, column, or
box. Empty cells do not matter.
*/

