/*
Problem:
Two linked lists store non-negative integers in reverse digit order. Add the two
numbers and return the sum as a linked list in the same reverse order.

Sample:
Input: l1 = [2, 4, 3], l2 = [5, 6, 4]
Output: [7, 0, 8]

Input: l1 = [9, 9, 9], l2 = [1]
Output: [0, 0, 0, 1]

Solution:
Walk both lists together, add matching digits plus carry, and build a new result
list one digit at a time.

Time: O(max(m, n))
Space: O(max(m, n))
*/

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

/*
Explanation:
Because digits are already reversed, the head nodes are the ones place. This
matches normal column addition from right to left, with carry flowing forward.
*/
