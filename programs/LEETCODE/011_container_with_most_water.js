/*
Problem:
Given vertical line heights, choose two lines that hold the most water with the
x-axis.

Sample:
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49

Input: height = [1, 1]
Output: 1

Solution:
Use two pointers at the ends. Compute area, then move the pointer at the shorter
line because the limiting height must improve to beat the current area.

Time: O(n)
Space: O(1)
*/

function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let best = 0;

  while (left < right) {
    const width = right - left;
    const water = width * Math.min(height[left], height[right]);
    best = Math.max(best, water);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return best;
}

/*
Explanation:
Moving the taller side cannot help while the shorter side still limits height.
So the only useful move is to try replacing the shorter side.
*/
