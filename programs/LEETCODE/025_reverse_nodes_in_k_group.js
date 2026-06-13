/*
Problem:
Reverse nodes in a linked list k at a time. Leave the final group unchanged if it
has fewer than k nodes.

Sample:
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [2, 1, 4, 3, 5]

Input: head = [1, 2, 3, 4, 5], k = 3
Output: [3, 2, 1, 4, 5]

Solution:
Find each full k-sized group, reverse it in place, then connect it back.

Time: O(n)
Space: O(1)
*/

function reverseKGroup(head, k) {
  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  function getKth(node, count) {
    while (node && count > 0) {
      node = node.next;
      count--;
    }
    return node;
  }

  while (true) {
    const kth = getKth(groupPrev, k);
    if (!kth) break;

    const groupNext = kth.next;
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    const oldStart = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = oldStart;
  }

  return dummy.next;
}

/*
Explanation:
Each group is reversed by pointing nodes back toward groupNext. The original
group start becomes the tail and is used as the previous pointer for the next group.
*/
