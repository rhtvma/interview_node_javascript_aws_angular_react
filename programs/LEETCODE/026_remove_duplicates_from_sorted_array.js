/*
Problem:
Remove duplicates from a sorted array in place and return the count of unique
values.

Sample:
Input: nums = [1, 1, 2]
Output: 2, nums starts as [1, 2]

Input: nums = [0, 0, 1, 1, 2]
Output: 3, nums starts as [0, 1, 2]

Solution:
Use a write pointer for the next unique value.

Time: O(n)
Space: O(1)
*/

function removeDuplicates(nums) {
  if (nums.length === 0) return 0;

  let write = 1;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[read - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}

/*
Explanation:
Because the array is sorted, duplicates are adjacent. A value is unique when it
differs from the previous read value.
*/
