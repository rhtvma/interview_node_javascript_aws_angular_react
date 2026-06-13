/*
Problem:
Fill a 9x9 Sudoku board so every row, column, and 3x3 box contains digits 1-9.

Sample:
Input: board = valid incomplete Sudoku board
Output: board is modified into a solved Sudoku board

Input: board = another valid incomplete Sudoku board
Output: board is modified into its solved form

Solution:
Use backtracking. For each empty cell, try digits that do not conflict with the
current row, column, or box.

Time: O(9^emptyCells)
Space: O(emptyCells)
*/

function solveSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  const empty = [];

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const value = board[r][c];
      const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (value === ".") {
        empty.push([r, c]);
      } else {
        rows[r].add(value);
        cols[c].add(value);
        boxes[box].add(value);
      }
    }
  }

  function backtrack(index) {
    if (index === empty.length) return true;

    const [r, c] = empty[index];
    const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    for (let digit = 1; digit <= 9; digit++) {
      const value = String(digit);

      if (rows[r].has(value) || cols[c].has(value) || boxes[box].has(value)) {
        continue;
      }

      board[r][c] = value;
      rows[r].add(value);
      cols[c].add(value);
      boxes[box].add(value);

      if (backtrack(index + 1)) return true;

      board[r][c] = ".";
      rows[r].delete(value);
      cols[c].delete(value);
      boxes[box].delete(value);
    }

    return false;
  }

  backtrack(0);
}

/*
Explanation:
Backtracking places one valid digit at a time. If a later cell cannot be filled,
the algorithm undoes the choice and tries the next digit.
*/

