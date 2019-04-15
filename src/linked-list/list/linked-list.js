const { LinkedListNode } = require('../node/linked-list-node');

class LinkedList {
  /**
   * Creates a new LinkedList with given entry node.
   * @constructor
   *
   * @param { * | LinkedListNode } entryNode
   */
  constructor(entryNode) {
    this.next = LinkedListNode.nodeify(entryNode);
  }

  /**
   * Yields each of the lists's nodes.
   * @generator
   *
   * @yields { LinkedListNode }
   */
  *values() {
    let node = this.next;

    if (node instanceof LinkedListNode) {
      yield node;

      while ((node instanceof LinkedListNode) && node.hasNext()) {
        node = node.next;
        yield node;
      }
    }
  }

  /**
   * Returns values() generator
   *
   * @returns { function }
   */
  [Symbol.iterator]() {
    return this.values();
  }

  /**
   * Returns last list's node or null.
   *
   * @returns { LinkedListNode | null }
   */
  getLastNode() {
    let lastNode = null;

    for (let currentNode of this) {
      lastNode = currentNode;
    }

    return lastNode;
  }

  /**
   * Returns second last list's node or null.
   *
   * @returns { LinkedListNode | null }
   */
  getSecondLastNode() {
    let currentNode = this.next;
    let previousNode = null;

    while ((currentNode instanceof LinkedListNode) && currentNode.hasNext()) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return previousNode;
  }

  /**
   * Returns list's node at given index or null.
   *
   * @param { number } index
   *
   * @throws TypeError
   *
   * @returns { LinkedListNode | null }
   */
  getNodeByIndex(index) {
    if (index < 0) {
      throw new TypeError('Argument \'index\' must be greater or equal to 0.');
    }

    if (!Number.isInteger(index)) {
      throw new TypeError('Argument \'index\' must be an integer.');
    }

    let currentNode = this.next;

    for (let i = 0; currentNode instanceof LinkedListNode; ++i) {
      if (i === index) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * Returns list's node containing given data or null.
   *
   * @param { * } data
   *
   * @returns { LinkedListNode | null }
   */
  findNodeByData(data) {
    for (let currentNode of this) {
      if (Object.is(currentNode.data, data)) {
        return currentNode;
      }
    }

    return null;
  }

  /**
   * Checks whether the list contains given node or not.
   *
   * @param { LinkedListNode } node
   *
   * @returns { boolean }
   */
  hasNode(node) {
    for (let currentNode of this) {
      if (currentNode === node) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks whether the list has any nodes or not.
   *
   * @returns { boolean }
   */
  hasNodes() {
    return this.next instanceof LinkedListNode;
  }

  /**
   * Removes last node of the list.
   */
  removeLastNode() {
    const secondLastNode = this.getSecondLastNode();

    if (secondLastNode) {
      secondLastNode.next = null;
    } else {
      this.next = null;
    }
  }

  /**
   * Removes first node of the list.
   *
   * @returns { boolean }
   */
  removeFirstNode() {
    if (this.hasNodes()) {
      if (this.next.hasNext()) {
        this.next = this.next.next;
      } else {
        this.next = null;
      }
    }

    return false;
  }

  /**
   * Removes node at given index from the list.
   *
   * @param { number } index
   *
   * @throws TypeError
   *
   * @returns { boolean }
   */
  removeNodeAtIndex(index) {
    if (index === 0) {
      this.removeFirstNode();
      return true;
    } else {
      const previousNode = this.getNodeByIndex(index - 1);

      if (previousNode) {
        previousNode.removeNodeAfter();
        return true;
      }
    }

    return false;
  }

  /**
   * Inserts given node to the end of the list and returns it.
   *
   * @param { LinkedListNode | * } node
   *
   * @returns { LinkedListNode }
   */
  insertEndNode(node) {
    node = LinkedListNode.nodeify(node);

    const lastNode = this.getLastNode();

    if (lastNode) {
      lastNode.next = node;
    } else {
      this.next = node;
    }

    return node;
  }

  /**
   * Inserts given node to the beginning of the list and returns it.
   *
   * @param { LinkedListNode | * } node
   *
   * @returns { LinkedListNode }
   */
  insertBeginningNode(node) {
    node = LinkedListNode.nodeify(node);

    node.next = this.next;
    this.next = node;

    return node;
  }
}

module.exports = { LinkedList };