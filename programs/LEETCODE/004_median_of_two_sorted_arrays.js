/*
Problem:
Given two sorted arrays, return the median value of all elements combined.

Sample:
Input: nums1 = [1, 3], nums2 = [2]
Output: 2

Input: nums1 = [1, 2], nums2 = [3, 4]
Output: 2.5

Solution:
Binary search the smaller array for a partition where everything on the left
side is <= everything on the right side.

Time: O(log(min(m, n)))
Space: O(1)
*/

function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;

  while (low <= high) {
    const cut1 = Math.floor((low + high) / 2);
    const cut2 = Math.floor((m + n + 1) / 2) - cut1;

    const left1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
    const right1 = cut1 === m ? Infinity : nums1[cut1];
    const left2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
    const right2 = cut2 === n ? Infinity : nums2[cut2];

    if (left1 <= right2 && left2 <= right1) {
      if ((m + n) % 2 === 1) return Math.max(left1, left2);
      return (Math.max(left1, left2) + Math.min(right1, right2)) / 2;
    }

    if (left1 > right2) high = cut1 - 1;
    else low = cut1 + 1;
  }

  return 0;
}

/*
Explanation:
A valid median partition puts half the values on the left. Once the largest left
value is <= the smallest right value, the median is determined by those borders.
*/
