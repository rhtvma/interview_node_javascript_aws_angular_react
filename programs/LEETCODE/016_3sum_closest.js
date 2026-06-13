/*
Problem:
Find the sum of three numbers that is closest to a target.

Sample:
Input: nums = [-1, 2, 1, -4], target = 1
Output: 2

Input: nums = [0, 0, 0], target = 1
Output: 0

Solution:
Sort the array. Fix one number and use two pointers to search the best pair for
that fixed value.

Time: O(n^2)
Space: O(1)
*/

function threeSumClosest(nums, target) {
  nums.sort((a, b) => a - b);
  let best = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (Math.abs(sum - target) < Math.abs(best - target)) {
        best = sum;
      }

      if (sum === target) return sum;
      if (sum < target) left++;
      else right--;
    }
  }

  return best;
}

/*
Explanation:
After sorting, pointer movement tells us which direction gets closer to the
target. We keep the smallest absolute difference seen so far.
*/
