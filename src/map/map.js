const { isIterable } = require('../helpers/is-iterable/is-iterable');

class Map {
  /**
   * Creates a new Map with initial values.
   *
   * @param { [iterable] } initialEntries
   */
  constructor(initialEntries = []) {
    this._keys = [];
    this._values = [];

    if (!isIterable(initialEntries)) {
      throw new TypeError('Argument initialEntries is not an iterable object.');
    }

    for (let pair of initialEntries) {
      this.set(pair[0], pair[1]);
    }
  }

  /**
   * Returns a new Iterator object that contains an key-value pair for each element in the Map.
   *
   * @returns { { next: Function } }
   */
  [Symbol.iterator]() {
    let index = -1;

    return {
      next: () => {
        ++index;

        return {
          value: [this._keys[index], this._values[index]],
          done: !(index in this._values)
        }
      }
    };
  }

  /**
   * Finds element's position in the Map by it's index.
   *
   * @private
   *
   * @param { * } key
   *
   * @returns { number | null }
   */
  _findIndexByKey(key) {
    key = this._normalizeZeros(key);

    const index = this._keys.findIndex(currentKey => {
      return Object.is(key, currentKey);
    });

    return index >= 0 ? index : null;
  }

  /**
   * If given value is -0 it converts it to 0, otherwise returns untouched value.
   *
   * @private
   *
   * @param { * } value
   *
   * @returns { * }
   */
  _normalizeZeros(value) {
    return Object.is(value, -0) ? 0 : value;
  }

  /**
   * Checks if given element exists in the Map.
   *
   * @param { * } key
   *
   * @returns { boolean }
   */
  has(key) {
    const index = this._findIndexByKey(key);

    return Number.isInteger(index) && index >= 0;
  }

  /**
   * Returns a value assigned to given key.
   *
   * @param { * } key
   *
   * @returns { * } Value under given key.
   */
  get(key) {
    const index = this._findIndexByKey(key);

    return Number.isInteger(index) && index >= 0 ? this._values[index] : null;
  }

  /**
   * Returns an array of Map's keys.
   *
   * @returns { Array<*> }
   */
  keys() {
    return this._keys;
  }

  /**
   * Returns an array of Map's values.
   *
   * @returns { Array<*> }
   */
  values() {
    return this._values;
  }

  /**
   * Returns an array of Map's key-value pairs.
   *
   * @returns { Array<Array<*, *>> }
   */
  entries() {
    return this._keys.reduce((prev, currentKey, i) => {
      const value = this._values[i];
      return [...prev, [currentKey, value]];
    }, []);
  }

  /**
   * Returns the number of Map's key-value pairs.
   *
   * @returns { number }
   */
  size() {
    return this._keys.length;
  }

  /**
   * Checks if Map is empty.
   *
   * @returns { boolean }
   */
  isEmpty() {
    return this.size() === 0;
  }

  /**
   * Assigns given value to given key and returns the Map object.
   * It overrides existing keys with a new value.
   *
   * @param { * } key
   * @param { * } value
   *
   * @returns { this }
   */
  set(key, value) {
    const index = this._findIndexByKey(key);

    if (index == null) {
      this._keys.push(this._normalizeZeros(key));
      this._values.push(this._normalizeZeros(value));
    } else {
      this._values[index] = this._normalizeZeros(value);
    }

    return this;
  }

  /**
   * Deletes a pair of given key from the Map and returns the Map object.
   *
   * @param { * } key
   *
   * @returns { this }
   */
  delete(key) {
    const index = this._findIndexByKey(key);

    if (index != null && index >= 0) {
      this._keys.splice(index, 1);
      this._values.splice(index, 1);
    }

    return this;
  }

  /**
   * Clears the Map and returns it.
   *
   * @returns { this }
   */
  clear() {
    this._keys = [];
    this._values = [];

    return this;
  }
}

module.exports = { Map };