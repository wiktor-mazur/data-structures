/**
 * Many operations could have been done much easier in JavaScript using methods and properties like
 * Array.prototype.find, .push, .pop, .length etc. but I wanted to keep it low-level and not use them.
 */

class Stack {
  constructor() {
    this._storage = [];
    this._top = -1;
  }

  /**
   * Returns top element from stack without removing it.
   *
   * @returns { null | * }
   */
  peek() {
    return this.isEmpty() ? null : this._storage[this._top];
  }

  /**
   * Returns given item's distance from the top of the stack.
   * The topmost item on the stack is considered to be at distance 1.
   *
   * @param { * } item
   *
   * @returns { number } Returns -1 when element was not found.
   */
  search(item) {
    for (let i = 0; i <= this._top; ++i) {
      if (item === this._storage[this._top - i]) {
        return i + 1;
      }
    }

    return -1;
  }

  /**
   * Checks whether the stack is empty.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this._top === -1;
  }

  /**
   * Returns stack's size.
   *
   * @returns { number }
   */
  size() {
    return this._top + 1;
  }

  /**
   * Pushes given item to the top of the stack.
   *
   * @param { * } item
   *
   * @returns Returns the item argument.
   */
  push(item) {
    this._storage[++this._top] = item;

    return item;
  }

  /**
   * Removes the topmost element from the stack and returns it.
   *
   * @returns { null | * } Returns null when the stack is empty.
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }

    const lastItem = this._storage[this._top];
    this._storage.length = this._top--;
    return lastItem;
  }

  /**
   * Swaps places of the top two element on the stack.
   */
  swap() {
    if (this._top < 1) {
      return;
    }

    const temp = this._storage[this._top];

    this._storage[this._top] = this._storage[this._top - 1];
    this._storage[this._top - 1] = temp;
  }
}

module.exports = { Stack };