/*
Problem:
Return all unique combinations where chosen numbers sum to target. Each number
may be used multiple times.

Sample:
Input: candidates = [2, 3, 6, 7], target = 7
Output: [[2, 2, 3], [7]]

Input: candidates = [2, 3, 5], target = 8
Output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]

Solution:
Backtrack from a start index. Reuse the same index when selecting a candidate.

Time: O(branching^target)
Space: O(target)
*/

function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length && candidates[i] <= remaining; i++) {
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i], path);
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

/*
Explanation:
Using a start index prevents duplicate orderings. Passing the same index allows
the current candidate to be reused.
*/

