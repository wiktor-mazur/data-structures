const { Set } = require('./set');

describe('Set', () => {
  let set;

  beforeEach(() => {
    set = new Set();
    set._storage = [1, 'f', 5, 'test', 6, true, 19];
  });

  test('should be iterable', () => {
    let items = [];

    for (let item of set) {
      items.push(item);
    }

    expect(items).toEqual([1, 'f', 5, 'test', 6, true, 19]);
  });

  describe('#constructor', () => {
    test('should create empty storage on construction if no argument were passed', () => {
      const set = new Set();
      expect(set._storage).toEqual([]);
    });

    test('should create initially filled set on construction if array was passed', () => {
      const set = new Set([1, 2, 3]);
      expect(set._storage).toEqual([1, 2, 3]);
    });

    test('should create initially filled set on construction if iterable object was passed', () => {
      const iterable = {
        *[Symbol.iterator]() {
          yield 2;
          yield 4;
          yield 6;
        }
      };

      const set = new Set(iterable);
      expect(set._storage).toEqual([2, 4, 6]);
    });

    test('should throw if non-iterable object was passed', () => {
      expect(() => {new Set(1, 2, 3)}).toThrow();
    });
  });

  describe('#add', () => {
    test('should add element to the set and return true', () => {
      expect(set.add(1337)).toBe(true);
      expect(set.has(1337)).toBe(true);
    });

    test('should not add element to the set if it already exists and return false', () => {
      set.add(-0);
      set.add(NaN);
      const initialSetLength = set.size();
      expect(set.add(6)).toBe(false);
      expect(set.add(6)).toBe(false);
      expect(set.add(6)).toBe(false);
      expect(set.add(-0)).toBe(false);
      expect(set.add(NaN)).toBe(false);
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
      const set2 = new Set([5, 'test2', 123]);
      const union = Set.union(set, set2);
      expect(union._storage).toEqual([1, 'f', 5, 'test', 6, true, 19, 'test2', 123]);
    });
  });

  describe('#intersection', () => {
    test('should return a new set: A ∩ B', () => {
      const set1 = new Set([0, 2, 4, 6, 8, 10]);
      const set2 = new Set([1, 2, 3, 5, 8, 13]);
      expect(Set.intersection(set1, set2).values()).toEqual([2, 8]);
    });
  });

  describe('#difference', () => {
    test('should return a new set that is equal to B \ A', () => {
      const set1 = new Set([0, 2, 4, 6, 8, 10]);
      const set2 = new Set([1, 2, 3, 5, 8, 13]);
      expect(Set.difference(set1, set2).values()).toEqual([1, 3, 5, 13]);
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
      set.add(NaN);
      set.add(-0);
      expect(set.has(5)).toBe(true);
      expect(set.has('test')).toBe(true);
      expect(set.has(true)).toBe(true);
      expect(set.has(NaN)).toBe(true);
      expect(set.has(-0)).toBe(true);
    });

    test('should return false if set does not have the item', () => {
      expect(set.has(6456456)).toBe(false);
      expect(set.has('dsfgdfsgdf')).toBe(false);
      expect(set.has(false)).toBe(false);
      expect(set.has(NaN)).toBe(false);
      expect(set.has(-0)).toBe(false);
    });
  });

  describe('#values', () => {
    test('should return set\'s values as array', () => {
      expect(set.values()).toEqual(set._storage);
    });
  });

  describe('#isSuperset', () => {
    test('should return true if set1 is superset set2', () => {
      const subset = new Set([19, 5, 6, 'f']);
      expect(Set.isSuperset(set, subset)).toBe(true);
    });

    test('should return false if set1 is not superset set2', () => {
      const supposedSubset = new Set(['dfgdfg', 1234957]);
      expect(Set.isSuperset(set, supposedSubset)).toBe(false);
    });
  });

  describe('#isSubset', () => {
    test('should return true if set1 is subset of set2', () => {
      const superset = new Set([19, 'sdafh', 5, 6, 'f', true, 1, 'test', 21, 'xxx', false, 34654]);
      expect(Set.isSubset(set, superset)).toBe(true);
    });

    test('should return false if set1 is not subset of set2', () => {
      const supposedSuperset = new Set([5, 6, 7, 8, 9, 10, '345']);
      expect(Set.isSubset(set, supposedSuperset)).toBe(false);
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
    test('should print the set with default space separator', () => {
      expect(set.print()).toEqual('1 f 5 test 6 true 19');
    });

    test('should print the set with custom separator', () => {
      expect(set.print('-')).toEqual('1-f-5-test-6-true-19');
    });
  });
});