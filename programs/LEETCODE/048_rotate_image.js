/*
Problem:
Rotate an n x n matrix 90 degrees clockwise in place.

Sample:
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]

Input: matrix = [[1, 2], [3, 4]]
Output: [[3, 1], [4, 2]]

Solution:
Transpose the matrix, then reverse each row.

Time: O(n^2)
Space: O(1)
*/

function rotate(matrix) {
  const n = matrix.length;

  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }

  for (const row of matrix) {
    row.reverse();
  }
}

/*
Explanation:
A clockwise rotation maps rows to columns. Transpose handles row-column swapping,
and reversing rows finishes the clockwise orientation.
*/

