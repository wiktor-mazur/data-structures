export type NodeLike<T> = LinkedListNode<T> | T;

export class LinkedListNode<T> {
  data: T;
  next: LinkedListNode<T> | null;

  constructor(data: T, next: NodeLike<T> | null = null) {
    this.data = data;
    this.next = next !== null ? LinkedListNode.nodeify(next) : null;
  }

  hasNext(): boolean {
    return this.next instanceof LinkedListNode;
  }

  insertNodeAfter(node: NodeLike<T>): LinkedListNode<T> {
    node = LinkedListNode.nodeify(node);

    node.next = this.next;
    this.next = node;

    return node;
  }

  removeNodeAfter() {
    if (this.hasNext() && this.next?.hasNext()) {
      this.next = this.next.next;
    } else {
      this.next = null;
    }
  }

  static nodeify<T>(node: LinkedListNode<T> | T): LinkedListNode<T> {
    if (node instanceof LinkedListNode) {
      return node;
    } else {
      return new LinkedListNode(node);
    }
  }
}
