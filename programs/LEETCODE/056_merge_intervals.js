/*
Problem:
Merge all overlapping intervals.

Sample:
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [[1, 6], [8, 10], [15, 18]]

Input: intervals = [[1, 4], [4, 5]]
Output: [[1, 5]]

Solution:
Sort intervals by start time and merge into the last interval in the result when
they overlap.

Time: O(n log n)
Space: O(n)
*/

function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [];

  for (const interval of intervals) {
    const last = result[result.length - 1];

    if (!last || interval[0] > last[1]) {
      result.push(interval);
    } else {
      last[1] = Math.max(last[1], interval[1]);
    }
  }

  return result;
}

/*
Explanation:
After sorting, any interval that overlaps the current merged interval must be
adjacent in the scan.
*/

