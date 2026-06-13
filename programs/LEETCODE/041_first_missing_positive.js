/*
Problem:
Find the smallest missing positive integer from an unsorted array.

Sample:
Input: nums = [1, 2, 0]
Output: 3

Input: nums = [3, 4, -1, 1]
Output: 2

Solution:
Place each value x in index x - 1 whenever possible. Then the first index that
does not contain index + 1 reveals the answer.

Time: O(n)
Space: O(1)
*/

function firstMissingPositive(nums) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    while (
      nums[i] >= 1 &&
      nums[i] <= n &&
      nums[nums[i] - 1] !== nums[i]
    ) {
      const target = nums[i] - 1;
      [nums[i], nums[target]] = [nums[target], nums[i]];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return n + 1;
}

/*
Explanation:
The smallest missing positive must be in [1, n + 1]. Reordering the array as a
presence table lets us detect the first missing number without extra space.
*/

