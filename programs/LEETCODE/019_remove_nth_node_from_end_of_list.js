/*
Problem:
Remove the nth node from the end of a singly linked list and return the head.

Sample:
Input: head = [1, 2, 3, 4, 5], n = 2
Output: [1, 2, 3, 5]

Input: head = [1], n = 1
Output: []

Solution:
Use a dummy node and two pointers separated by n nodes. Move both until the lead
pointer reaches the end, then remove the node after the trailing pointer.

Time: O(n)
Space: O(1)
*/

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
}

/*
Explanation:
The n-node gap makes slow land exactly before the target node when fast reaches
the list tail. The dummy node handles removing the original head cleanly.
*/
