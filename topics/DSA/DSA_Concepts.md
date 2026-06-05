# Data Structures & Algorithms - Interview Ready

## Table of Contents
1. [Time & Space Complexity](#time--space-complexity)
2. [Arrays](#arrays)
3. [Strings](#strings)
4. [Linked Lists](#linked-lists)
5. [Stacks & Queues](#stacks--queues)
6. [Hash Tables](#hash-tables)
7. [Trees](#trees)
8. [Graphs](#graphs)
9. [Sorting Algorithms](#sorting-algorithms)
10. [Searching Algorithms](#searching-algorithms)
11. [Dynamic Programming](#dynamic-programming)
12. [Recursion](#recursion)
13. [Problem-Solving Patterns](#problem-solving-patterns)

---

## Time & Space Complexity

**Description:** Understanding time and space complexity is fundamental to writing efficient algorithms. Big O notation provides a standardized way to describe algorithm performance as input size grows. This knowledge is crucial for technical interviews and optimizing production code.

**Key Concepts:**
- Big O: Upper bound of algorithm performance
- Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ)
- Time complexity: How runtime scales with input size
- Space complexity: How memory usage scales with input size
- Best, average, worst case scenarios
- Trade-offs: Often optimize time at cost of space or vice versa

### Big O Notation
Describes the upper bound of algorithm performance as input size grows.

#### Common Time Complexities (Best to Worst)
```
O(1)         - Constant
O(log n)     - Logarithmic
O(n)         - Linear
O(n log n)   - Linearithmic
O(n²)        - Quadratic
O(n³)        - Cubic
O(2ⁿ)        - Exponential
O(n!)        - Factorial
```

#### Examples
```javascript
// O(1) - Constant
function getFirst(arr) {
  return arr[0];
}

// O(n) - Linear
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) - Quadratic
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// O(log n) - Logarithmic
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(2ⁿ) - Exponential
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Space Complexity
Amount of memory used by an algorithm.

```javascript
// O(1) - Constant space
function sum(arr) {
  let total = 0;
  for (let num of arr) {
    total += num;
  }
  return total;
}

// O(n) - Linear space
function double(arr) {
  const result = [];
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}
```

---

## Arrays

**Description:** Arrays are the most fundamental data structure, storing elements in contiguous memory locations. They provide constant-time access by index but can be expensive for insertions/deletions. Mastering array manipulation is essential for coding interviews.

**Key Concepts:**
- Random access: O(1) time complexity
- Fixed size in some languages, dynamic in JavaScript
- Common patterns: Two pointers, sliding window, prefix sum
- Popular problems: Two Sum, Maximum Subarray, Rotate Array
- Trade-offs: Fast access vs expensive insertions/deletions

### Common Operations
```javascript
// Access: O(1)
arr[0]

// Search: O(n)
arr.indexOf(5)

// Insert at end: O(1)
arr.push(5)

// Insert at beginning: O(n)
arr.unshift(5)

// Delete at end: O(1)
arr.pop()

// Delete at beginning: O(n)
arr.shift()

// Delete at index: O(n)
arr.splice(index, 1)
```

### Common Problems

#### 1. Two Sum
**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Example:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Solution:**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)
```

#### 2. Maximum Subarray (Kadane's Algorithm)
**Problem:** Find the contiguous subarray with the largest sum.

**Example:**
```
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has the largest sum = 6
```

**Solution:**
```javascript
function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  
  return maxSum;
}
// Time: O(n), Space: O(1)
```

#### 3. Rotate Array
**Problem:** Rotate an array to the right by `k` steps.

**Example:**
```
Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [5, 6, 7, 1, 2, 3, 4]
Explanation:
rotate 1 step: [7, 1, 2, 3, 4, 5, 6]
rotate 2 steps: [6, 7, 1, 2, 3, 4, 5]
rotate 3 steps: [5, 6, 7, 1, 2, 3, 4]
```

**Solution:**
```javascript
function rotate(nums, k) {
  k = k % nums.length;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
}

function reverse(nums, start, end) {
  while (start < end) {
    [nums[start], nums[end]] = [nums[end], nums[start]];
    start++;
    end--;
  }
}
// Time: O(n), Space: O(1)
```

#### 4. Remove Duplicates from Sorted Array
**Problem:** Remove duplicates from a sorted array in-place and return the new length.

**Example:**
```
Input: nums = [1, 1, 2, 2, 3, 4, 4]
Output: 4, nums = [1, 2, 3, 4, _, _, _]
Explanation: First 4 elements are unique
```

**Solution:**
```javascript
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  
  let i = 0;
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}
// Time: O(n), Space: O(1)
```

#### 5. Merge Sorted Arrays
**Problem:** Merge two sorted arrays `nums1` and `nums2` into `nums1` in sorted order.

**Example:**
```
Input: nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
Output: [1, 2, 2, 3, 5, 6]
Explanation: Merge nums2 into nums1
```

**Solution:**
```javascript
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
  
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
}
// Time: O(m + n), Space: O(1)
```

---

## Strings

**Description:** Strings are sequences of characters and one of the most common data types in programming. String manipulation problems test pattern recognition, character frequency counting, and substring operations. Understanding string algorithms is crucial for text processing and interviews.

**Key Concepts:**
- Immutable in many languages (creates new string on modification)
- Common patterns: Two pointers, sliding window, hash maps
- Character frequency: Use hash map or array (for ASCII)
- Popular problems: Palindrome, Anagram, Longest Substring
- String matching: KMP, Rabin-Karp algorithms

### Common Operations
```javascript
// Access: O(1)
str[0]

// Search: O(n)
str.indexOf('a')

// Concatenation: O(n)
str1 + str2

// Substring: O(n)
str.substring(0, 5)

// Split: O(n)
str.split(' ')
```

### Common Problems

#### 1. Valid Palindrome
**Problem:** Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.

**Example:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome
```

**Solution:**
```javascript
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
// Time: O(n), Space: O(1)
```

#### 2. Valid Anagram
**Problem:** Check if two strings are anagrams of each other.

**Example:**
```
Input: s = "anagram", t = "nagaram"
Output: true
Explanation: Both strings have same characters with same frequency
```

**Solution:**
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}
// Time: O(n), Space: O(1) - limited to 26 letters
```

#### 3. Longest Substring Without Repeating Characters
**Problem:** Find the length of the longest substring without repeating characters.

**Example:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest substring without repeating characters
```

**Solution:**
```javascript
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}
// Time: O(n), Space: O(min(n, m)) where m is charset size
```

#### 4. Group Anagrams
**Problem:** Group strings that are anagrams of each other.

**Example:**
```
Input: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
Explanation: Group words with same letters
```

**Solution:**
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  
  for (let str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }
  
  return Array.from(map.values());
}
// Time: O(n * k log k), Space: O(n * k)
```

#### 5. String to Integer (atoi)
**Problem:** Convert a string to a 32-bit signed integer, handling whitespace, signs, and overflow.

**Example:**
```
Input: s = "   -42"
Output: -42
Explanation: Trim whitespace, read sign, convert digits
```

**Solution:**
```javascript
function myAtoi(s) {
  s = s.trim();
  if (!s) return 0;
  
  let sign = 1;
  let i = 0;
  
  if (s[0] === '-' || s[0] === '+') {
    sign = s[0] === '-' ? -1 : 1;
    i++;
  }
  
  let result = 0;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + (s[i] - '0');
    i++;
  }
  
  result *= sign;
  const INT_MAX = 2**31 - 1;
  const INT_MIN = -(2**31);
  
  if (result > INT_MAX) return INT_MAX;
  if (result < INT_MIN) return INT_MIN;
  return result;
}
```

---

## Linked Lists

**Description:** Linked Lists are linear data structures where elements are stored in nodes, each pointing to the next node. Unlike arrays, they don't require contiguous memory and allow efficient insertions/deletions. Understanding pointer manipulation is key to mastering linked lists.

**Key Concepts:**
- Dynamic size: Grow/shrink as needed
- No random access: Must traverse from head
- Types: Singly, Doubly, Circular linked lists
- Common patterns: Two pointers (fast/slow), dummy nodes
- Popular problems: Reverse, Detect Cycle, Merge Lists
- Trade-offs: Efficient insertions vs no random access

### Node Structure
```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
```

### Common Operations
```javascript
// Access: O(n)
// Search: O(n)
// Insert at beginning: O(1)
// Insert at end: O(n) or O(1) with tail pointer
// Delete: O(n)
```

### Common Problems

#### 1. Reverse Linked List
**Problem:** Reverse a singly linked list.

**Example:**
```
Input: head = 1 -> 2 -> 3 -> 4 -> 5
Output: 5 -> 4 -> 3 -> 2 -> 1
Explanation: Reverse the direction of all pointers
```

**Solution:**
```javascript
function reverseList(head) {
  let prev = null;
  let curr = head;
  
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  
  return prev;
}
// Time: O(n), Space: O(1)
```

#### 2. Detect Cycle (Floyd's Algorithm)
**Problem:** Determine if a linked list has a cycle.

**Example:**
```
Input: head = 3 -> 2 -> 0 -> -4 (where -4 points back to 2)
Output: true
Explanation: There is a cycle in the linked list
```

**Solution:**
```javascript
function hasCycle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  
  return false;
}
// Time: O(n), Space: O(1)
```

#### 3. Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists into one sorted list.

**Example:**
```
Input: l1 = 1 -> 2 -> 4, l2 = 1 -> 3 -> 4
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4
Explanation: Merge both lists maintaining sorted order
```

**Solution:**
```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val < l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}
// Time: O(n + m), Space: O(1)
```

#### 4. Remove Nth Node From End
**Problem:** Remove the nth node from the end of a linked list.

**Example:**
```
Input: head = 1 -> 2 -> 3 -> 4 -> 5, n = 2
Output: 1 -> 2 -> 3 -> 5
Explanation: Remove the 2nd node from end (node with value 4)
```

**Solution:**
```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  
  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }
  
  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }
  
  // Remove nth node
  slow.next = slow.next.next;
  return dummy.next;
}
// Time: O(n), Space: O(1)
```

#### 5. Find Middle of Linked List
**Problem:** Find the middle node of a linked list. If two middle nodes, return the second one.

**Example:**
```
Input: head = 1 -> 2 -> 3 -> 4 -> 5
Output: 3
Explanation: The middle node is 3

Input: head = 1 -> 2 -> 3 -> 4 -> 5 -> 6
Output: 4
Explanation: Two middle nodes (3 and 4), return second one
```

**Solution:**
```javascript
function middleNode(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}
// Time: O(n), Space: O(1)
```

---

## Stacks & Queues

**Description:** Stacks and Queues are fundamental linear data structures with specific access patterns. Stacks follow LIFO (Last In First Out) while Queues follow FIFO (First In First Out). They're essential for problems involving order, backtracking, and level-order processing.

**Key Concepts:**
- Stack: LIFO - push/pop from same end
- Queue: FIFO - enqueue at rear, dequeue from front
- Common uses: Function calls, undo/redo, BFS, expression evaluation
- Popular problems: Valid Parentheses, Min Stack, Queue using Stacks
- Implementation: Arrays or linked lists

### Stack Implementation
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    return this.items.pop();
  }
  
  peek() {
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
```

### Queue Implementation
```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    return this.items.shift();
  }
  
  front() {
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
```

### Common Problems

#### 1. Valid Parentheses
**Problem:** Determine if a string of parentheses is valid (properly opened and closed).

**Example:**
```
Input: s = "()[]{}"
Output: true
Explanation: All brackets are properly opened and closed

Input: s = "([)]"
Output: false
Explanation: Brackets are not properly nested
```

**Solution:**
```javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  
  return stack.length === 0;
}
// Time: O(n), Space: O(n)
```

#### 2. Min Stack
**Problem:** Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

**Example:**
```
Input:
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output: [null,null,null,null,-3,null,0,-2]
Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

**Solution:**
```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  
  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.getMin()) {
      this.minStack.push(val);
    }
  }
  
  pop() {
    const val = this.stack.pop();
    if (val === this.getMin()) {
      this.minStack.pop();
    }
  }
  
  top() {
    return this.stack[this.stack.length - 1];
  }
  
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
// All operations: O(1)
```

#### 3. Implement Queue using Stacks
**Problem:** Implement a queue using only two stacks.

**Example:**
```
Input:
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]

Output: [null, null, null, 1, 1, false]
Explanation:
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2]
myQueue.peek();  // return 1
myQueue.pop();   // return 1, queue is [2]
myQueue.empty(); // return false
```

**Solution:**
```javascript
class MyQueue {
  constructor() {
    this.input = [];
    this.output = [];
  }
  
  push(x) {
    this.input.push(x);
  }
  
  pop() {
    this.peek();
    return this.output.pop();
  }
  
  peek() {
    if (this.output.length === 0) {
      while (this.input.length > 0) {
        this.output.push(this.input.pop());
      }
    }
    return this.output[this.output.length - 1];
  }
  
  empty() {
    return this.input.length === 0 && this.output.length === 0;
  }
}
```

---

## Hash Tables

**Description:** Hash Tables (Hash Maps) provide average O(1) time complexity for insertions, deletions, and lookups. They use a hash function to map keys to array indices. Understanding hash tables is crucial for optimizing algorithms that require frequent lookups.

**Key Concepts:**
- Average O(1) for insert, delete, search
- Hash function: Converts key to array index
- Collision handling: Chaining or open addressing
- Load factor: Ratio of elements to buckets
- Popular problems: Two Sum, Anagram detection, Frequency counting
- JavaScript: Map, Set, Object

### Implementation
```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  
  _hash(key) {
    let total = 0;
    const PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * PRIME + value) % this.keyMap.length;
    }
    return total;
  }
  
  set(key, value) {
    const index = this._hash(key);
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    this.keyMap[index].push([key, value]);
  }
  
  get(key) {
    const index = this._hash(key);
    if (this.keyMap[index]) {
      for (let pair of this.keyMap[index]) {
        if (pair[0] === key) return pair[1];
      }
    }
    return undefined;
  }
}
```

### Common Problems

#### 1. Two Sum (using Hash Map)

**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`.

**Example:**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
```

**Solution:**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)
```

#### 2. First Unique Character

**Problem:** Given a string `s`, find the first non-repeating character and return its index. If it doesn't exist, return -1.

**Example:**
```
Input: s = "leetcode"
Output: 0
Explanation: 'l' is the first character that appears only once
```

**Solution:**
```javascript
function firstUniqChar(s) {
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let i = 0; i < s.length; i++) {
    if (count[s[i]] === 1) return i;
  }
  return -1;
}
// Time: O(n), Space: O(1) - at most 26 lowercase letters
```

#### 3. Longest Consecutive Sequence

**Problem:** Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.

**Example:**
```
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive sequence is [1, 2, 3, 4]
```

**Solution:**
```javascript
function longestConsecutive(nums) {
  const set = new Set(nums);
  let maxLen = 0;
  
  for (let num of set) {
    if (!set.has(num - 1)) {
      let currentNum = num;
      let currentLen = 1;
      
      while (set.has(currentNum + 1)) {
        currentNum++;
        currentLen++;
      }
      
      maxLen = Math.max(maxLen, currentLen);
    }
  }
  
  return maxLen;
}
// Time: O(n), Space: O(n)
```

---

## Trees

**Description:** Trees are hierarchical data structures with a root node and child nodes. Binary trees have at most two children per node. Trees are fundamental for representing hierarchical relationships and enable efficient searching, sorting, and hierarchical data storage.

**Key Concepts:**
- Binary Tree: At most 2 children per node
- Binary Search Tree (BST): Left < Root < Right
- Traversals: Inorder, Preorder, Postorder, Level-order
- Height: Longest path from root to leaf
- Popular problems: Max Depth, Validate BST, LCA, Symmetric Tree
- Balanced trees: AVL, Red-Black for O(log n) operations

### Binary Tree Node
```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
```

### Tree Traversals

#### 1. Inorder (Left, Root, Right)
```javascript
function inorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}
```

#### 2. Preorder (Root, Left, Right)
```javascript
function preorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  
  traverse(root);
  return result;
}
```

#### 3. Postorder (Left, Right, Root)
```javascript
function postorderTraversal(root) {
  const result = [];
  
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  
  traverse(root);
  return result;
}
```

#### 4. Level Order (BFS)
```javascript
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}
```

### Common Problems

#### 1. Maximum Depth

**Problem:** Given the root of a binary tree, return its maximum depth (number of nodes along the longest path from root to leaf).

**Example:**
```
Input: root = [3,9,20,null,null,15,7]
       3
      / \
     9  20
       /  \
      15   7
Output: 3
Explanation: The longest path is 3 -> 20 -> 15 (or 7)
```

**Solution:**
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
// Time: O(n), Space: O(h) where h is height
```

#### 2. Validate Binary Search Tree

**Problem:** Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST has all left descendants < node < all right descendants.

**Example:**
```
Input: root = [2,1,3]
       2
      / \
     1   3
Output: true
Explanation: All nodes satisfy BST property
```

**Solution:**
```javascript
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  
  if (root.val <= min || root.val >= max) return false;
  
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}
// Time: O(n), Space: O(h)
```

#### 3. Lowest Common Ancestor

**Problem:** Given a binary tree, find the lowest common ancestor (LCA) of two given nodes. The LCA is the lowest node that has both nodes as descendants.

**Example:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
       3
      / \
     5   1
    / \ / \
   6  2 0  8
     / \
    7   4
Output: 3
Explanation: LCA of nodes 5 and 1 is 3
```

**Solution:**
```javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  
  if (left && right) return root;
  return left || right;
}
// Time: O(n), Space: O(h)
```

#### 4. Symmetric Tree

**Problem:** Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).

**Example:**
```
Input: root = [1,2,2,3,4,4,3]
       1
      / \
     2   2
    / \ / \
   3  4 4  3
Output: true
Explanation: Tree is symmetric
```

**Solution:**
```javascript
function isSymmetric(root) {
  function isMirror(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    
    return left.val === right.val &&
           isMirror(left.left, right.right) &&
           isMirror(left.right, right.left);
  }
  
  return isMirror(root, root);
}
// Time: O(n), Space: O(h)
```

#### 5. Binary Tree Right Side View

**Problem:** Given the root of a binary tree, return the values of the nodes you can see when looking at the tree from the right side (top to bottom).

**Example:**
```
Input: root = [1,2,3,null,5,null,4]
       1
      / \
     2   3
      \   \
       5   4
Output: [1, 3, 4]
Explanation: From right side, you see 1, then 3, then 4
```

**Solution:**
```javascript
function rightSideView(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      
      if (i === levelSize - 1) {
        result.push(node.val);
      }
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  
  return result;
}
// Time: O(n), Space: O(w) where w is max width
```

---

## Graphs

**Description:** Graphs are versatile data structures representing relationships between entities. They consist of vertices (nodes) and edges (connections). Graphs model real-world problems like social networks, maps, and dependencies. Understanding graph traversal and algorithms is essential for complex problem-solving.

**Key Concepts:**
- Vertices (nodes) and Edges (connections)
- Directed vs Undirected graphs
- Weighted vs Unweighted graphs
- Representations: Adjacency List, Adjacency Matrix
- Traversals: DFS (depth-first), BFS (breadth-first)
- Popular problems: Islands, Clone Graph, Cycle Detection, Shortest Path

### Graph Representations

#### Adjacency List
```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }
  
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // For undirected graph
  }
  
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
    this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
  }
  
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}
```

### Graph Traversals

#### 1. Depth-First Search (DFS)
```javascript
function dfs(graph, start) {
  const visited = new Set();
  const result = [];
  
  function traverse(vertex) {
    if (!vertex) return;
    visited.add(vertex);
    result.push(vertex);
    
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }
  
  traverse(start);
  return result;
}
```

#### 2. Breadth-First Search (BFS)
```javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    for (let neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

### Common Problems

#### 1. Number of Islands

**Problem:** Given a 2D grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.

**Example:**
```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
Explanation: There are 3 separate islands
```

**Solution:**
```javascript
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    
    grid[i][j] = '0'; // Mark as visited
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  
  return count;
}
// Time: O(m*n), Space: O(m*n) for recursion stack
```

#### 2. Clone Graph

**Problem:** Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of its neighbors.

**Example:**
```
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: Graph with 4 nodes:
1 -- 2
|    |
4 -- 3
```

**Solution:**
```javascript
function cloneGraph(node) {
  if (!node) return null;
  
  const visited = new Map();
  
  function clone(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }
    
    const newNode = new Node(node.val);
    visited.set(node, newNode);
    
    for (let neighbor of node.neighbors) {
      newNode.neighbors.push(clone(neighbor));
    }
    
    return newNode;
  }
  
  return clone(node);
}
// Time: O(n + e), Space: O(n) where n is nodes, e is edges
```

#### 3. Course Schedule (Cycle Detection)

**Problem:** There are `numCourses` courses labeled from 0 to numCourses-1. Given prerequisites array where prerequisites[i] = [ai, bi] indicates you must take course bi before ai, return true if you can finish all courses.

**Example:**
```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: Take course 0, then course 1

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: Circular dependency - impossible to complete
```

**Solution:**
```javascript
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  
  for (let [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }
  
  const visited = new Array(numCourses).fill(0);
  // 0: unvisited, 1: visiting, 2: visited
  
  function hasCycle(course) {
    if (visited[course] === 1) return true;
    if (visited[course] === 2) return false;
    
    visited[course] = 1;
    
    for (let next of graph[course]) {
      if (hasCycle(next)) return true;
    }
    
    visited[course] = 2;
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  
  return true;
}
// Time: O(V + E), Space: O(V + E) where V is courses, E is prerequisites
```

---

## Sorting Algorithms

**Description:** Sorting algorithms arrange elements in a specific order (ascending/descending). Different algorithms have different time/space complexities and use cases. Understanding sorting is fundamental for optimizing data processing and is frequently tested in interviews.

**Key Concepts:**
- Comparison-based: Bubble, Selection, Insertion, Merge, Quick
- Non-comparison: Counting, Radix, Bucket sort
- Stable vs Unstable sorting
- In-place vs Out-of-place sorting
- Time complexities: O(n²) for simple sorts, O(n log n) for efficient sorts
- Quick Sort: Fast average case, Merge Sort: Guaranteed O(n log n)

### 1. Bubble Sort
```javascript
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// Time: O(n²), Space: O(1)
```

### 2. Selection Sort
```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}
// Time: O(n²), Space: O(1)
```

### 3. Insertion Sort
```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
// Time: O(n²), Space: O(1)
```

### 4. Merge Sort
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
// Time: O(n log n), Space: O(n)
```

### 5. Quick Sort
```javascript
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
// Time: O(n log n) average, O(n²) worst, Space: O(log n)
```

---

## Searching Algorithms

**Description:** Searching algorithms find elements in data structures. Linear search works on unsorted data but is slow. Binary search is much faster but requires sorted data. Understanding search algorithms is crucial for optimizing data retrieval operations.

**Key Concepts:**
- Linear Search: O(n) - works on unsorted data
- Binary Search: O(log n) - requires sorted data
- Binary search principle: Divide and conquer
- Applications: Finding elements, finding boundaries, optimization problems
- Variants: Lower bound, upper bound, rotated arrays

### 1. Linear Search
```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// Time: O(n), Space: O(1)
```

### 2. Binary Search
```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}
// Time: O(log n), Space: O(1)
```

### 3. Binary Search (Recursive)
```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
  return binarySearchRecursive(arr, target, left, mid - 1);
}
// Time: O(log n), Space: O(log n)
```

---

## Dynamic Programming

**Description:** Dynamic Programming (DP) solves complex problems by breaking them into simpler subproblems and storing results to avoid redundant calculations. DP is powerful for optimization problems and is a common interview topic requiring practice to master.

**Key Concepts:**
- Memoization (top-down): Cache recursive results
- Tabulation (bottom-up): Build solution iteratively
- Overlapping subproblems: Same subproblems solved multiple times
- Optimal substructure: Optimal solution contains optimal subsolutions
- Popular problems: Fibonacci, Climbing Stairs, Coin Change, Knapsack
- State definition: Key to solving DP problems

### 1. Fibonacci (Memoization)
```javascript
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
// Time: O(n), Space: O(n)
```

### 2. Climbing Stairs
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// Time: O(n), Space: O(n)
```

