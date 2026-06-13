/*
Problem:
Return all unique triplets in an array whose values add up to 0.

Sample:
Input: nums = [-1, 0, 1, 2, -1, -4]
Output: [[-1, -1, 2], [-1, 0, 1]]

Input: nums = [0, 0, 0, 0]
Output: [[0, 0, 0]]

Solution:
Sort the array. Fix one number, then use two pointers to find pairs that
complete the sum while skipping duplicates.

Time: O(n^2)
Space: O(1) excluding output
*/

function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

/*
Explanation:
Sorting makes duplicate skipping straightforward and lets the two-pointer sum
move predictably: increase left for a larger sum, decrease right for a smaller sum.
*/
