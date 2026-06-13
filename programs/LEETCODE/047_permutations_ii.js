/*
Problem:
Return all unique permutations of an array that may contain duplicate numbers.

Sample:
Input: nums = [1, 1, 2]
Output: [[1, 1, 2], [1, 2, 1], [2, 1, 1]]

Input: nums = [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

Solution:
Sort first. During backtracking, skip a duplicate value if the previous equal
value has not been used in this branch.

Time: O(n! * n)
Space: O(n)
*/

function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const used = Array(nums.length).fill(false);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

/*
Explanation:
The duplicate skip rule ensures equal values are chosen in a consistent order,
preventing repeated permutations.
*/

