const { Set } = require('./set');

describe('Set', () => {
  let set;

  test('should create empty storage on construction if no argument were passed', () => {
    const set = new Set();
    expect(set._storage).toEqual([]);
  });

  test('should create initially filled set on construction if arguments were passed', () => {
    const set = new Set(1, 2, 3);
    expect(set._storage).toEqual([1, 2, 3]);
  });

  beforeEach(() => {
    set = new Set();
    set._storage = [1, 'f', 5, 'test', 6, true, 19];
  });

  describe('#add', () => {
    test('should add element to the set and return true', () => {
      expect(set.add(1337)).toBe(true);
      expect(set.has(1337)).toBe(true);
    });

    test('should not add element to the set if it already exists and return false', () => {
      const initialSetLength = set.size();
      expect(set.add(6)).toBe(false);
      expect(set.add(6)).toBe(false);
      expect(set.add(6)).toBe(false);
      expect(set.size()).toEqual(initialSetLength);
    });
  });

  describe('#delete', () => {
    test('should delete existing item from set and return true', () => {
      expect(set.delete(5)).toBe(true);
      expect(set._storage).toEqual([1, 'f', 'test', 6, true, 19]);
    });

    test('should return false if the item does not exist and should not mutate the set', () => {
      expect(set.delete(54354)).toBe(false);
      expect(set._storage).toEqual([1, 'f', 5, 'test', 6, true, 19]);
    });
  });

  describe('#union', () => {
    test('should return new set that is the union of 2 sets', () => {
      const anotherSet = new Set(5, 'test2', 123);
      const union = set.union(anotherSet);
      expect(union._storage).toEqual([1, 'f', 5, 'test', 6, true, 19, 'test2', 123]);
    });
  });

  describe('#intersection', () => {
    test('should return a new set: A ∩ B', () => {
      const a = new Set(0, 2, 4, 6, 8, 10);
      const b = new Set(1, 2, 3, 5, 8, 13);
      expect(a.intersection(b).values()).toEqual([2, 8]);
    });
  });

  describe('#difference', () => {
    test('should return a new set that is equal to B \ A', () => {
      const a = new Set(0, 2, 4, 6, 8, 10);
      const b = new Set(1, 2, 3, 5, 8, 13);
      expect(a.difference(b).values()).toEqual([1, 3, 5, 13]);
    });
  });

  describe('#clear', () => {
    test('should clear the set', () => {
      set.clear();
      expect(set._storage).toEqual([]);
    });
  });

  describe('#has', () => {
    test('should return true if set has the item', () => {
      expect(set.has(5)).toBe(true);
      expect(set.has('test')).toBe(true);
      expect(set.has(true)).toBe(true);
    });

    test('should return false if set does not have the item', () => {
      expect(set.has(6456456)).toBe(false);
      expect(set.has('dsfgdfsgdf')).toBe(false);
      expect(set.has(false)).toBe(false);
    });
  });

  describe('#values', () => {
    test('should return set\'s values as array', () => {
      expect(set.values()).toEqual(set._storage);
    });
  });

  describe('#isSupersetOf', () => {
    test('should return true if set is superset of given set', () => {
      const subset = new Set(19, 5, 6, 'f');
      expect(set.isSupersetOf(subset)).toBe(true);
    });

    test('should return false if set is not superset of given set', () => {
      const supposedSubset = new Set('dfgdfg', 1234957);
      expect(set.isSupersetOf(supposedSubset)).toBe(false);
    });
  });

  describe('#isSubsetOf', () => {
    test('should return true if set is subset of given set', () => {
      const superset = new Set(19, 'sdafh', 5, 6, 'f', true, 1, 'test', 21, 'xxx', false, 34654);
      expect(set.isSubsetOf(superset)).toBe(true);
    });

    test('should return false if set is not subset of given set', () => {
      const supposedSuperset = new Set(5, 6, 7, 8, 9, 10, '345');
      expect(set.isSubsetOf(supposedSuperset)).toBe(false);
    });
  });

  describe('#size', () => {
    test('should return set\'s size', () => {
      const emptySet = new Set();
      expect(emptySet.size()).toEqual(0);
      expect(set.size()).toEqual(7);
    });
  });

  describe('#isEmpty', () => {
    test('should return true if set is empty', () => {
      const emptySet = new Set();
      expect(emptySet.isEmpty()).toBe(true);
    });

    test('should return false if set is not empty', () => {
      expect(set.isEmpty()).toBe(false);
    });
  });

  describe('#print', () => {
    test('should print the set', () => {
      expect(set.print()).toEqual('1 f 5 test 6 true 19');
    });
  });
});