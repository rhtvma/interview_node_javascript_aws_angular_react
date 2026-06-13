/*
Problem:
Return unique combinations where numbers sum to target. Each input number may be
used at most once.

Sample:
Input: candidates = [10, 1, 2, 7, 6, 1, 5], target = 8
Output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]

Input: candidates = [2, 5, 2, 1, 2], target = 5
Output: [[1, 2, 2], [5]]

Solution:
Sort, backtrack, move to the next index after choosing, and skip duplicate values
at the same recursion depth.

Time: O(2^n)
Space: O(n)
*/

function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, remaining, path) {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length && candidates[i] <= remaining; i++) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;

      path.push(candidates[i]);
      backtrack(i + 1, remaining - candidates[i], path);
      path.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

/*
Explanation:
Skipping equal values at the same level avoids duplicate combinations, while
moving to i + 1 enforces one use per input element.
*/