### 3. Coin Change
```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// Time: O(amount * coins), Space: O(amount)
```

### 4. Longest Common Subsequence
```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}
// Time: O(m * n), Space: O(m * n)
```

### 5. House Robber
```javascript
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  
  let prev2 = 0;
  let prev1 = 0;
  
  for (let num of nums) {
    const temp = prev1;
    prev1 = Math.max(prev1, prev2 + num);
    prev2 = temp;
  }
  
  return prev1;
}
// Time: O(n), Space: O(1)
```

---

## Recursion

**Description:** Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It's elegant for problems with recursive structure like trees, graphs, and divide-and-conquer algorithms. Understanding recursion is fundamental for advanced problem-solving.

**Key Concepts:**
- Base case: Stopping condition to prevent infinite recursion
- Recursive case: Function calls itself with modified parameters
- Call stack: Each recursive call uses stack memory
- Stack overflow: Too many recursive calls
- Tail recursion: Optimization where recursive call is last operation
- Common uses: Tree traversal, backtracking, divide and conquer

### Key Concepts
1. **Base Case**: Condition to stop recursion
2. **Recursive Case**: Function calls itself
3. **Stack Space**: Each call uses stack memory

### Common Problems

#### 1. Factorial
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
```

#### 2. Power
```javascript
function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}
```

#### 3. Reverse String
```javascript
function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.substr(1)) + str[0];
}
```

#### 4. Flatten Array
```javascript
function flatten(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}
```

---

## Problem-Solving Patterns

**Description:** Problem-solving patterns are reusable strategies for tackling common algorithm challenges. Recognizing these patterns helps quickly identify solution approaches. Mastering these patterns significantly improves problem-solving speed in interviews.

**Key Patterns:**
- **Two Pointers**: Use two indices moving toward/away from each other
- **Sliding Window**: Maintain a window of elements for subarray problems
- **Frequency Counter**: Use hash maps to count occurrences
- **Divide and Conquer**: Break problem into smaller subproblems
- **Backtracking**: Try all possibilities, backtrack on failure
- **Greedy**: Make locally optimal choices
- **Fast & Slow Pointers**: Detect cycles, find middle

### 1. Two Pointers
```javascript
// Example: Container With Most Water
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}
```

### 2. Sliding Window
```javascript
// Example: Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

