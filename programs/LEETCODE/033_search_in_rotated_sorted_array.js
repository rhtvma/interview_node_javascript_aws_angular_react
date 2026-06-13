/*
Problem:
Search for a target in a sorted array that has been rotated. Return its index or
-1 if missing.

Sample:
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4

Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1

Solution:
Use binary search. At each step, one half is guaranteed to be sorted.

Time: O(log n)
Space: O(1)
*/

function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }

  return -1;
}

/*
Explanation:
Rotation only breaks sorted order once. Checking which half is sorted lets us
decide whether the target can be inside that half.
*/

