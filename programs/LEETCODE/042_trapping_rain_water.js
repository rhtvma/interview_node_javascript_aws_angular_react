/*
Problem:
Given elevation heights, compute how much rain water can be trapped.

Sample:
Input: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6

Input: height = [4, 2, 0, 3, 2, 5]
Output: 9

Solution:
Use two pointers and track the best wall seen from both sides.

Time: O(n)
Space: O(1)
*/

function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }

  return water;
}

/*
Explanation:
Water above a bar is limited by the shorter side. Moving the shorter side is
safe because the opposite side already provides a boundary at least as high.
*/

