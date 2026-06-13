/*
Problem:
Given jump lengths at each index, return the minimum number of jumps needed to
reach the last index.

Sample:
Input: nums = [2, 3, 1, 1, 4]
Output: 2

Input: nums = [2, 3, 0, 1, 4]
Output: 2

Solution:
Use greedy level scanning. Track the farthest reachable index in the current
jump range.

Time: O(n)
Space: O(1)
*/

function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}

/*
Explanation:
Each jump covers a range of indices. When the scan reaches the end of that range,
we commit to the next jump using the farthest reach discovered inside it.
*/

