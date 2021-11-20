import { isIterable } from '../helpers/is-iterable/is-iterable';

/**
 * Many operations could have been done just fine using methods and properties like
 * Array.prototype.find, .push, .pop, .length etc. but I wanted to keep it closer to low-level implementations
 */
export class Stack<T> {
  private storage: T[] = [];
  private top = -1;

  /**
   * Returns top element from the stack without removing it.
   */
  peek(): T | null {
    return this.isEmpty() ? null : this.storage[this.top];
  }

  /**
   * Returns given item's distance from the top of the stack.
   * The topmost item on the stack is considered to be at distance 1.
   */
  search(item: T): number {
    for (let i = 0; i <= this.top; ++i) {
      if (item === this.storage[this.top - i]) {
        return i + 1;
      }
    }

    return -1;
  }

  isEmpty(): boolean {
    return this.top === -1;
  }

  size(): number {
    return this.top + 1;
  }

  push(item: T): T {
    this.storage[++this.top] = item;

    return item;
  }

  pushMany(items: Iterable<T>): void {
    if (!isIterable(items)) {
      throw new TypeError('Argument items must be an iterable object.');
    }

    for (const item of items) {
      this.push(item);
    }
  }

  pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }

    const lastItem = this.storage[this.top];
    this.storage.length = this.top--;

    return lastItem;
  }

  /**
   * Swaps places of the top two element on the stack.
   */
  swap(): void {
    if (this.top < 1) {
      return;
    }

    const temp = this.storage[this.top];

    this.storage[this.top] = this.storage[this.top - 1];
    this.storage[this.top - 1] = temp;
  }
}
