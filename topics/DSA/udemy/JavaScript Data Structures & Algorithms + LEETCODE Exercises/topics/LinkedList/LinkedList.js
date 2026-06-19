/**
    class LinkedList {
        constructor(value) {
            // create new Node
            }
        push(value) {
            // create new Node
            // add Node to end
            }
        unshift(value) {
            // create new Node
            // add Node to beginning
            }
        insert(index, value) {
            // create new Node
            // insert Node at index
            }

            example 4 -> 5
            {
                value:4,
                next: {
                    value: 5,
                    next: null
                }
            }
 */

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.length = 0
    if (value) {
      const newNode = new Node(value)
      this.head = newNode
      this.tail = this.head
      this.length = 1
    }
  }

  push(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
    return this
  }
}

let myLinkedList = new LinkedList(4);
myLinkedList.push(32);
myLinkedList.push(2);
myLinkedList.push(45);
myLinkedList.push(98);
console.dir(myLinkedList, { depth: null });
