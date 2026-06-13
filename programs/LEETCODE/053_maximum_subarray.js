/*
Problem:
Find the largest possible sum of a contiguous non-empty subarray.

Sample:
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6

Input: nums = [5, 4, -1, 7, 8]
Output: 23

Solution:
Use Kadane's algorithm: keep the best subarray sum ending at the current index.

Time: O(n)
Space: O(1)
*/

function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}

/*
Explanation:
At each number, either extend the previous subarray or start fresh. The maximum
over all "ending here" sums is the answer.
*/

