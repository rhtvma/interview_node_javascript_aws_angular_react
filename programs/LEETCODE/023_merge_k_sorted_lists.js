/*
Problem:
Merge k sorted linked lists into one sorted linked list.

Sample:
Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: [1, 1, 2, 3, 4, 4, 5, 6]

Input: lists = []
Output: []

Solution:
Merge lists in pairs using divide and conquer.

Time: O(N log k)
Space: O(1) excluding recursion/array bookkeeping
*/

function mergeKLists(lists) {
  if (lists.length === 0) return null;

  function merge(a, b) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (a && b) {
      if (a.val <= b.val) {
        tail.next = a;
        a = a.next;
      } else {
        tail.next = b;
        b = b.next;
      }
      tail = tail.next;
    }

    tail.next = a || b;
    return dummy.next;
  }

  while (lists.length > 1) {
    const merged = [];

    for (let i = 0; i < lists.length; i += 2) {
      merged.push(merge(lists[i], lists[i + 1] || null));
    }

    lists = merged;
  }

  return lists[0];
}

/*
Explanation:
Pairwise merging keeps list sizes balanced, so each node participates in about
log k merge levels.
*/
