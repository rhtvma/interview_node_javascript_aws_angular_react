/*
Problem:
Remove all occurrences of a given value from an array in place and return the new
length.

Sample:
Input: nums = [3, 2, 2, 3], val = 3
Output: 2, nums starts as [2, 2]

Input: nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
Output: 5, nums starts as [0, 1, 3, 0, 4]

Solution:
Copy only values that are not equal to val into the front of the array.

Time: O(n)
Space: O(1)
*/

function removeElement(nums, val) {
  let write = 0;

  for (const num of nums) {
    if (num !== val) {
      nums[write] = num;
      write++;
    }
  }

  return write;
}

/*
Explanation:
The problem does not require preserving values beyond the returned length, so a
single write pointer is enough.
*/
