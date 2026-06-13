/*
Problem:
Given an array of numbers and a target, return the indices of two different
items whose values add up to the target.

Sample:
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Solution:
Use a hash map from value to index. For each number, check whether the needed
complement was already seen.

Time: O(n)
Space: O(n)
*/

function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}

/*
Explanation:
If nums[i] needs value x to reach target, any earlier x in the map forms the
answer. Storing values as we scan gives one-pass lookup instead of nested loops.
*/
