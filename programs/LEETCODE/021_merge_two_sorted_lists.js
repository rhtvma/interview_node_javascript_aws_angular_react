/*
Problem:
Merge two sorted linked lists into one sorted linked list.

Sample:
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

Input: list1 = [], list2 = [0]
Output: [0]

Solution:
Use a dummy head and repeatedly attach the smaller current node.

Time: O(m + n)
Space: O(1)
*/

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 || list2;
  return dummy.next;
}

/*
Explanation:
Both lists are already sorted, so the smallest remaining node must be at one of
the two current heads.
*/
