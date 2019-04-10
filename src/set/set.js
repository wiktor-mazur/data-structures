const { normalizeZeros } = require('../helpers/normalize-zeros/normalize-zeros');
const { isIterable } = require('../helpers/is-iterable/is-iterable');

class Set {
  /**
   * Creates a new Set with initial values.
   *
   * @param { [iterable] } initialValues
   */
  constructor(initialValues = []) {
    this._storage = [];

    if (!isIterable(initialValues)) {
      throw new TypeError('Argument initialValues is not an iterable object.');
    }

    for (let value of initialValues) {
      this.add(value);
    }
  }

  /**
   * Returns a new Iterator object that contains an each element of the Set.
   *
   * @returns { { next: Function } }
   */
  [Symbol.iterator]() {
    let index = -1;

    return {
      next: () => {
        return {
          value: this._storage[++index],
          done: !(index in this._storage)
        }
      }
    };
  }

  _find(item) {
    item = normalizeZeros(item);

    return this._storage.findIndex(currentItem => {
      return Object.is(currentItem, item);
    });
  }

  /**
   * Adds given item to Set.
   *
   * @param { * } item
   *
   * @returns { boolean } Returns false if the item was already in the Set.
   */
  add(item) {
    if (!this.has(item)) {
      this._storage.push(normalizeZeros(item));
      return true;
    }

    return false;
  }

  /**
   * Removes given item from the set
   *
   * @param { * } item
   *
   * @returns { boolean } Returns false if item wasn't in the Set.
   */
  delete(item) {
    const index = this._find(item);

    if (index !== -1) {
      this._storage.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Clears the set.
   */
  clear() {
    this._storage = [];
  }

  /**
   * Checks whether the set contains given item.
   *
   * @param { * } item
   *
   * @returns { boolean }
   */
  has(item) {
    return this._find(item) !== -1;
  }

  /**
   * Returns all values of the Set.
   *
   * @returns { Array<*> }
   */
  values() {
    return this._storage;
  }

  /**
   * Returns number of Set's items.
   *
   * @returns { number }
   */
  size() {
    return this._storage.length;
  }

  /**
   * Checks whether the Set is empty.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Returns all Set's items.
   *
   * @param { string } separator
   *
   * @returns { string }
   */
  print(separator = ' ') {
    return this._storage.join(separator);
  }

  /**
   * Returns an union of set1 and set2.
   *
   * @static
   *
   * @param { Set } set1
   * @param { Set } set2
   *
   * @returns { Set }
   */
  static union(set1, set2) {
    Set._validateIfArgumentIsSet(set1);
    Set._validateIfArgumentIsSet(set2);

    const unionSet = new Set(set1.values());

    set2.values().forEach(item => {
      unionSet.add(item);
    });

    return unionSet;
  }

  /**
   * Returns an intersection of set1 and set2.
   *
   * @static
   *
   * @param { Set } set1
   * @param { Set } set2
   *
   * @returns { Set }
   */
  static intersection(set1, set2) {
    Set._validateIfArgumentIsSet(set1);
    Set._validateIfArgumentIsSet(set2);

    const intersectionSet = new Set();

    set1.values().forEach(item => {
      if (set2.has(item)) {
        intersectionSet.add(item);
      }
    });

    return intersectionSet;
  }

  /**
   * Returns an new Set containing all the items of set1 that are not in set2.
   *
   * @static
   *
   * @param { Set } set1
   * @param { Set } set2
   *
   * @returns { Set }
   */
  static difference(set1, set2) {
    Set._validateIfArgumentIsSet(set1);
    Set._validateIfArgumentIsSet(set2);

    const diffSet = new Set();

    set2.values().forEach(item => {
      if (!set1.has(item)) {
        diffSet.add(item);
      }
    });

    return diffSet;
  }

  /**
   * Checks whether the set1 is a superset of set2.
   *
   * @static
   *
   * @param { Set } set1
   * @param { Set } set2
   *
   * @returns { boolean }
   */
  static isSuperset(set1, set2) {
    Set._validateIfArgumentIsSet(set1);
    Set._validateIfArgumentIsSet(set2);

    return set2.values().every(item => {
      return set1.has(item);
    });
  }

  /**
   * Checks whether set1 is subset of set2.
   *
   * @static
   *
   * @param { Set } set1
   * @param { Set } set2
   *
   * @returns { boolean }
   */
  static isSubset(set1, set2) {
    Set._validateIfArgumentIsSet(set1);
    Set._validateIfArgumentIsSet(set2);

    return set1.values().every(item => {
      return set2.has(item);
    });
  }

  /**
   * Throws and error if passed argument is not an instance of Set.
   *
   * @static
   * @private
   *
   * @param { * } arg
   *
   * @throws TypeError
   */
  static _validateIfArgumentIsSet(arg) {
    if (!(arg instanceof Set)) {
      throw new TypeError('Argument must be an instance of Set.');
    }
  }
}

module.exports = { Set };