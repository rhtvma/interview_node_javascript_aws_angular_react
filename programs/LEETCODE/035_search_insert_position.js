/*
Problem:
Return the index of target in a sorted array, or the index where it should be
inserted to keep the array sorted.

Sample:
Input: nums = [1, 3, 5, 6], target = 5
Output: 2

Input: nums = [1, 3, 5, 6], target = 2
Output: 1

Solution:
Use lower-bound binary search.

Time: O(log n)
Space: O(1)
*/

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}

/*
Explanation:
The lower bound is the first index whose value is not less than target. That is
both the found position and the correct insertion position.
*/

