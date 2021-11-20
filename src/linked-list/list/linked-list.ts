import { LinkedListNode, NodeLike } from '../node/linked-list-node';

export class LinkedList<T> implements Iterable<LinkedListNode<T>> {
  root: LinkedListNode<T> | null;

  constructor(entryNode: NodeLike<T>) {
    this.root = LinkedListNode.nodeify(entryNode);
  }

  *values(): IterableIterator<LinkedListNode<T>> {
    let node = this.root;

    if (node instanceof LinkedListNode) {
      yield node;

      while ((node instanceof LinkedListNode) && node.hasNext()) {
        if (node.next) {
          node = node.next;
          yield node;
        }
      }
    }
  }

  [Symbol.iterator](): IterableIterator<LinkedListNode<T>> {
    return this.values();
  }

  getLastNode(): LinkedListNode<T> | null {
    let lastNode = null;

    for (const currentNode of this) {
      lastNode = currentNode;
    }

    return lastNode;
  }

  getSecondLastNode(): LinkedListNode<T> | null {
    let currentNode: LinkedListNode<T> | null = this.root;
    let previousNode = null;

    while ((currentNode instanceof LinkedListNode) && currentNode.hasNext()) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    return previousNode;
  }

  getNodeByIndex(index: number): LinkedListNode<T> | null {
    if (index < 0) {
      throw new TypeError('Argument \'index\' must be greater or equal to 0.');
    }

    if (!Number.isInteger(index)) {
      throw new TypeError('Argument \'index\' must be an integer.');
    }

    let currentNode = this.root;

    for (let i = 0; currentNode instanceof LinkedListNode; ++i) {
      if (i === index) {
        return currentNode;
      }

      if (currentNode.next) {
        currentNode = currentNode.next;
      } else {
        return null;
      }
    }

    return null;
  }

  findNodeByData(data: T): LinkedListNode<T> | null {
    for (const currentNode of this) {
      if (Object.is(currentNode.data, data)) {
        return currentNode;
      }
    }

    return null;
  }

  hasNode(node: LinkedListNode<T>): boolean {
    for (const currentNode of this) {
      if (currentNode === node) {
        return true;
      }
    }

    return false;
  }

  hasNodes(): boolean {
    return this.root instanceof LinkedListNode;
  }

  removeLastNode() {
    const secondLastNode = this.getSecondLastNode();

    if (secondLastNode) {
      secondLastNode.next = null;
    } else {
      this.root = null;
    }
  }

  removeFirstNode(): boolean {
    if (this.hasNodes()) {
      if (this.root?.hasNext()) {
        this.root = this.root.next;
      } else {
        this.root = null;
      }

      return true;
    }

    return false;
  }

  removeNodeAtIndex(index: number): boolean {
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

  insertEndNode(node: NodeLike<T>): LinkedListNode<T> {
    node = LinkedListNode.nodeify(node);

    const lastNode = this.getLastNode();

    if (lastNode) {
      lastNode.next = node;
    } else {
      this.root = node;
    }

    return node;
  }

  insertBeginningNode(node: NodeLike<T>): LinkedListNode<T> {
    node = LinkedListNode.nodeify(node);

    node.next = this.root;
    this.root = node;

    return node;
  }
}
