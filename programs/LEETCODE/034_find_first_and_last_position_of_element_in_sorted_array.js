/*
Problem:
Find the first and last index of a target in a sorted array.

Sample:
Input: nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]

Input: nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]

Solution:
Run binary search twice: once for the first index and once for the last index.

Time: O(log n)
Space: O(1)
*/

function searchRange(nums, target) {
  function bound(findFirst) {
    let left = 0;
    let right = nums.length - 1;
    let ans = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (nums[mid] === target) {
        ans = mid;
        if (findFirst) right = mid - 1;
        else left = mid + 1;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return ans;
  }

  return [bound(true), bound(false)];
}

/*
Explanation:
After finding target, binary search continues left for the first occurrence or
right for the last occurrence.
*/

