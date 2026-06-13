/*
Problem:
Rearrange the numbers into the next lexicographically greater permutation. If no
greater permutation exists, rearrange into ascending order.

Sample:
Input: nums = [1, 2, 3]
Output: [1, 3, 2]

Input: nums = [3, 2, 1]
Output: [1, 2, 3]

Solution:
Find the first decreasing position from the right, swap it with the next larger
value on its right, then reverse the suffix.

Time: O(n)
Space: O(1)
*/

function nextPermutation(nums) {
  let i = nums.length - 2;

  while (i >= 0 && nums[i] >= nums[i + 1]) i--;

  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] <= nums[i]) j--;
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  let left = i + 1;
  let right = nums.length - 1;

  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}

/*
Explanation:
The suffix after the pivot is decreasing. Swapping the pivot with the smallest
larger suffix value gives the next larger prefix, and reversing the suffix makes
the rest as small as possible.
*/

