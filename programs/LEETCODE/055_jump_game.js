/*
Problem:
Given jump lengths at each index, decide whether the last index is reachable.

Sample:
Input: nums = [2, 3, 1, 1, 4]
Output: true

Input: nums = [3, 2, 1, 0, 4]
Output: false

Solution:
Track the farthest reachable index while scanning left to right.

Time: O(n)
Space: O(1)
*/

function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
  }

  return true;
}

/*
Explanation:
If the current index is beyond farthest, no previous jump can reach it. Otherwise
we update how far future jumps may go.
*/

