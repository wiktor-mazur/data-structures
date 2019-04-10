const { isIterable } = require('../helpers/is-iterable/is-iterable');

class Queue {
  /**
   * Creates empty queue storage.
   */
  constructor() {
    this._storage = [];
  }

  /**
   * Adds item to the end of the queue.
   *
   * @param { * } item
   *
   * @returns { * } inserted item
   */
  enqueue(item) {
    this._storage.push(item);

    return item;
  }

  /**
   * Adds a list of items to the end of the queue.
   *
   * @param { [iterable] } items
   */
  batchEnqueue(items) {
    if (!isIterable(items)) {
      throw new TypeError('Argument items must be an iterable object.');
    }

    for (let item of items) {
      this._storage.push(item);
    }
  }

  /**
   * Removes and returns first element on the queue.
   *
   * @returns { null | * } First element on the queue or null if empty.
   */
  dequeue() {
    return this.isEmpty() ? null : this._storage.shift();
  }

  /**
   * Returns first element on the queue without removing it.
   *
   * @returns { null | * } First element on the queue or null if empty.
   */
  peek() {
    return this.isEmpty() ? null : this._storage[0];
  }

  /**
   * Returns last element on the queue without removing it.
   *
   * @returns { null | * } Last element on the queue or null if empty.
   */
  peekLast() {
    return this.isEmpty() ? null : this._storage[this.size() - 1];
  }

  /**
   * Returns size of the queue.
   *
   * @returns { number } Size of the queue.
   */
  size() {
    return this._storage.length;
  }

  /**
   * Checks whether the queue is empty.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this.size() === 0;
  }
}

module.exports = { Queue };