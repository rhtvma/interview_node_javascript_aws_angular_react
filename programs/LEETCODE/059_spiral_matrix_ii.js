/*
Problem:
Generate an n x n matrix filled with numbers from 1 to n^2 in spiral order.

Sample:
Input: n = 3
Output: [[1, 2, 3], [8, 9, 4], [7, 6, 5]]

Input: n = 1
Output: [[1]]

Solution:
Fill the matrix layer by layer using top, bottom, left, and right boundaries.

Time: O(n^2)
Space: O(n^2)
*/

function generateMatrix(n) {
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));
  let top = 0;
  let bottom = n - 1;
  let left = 0;
  let right = n - 1;
  let value = 1;

  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) matrix[top][c] = value++;
    top++;

    for (let r = top; r <= bottom; r++) matrix[r][right] = value++;
    right--;

    for (let c = right; c >= left; c--) matrix[bottom][c] = value++;
    bottom--;

    for (let r = bottom; r >= top; r--) matrix[r][left] = value++;
    left++;
  }

  return matrix;
}

/*
Explanation:
The same boundary approach used to read a spiral can also write one by assigning
the next number along each edge.
*/

