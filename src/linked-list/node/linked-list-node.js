class LinkedListNode {
  /**
   * Creates new LinkedListNode with given data and optionally next item pointer.
   * @constructor
   *
   * @param { * } data
   * @param { LinkedListNode | * | null } next
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next !== null ? LinkedListNode.nodeify(next) : null;
  }

  /**
   * Checks whether the node has next item or not.
   *
   * @returns { boolean }
   */
  hasNext() {
    return this.next instanceof LinkedListNode;
  }

  /**
   * Inserts node after this one and returns it.
   *
   * @param { LinkedListNode | * } node
   *
   * @returns { LinkedListNode | null }
   */
  insertNodeAfter(node) {
    node = LinkedListNode.nodeify(node);

    node.next = this.next;
    this.next = node;

    return node;
  }

  /**
   * Removes node after this one.
   */
  removeNodeAfter() {
    if (this.hasNext() && this.next.hasNext()) {
      this.next = this.next.next;
    } else {
      this.next = null;
    }
  }

  /**
   * Creates LinkedListNode from given data.
   *
   * @param { LinkedListNode | * } node
   *
   * @returns { LinkedListNode }
   */
  static nodeify(node) {
    if (node instanceof LinkedListNode) {
      return node;
    } else {
      return new LinkedListNode(node);
    }
  }
}

module.exports = { LinkedListNode };