/*
Problem:
Swap every two adjacent nodes in a linked list and return the new head.

Sample:
Input: head = [1, 2, 3, 4]
Output: [2, 1, 4, 3]

Input: head = [1, 2, 3]
Output: [2, 1, 3]

Solution:
Use a dummy node and rewire pairs iteratively.

Time: O(n)
Space: O(1)
*/

function swapPairs(head) {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = first.next;

    first.next = second.next;
    second.next = first;
    prev.next = second;
    prev = first;
  }

  return dummy.next;
}

/*
Explanation:
The dummy node simplifies swaps at the head. Each loop turns prev -> first ->
second into prev -> second -> first.
*/
