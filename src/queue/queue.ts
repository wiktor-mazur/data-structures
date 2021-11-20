import { isIterable } from '../helpers/is-iterable/is-iterable';

export class Queue<T> {
  private storage: T[] = [];

  enqueue(item: T): T {
    this.storage.push(item);

    return item;
  }

  batchEnqueue(items: Iterable<T>): void {
    if (!isIterable(items)) {
      throw new TypeError('Argument items must be an iterable object.');
    }

    for (const item of items) {
      this.enqueue(item);
    }
  }

  dequeue(): T | null {
    return this.isEmpty() ? null : this.storage.shift() || null;
  }

  /**
   * Returns first element on the queue without removing it.
   */
  peek(): T | null {
    return this.isEmpty() ? null : this.storage[0];
  }

  /**
   * Returns last element on the queue without removing it.
   */
  peekLast(): T | null {
    return this.isEmpty() ? null : this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}
