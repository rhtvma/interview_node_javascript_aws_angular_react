/*
Problem:
Return all permutations of an array of distinct numbers.

Sample:
Input: nums = [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]

Input: nums = [0, 1]
Output: [[0, 1], [1, 0]]

Solution:
Backtrack with a used set to choose each unused number for the next position.

Time: O(n! * n)
Space: O(n)
*/

function permute(nums) {
  const result = [];
  const used = Array(nums.length).fill(false);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

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
Each recursion level chooses one unused value. Once the path length equals n, it
is a complete permutation.
*/

