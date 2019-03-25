class Set {
  /**
   * Creates a new Set with initial values.
   *
   * @param { ...* } initialValues
   */
  constructor(...initialValues) {
    this._storage = initialValues || [];
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
      this._storage.push(item);
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
    const index = this._storage.indexOf(item);

    if (index !== -1) {
      this._storage.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Returns an union of two Sets.
   *
   * @param { Set } set
   *
   * @returns { Set }
   */
  union(set) {
    this._validateIfArgumentIsSet(set);

    const newSet = new Set(...this.values());

    set.values().forEach(item => {
      newSet.add(item);
    });

    return newSet;
  }

  /**
   * Returns an intersection of two Sets.
   *
   * @param { Set } set
   *
   * @returns { Set }
   */
  intersection(set) {
    this._validateIfArgumentIsSet(set);

    const newSet = new Set();

    this._storage.forEach(item => {
      if (set.has(item)) {
        newSet.add(item);
      }
    });

    return newSet;
  }

  /**
   * Returns an new Set containing all the items of B that are not in A, where B is the given set.
   *
   * @param { Set } set
   *
   * @returns { Set }
   */
  difference(set) {
    this._validateIfArgumentIsSet(set);

    const newSet = new Set();

    set.values().forEach(item => {
      if (!this.has(item)) {
        newSet.add(item);
      }
    });

    return newSet;
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
    return this._storage.indexOf(item) !== -1;
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
   * Checks whether the Set is a superset of the given set.
   *
   * @param { Set } set
   *
   * @returns { boolean }
   */
  isSupersetOf(set) {
    this._validateIfArgumentIsSet(set);

    return set.values().every(item => {
      return this.has(item);
    });
  }

  /**
   * Checks whether the Set is a subset of the given set.
   *
   * @param { Set } set
   *
   * @returns { boolean }
   */
  isSubsetOf(set) {
    this._validateIfArgumentIsSet(set);

    return this._storage.every(item => {
      return set.has(item);
    });
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
   * Returns all Set's items separated by space.
   *
   * @returns { string }
   */
  print() {
    return this._storage.join(' ');
  }

  /**
   * Throws and error if passed argument is not an instance of Set.
   *
   * @param { * } arg
   *
   * @throws Error
   */
  _validateIfArgumentIsSet(arg) {
    if (!(arg instanceof Set)) {
      throw new Error('Argument \'set\' must be an instance of Set.');
    }
  }
}

module.exports = { Set };