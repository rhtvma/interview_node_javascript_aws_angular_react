/*
Problem:
Insert a new interval into a sorted non-overlapping interval list and merge if
needed.

Sample:
Input: intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
Output: [[1, 5], [6, 9]]

Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
Output: [[1, 2], [3, 10], [12, 16]]

Solution:
Add intervals before the new one, merge all overlaps into newInterval, then add
the remaining intervals.

Time: O(n)
Space: O(n)
*/

function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }

  result.push(newInterval);

  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

/*
Explanation:
Because the existing intervals are sorted and non-overlapping, the list naturally
splits into before, overlapping, and after sections.
*/

