/*
Problem:
Return the kth permutation sequence of numbers 1 through n in lexicographic
order.

Sample:
Input: n = 3, k = 3
Output: "213"

Input: n = 4, k = 9
Output: "2314"

Solution:
Use factorial blocks to choose one digit at a time.

Time: O(n^2)
Space: O(n)
*/

function getPermutation(n, k) {
  const numbers = [];
  const factorial = Array(n + 1).fill(1);

  for (let i = 1; i <= n; i++) {
    numbers.push(String(i));
    factorial[i] = factorial[i - 1] * i;
  }

  k--;
  let result = "";

  for (let size = n; size >= 1; size--) {
    const block = factorial[size - 1];
    const index = Math.floor(k / block);
    result += numbers.splice(index, 1)[0];
    k %= block;
  }

  return result;
}

/*
Explanation:
For each leading digit, there are (n - 1)! permutations behind it. Dividing k by
that block size identifies the next digit directly.
*/