### 3. Frequency Counter
```javascript
// Example: Valid Anagram
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
}
```

### 4. Divide and Conquer
```javascript
// Example: Binary Search
function binarySearch(arr, target) {
  function search(left, right) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    if (arr[mid] < target) {
      return search(mid + 1, right);
    }
    return search(left, mid - 1);
  }
  
  return search(0, arr.length - 1);
}
```

### 5. Backtracking
```javascript
// Example: Generate Parentheses
function generateParenthesis(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }
  
  backtrack('', 0, 0);
  return result;
}
```

---

## Interview Tips

### 1. Clarify the Problem
- Ask about input constraints
- Clarify edge cases
- Confirm expected output format

### 2. Think Out Loud
- Explain your thought process
- Discuss trade-offs
- Mention alternative approaches

### 3. Start with Brute Force
- Get a working solution first
- Then optimize

### 4. Test Your Code
- Walk through with examples
- Consider edge cases
- Check for off-by-one errors

### 5. Analyze Complexity
- Always state time and space complexity
- Explain why your solution is optimal

---

## Common Complexity Cheat Sheet

| Data Structure | Access | Search | Insert | Delete |
|----------------|--------|--------|--------|--------|
| Array          | O(1)   | O(n)   | O(n)   | O(n)   |
| Stack          | O(n)   | O(n)   | O(1)   | O(1)   |
| Queue          | O(n)   | O(n)   | O(1)   | O(1)   |
| Linked List    | O(n)   | O(n)   | O(1)   | O(1)   |
| Hash Table     | N/A    | O(1)   | O(1)   | O(1)   |
| Binary Tree    | O(n)   | O(n)   | O(n)   | O(n)   |
| BST            | O(log n)| O(log n)| O(log n)| O(log n)|

| Algorithm      | Best       | Average    | Worst      | Space      |
|----------------|------------|------------|------------|------------|
| Bubble Sort    | O(n)       | O(n²)      | O(n²)      | O(1)       |
| Selection Sort | O(n²)      | O(n²)      | O(n²)      | O(1)       |
| Insertion Sort | O(n)       | O(n²)      | O(n²)      | O(1)       |
| Merge Sort     | O(n log n) | O(n log n) | O(n log n) | O(n)       |
| Quick Sort     | O(n log n) | O(n log n) | O(n²)      | O(log n)   |
| Binary Search  | O(1)       | O(log n)   | O(log n)   | O(1)       |

---

## Resources
- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [AlgoExpert](https://www.algoexpert.io/)
- [Cracking the Coding Interview](http://www.crackingthecodinginterview.com/)
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)