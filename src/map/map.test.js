const { Map } = require('./map');

describe('Map', () => {
  test('should be iterable', () => {
    const map = new Map();

    map.set('a', 1);
    map.set(2, 'b');
    map.set('c', 3);
    map.set(4, 'd');

    const pairs = [];

    for (let pair of map) {
      pairs.push(pair);
    }

    expect(pairs).toEqual([
      ['a', 1],
      [2, 'b'],
      ['c', 3],
      [4, 'd']
    ]);
  });

  describe('#constructor', () => {
    test('should create empty Map object if no argument were passed', () => {
      const map = new Map([]);
      expect(map._keys).toEqual([]);
      expect(map._values).toEqual([]);
    });

    test('should create a Map object with initial values if they were passed', () => {
      const obj = { prop: 'test' };
      const sym = Symbol();
      const fn = function(a) { return a + 'b'; };

      const map = new Map([
        [true, 'bool'],
        ['Lorem ipsum', 'string'],
        ['Lorem ipsum', 'string2'],
        [34534, 'number'],
        [obj, 'object'],
        [{ prop: 'test' }, 'object2'],
        [sym, 'symbol'],
        [Symbol(), 'symbol2'],
        [, 'undefined'],
        [null, 'null'],
        [fn, 'function'],
        [-0, '-1'],
        [+0, '0']
      ]);

      expect(map.size()).toEqual(11);
      expect(map.get(true)).toEqual('bool');
      expect(map.get('Lorem ipsum')).toEqual('string2');
      expect(map.get(34534)).toEqual('number');
      expect(map.get({ prop: 'test' })).toEqual(null);
      expect(map.get(sym)).toEqual('symbol');
      expect(map.get(Symbol())).toEqual(null);
      expect(map.get(undefined)).toEqual('undefined');
      expect(map.get(fn)).toEqual('function');
      expect(map.get(0)).toEqual('0');
      expect(map.get(-0)).toEqual('0');
    });
  });

  describe('#has', () => {
    test('should return true if item of given key exists in the Map', () => {
      const map = new Map();
      map.set('abc', 123);

      expect(map.has('abc')).toBe(true);
    });

    test('should return false if item of given key does not exist in the Map', () => {
      const map = new Map();

      expect(map.has(1337)).toBe(false);
    });
  });

  describe('#get', () => {
    test('should return an item of given key from the Map', () => {
      const map = new Map();
      map.set('abc', 123);

      expect(map.get('abc')).toEqual(123);
    });

    test('should treat -0 and 0 as equal keys', () => {
      const map = new Map();
      map.set(0, 1);

      expect(map.get(0)).toEqual(1);
      expect(map.get(-0)).toEqual(1);
    });

    test('should return null if given key does not exist in the Map', () => {
      const map = new Map();

      expect(map.get('abc')).toEqual(null);
    });
  });

  describe('#keys', () => {
    test('should return an array of Map\'s keys', () => {
      const map = new Map();
      map.set('a', 1);
      map.set(2, 'b');

      expect(map.keys()).toEqual(['a', 2]);
    });
  });

  describe('#values', () => {
    test('should return an array of Map\'s values', () => {
      const map = new Map();
      map.set('a', 1);
      map.set(2, 'b');

      expect(map.values()).toEqual([1, 'b']);
    });
  });

  describe('#entries', () => {
    test('should return an array of Map\'s key-value pairs', () => {
      const map = new Map();
      map.set('a', 1);
      map.set(2, 'b');

      expect(map.entries()).toEqual([
        ['a', 1],
        [2, 'b']
      ]);
    });
  });

  describe('#size', () => {
    test('should return a number of Map\'s items', () => {
      const map = new Map();
      map.set('a', 1);
      map.set(2, 'b');

      expect(map.size()).toBe(2);
    });
  });

  describe('#isEmpty', () => {
    test('should return true if given Map is empty', () => {
      const map = new Map();
      map.set(1, 2);
      map.delete(1);

      expect(map.isEmpty()).toBe(true);
    });

    test('should return false if given Map is not empty', () => {
      const map = new Map();
      map.set(1, 2);

      expect(map.isEmpty()).toBe(false);
    });
  });

  describe('#set', () => {
    test('should add given key-value pair to the Map', () => {
      const map = new Map();
      map.set('key', 123);

      expect(map.get('key')).toEqual(123);
    });

    test('should override existing keys with a new value', () => {
      const map = new Map();
      map.set('key', 123);
      map.set('key', 456);

      expect(map.size()).toEqual(1);
      expect(map.get('key')).toEqual(456);
    });

    test('should treat NaN and NaN as equal keys', () => {
      const map = new Map();
      map.set(NaN, 123);
      map.set(NaN, 456);

      expect(map.size()).toEqual(1);
      expect(map.get(NaN)).toEqual(456);
    });

    test('should treat -0 and 0 as equal keys', () => {
      const map = new Map();
      map.set(-0, 123);
      map.set(0, 456);

      expect(map.size()).toEqual(1);
      expect(map.get(0)).toEqual(456);
    });

    test('should work properly with object keys', () => {
      const map = new Map();
      const obj = { test: 'a' };
      map.set(obj, 'x');
      map.set({ test: 'a' }, 'x');

      expect(map.size()).toEqual(2);
      expect(map.get(obj)).toEqual('x');
      expect(map.get({ test: 'a' })).toEqual(null);
    });

    test('should return the Map object', () => {
      const map = new Map();

      expect(map.set(null, null)).toEqual(map);
    });
  });

  describe('#delete', () => {
    test('should remove an item of given key form the Map', () => {
      const map = new Map();
      map.set('key', 'value').delete('key');

      expect(map.has('key')).toBe(false);
    });

    test('should return the Map object', () => {
      const map = new Map();

      expect(map.delete(1)).toEqual(map);
    });
  });

  describe('#clear', () => {
    test('should clear the map', () => {
      const map = new Map();
      map.set(1, 2).clear();

      expect(map.isEmpty()).toBe(true);
    });

    test('should return the Map object', () => {
      const map = new Map();

      expect(map.clear()).toEqual(map);
    });
  });
});