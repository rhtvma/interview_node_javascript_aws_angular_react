/*
Problem:
Write a string in a zigzag pattern across a given number of rows, then read the
rows from top to bottom.

Sample:
Input: s = "PAYPALISHIRING", numRows = 3
Output: "PAHNAPLSIIGYIR"

Input: s = "ABCD", numRows = 2
Output: "ACBD"

Solution:
Simulate the row movement. Move down until the last row, then move upward until
the first row, appending each character to its current row.

Time: O(n)
Space: O(n)
*/

function convert(s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;

  const rows = Array.from({ length: numRows }, () => []);
  let row = 0;
  let direction = 1;

  for (const ch of s) {
    rows[row].push(ch);

    if (row === 0) direction = 1;
    if (row === numRows - 1) direction = -1;
    row += direction;
  }

  return rows.map(chars => chars.join("")).join("");
}

/*
Explanation:
Only the current row and direction matter. Once all characters are placed in row
buckets, joining those buckets produces the required reading order.
*/
