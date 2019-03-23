const { Stack } = require('./stack');

describe('Stack', () => {
  let stack;

  test('should set empty storage and proper top pointer on construction', () => {
    const stack = new Stack();
    expect(stack._storage).toEqual([]);
    expect(stack._top).toEqual(-1);
  });

  beforeEach(() => {
    stack = new Stack();
    stack._storage = [1, 'f', 5, 'test', 6, true, 19];
    stack._top = 6;
  });

  describe('#peek', () => {
    test('should return topmost element from the stack', () => {
      expect(stack.peek()).toEqual(19);
    });

    test('should not remove the topmost element from the stack', () => {
      stack.peek();
      expect(stack.peek()).toEqual(19);
    });

    test('should return null if stack is empty', () => {
      stack._storage = [];
      stack._top = -1;
      expect(stack.peek()).toBeNull();
    });
  });

  describe('#search', () => {
    test('should return element\'s distance from the top of the stack', () => {
      expect(stack.search(19)).toEqual(1);
      expect(stack.search(true)).toEqual(2);
      expect(stack.search('f')).toEqual(6);
    });

    test('should return -1 if the element could not have been found', () => {
      expect(stack.search('sdfsdf')).toEqual(-1);
      expect(stack.search(5654654)).toEqual(-1);
      expect(stack.search(false)).toEqual(-1);
    });
  });

  describe('#isEmpty', () => {
    test('should return false if stack is not empty', () => {
      expect(stack.isEmpty()).toBe(false);
    });

    test('should return true if stack is empty', () => {
      stack._storage = [];
      stack._top = -1;
      expect(stack.isEmpty()).toBe(true);
    });
  });

  describe('#size', () => {
    test('should return stack\'s size', () => {
      expect(stack.size()).toEqual(7);
    });
  });

  describe('#push', () => {
    test('should push element to the top of the stack', () => {
      stack.push('push_test');
      expect(stack.peek()).toEqual('push_test');
    });

    test('should return the added element', () => {
      expect(stack.push('push_test')).toEqual('push_test');
    });
  });

  describe('#pop', () => {
    test('should remove the topmost element from the stack', () => {
      stack.pop();
      expect(stack.peek()).toEqual(true);
    });

    test('should return the removed element', () => {
      expect(stack.pop()).toEqual(19);
    });

    test('should return null if stack was empty', () => {
      stack._storage = [];
      stack._top = -1;
      expect(stack.pop()).toBeNull();
    });
  });

  describe('#swap', () => {
    test('should swap places of the top two element on the stack', () => {
      stack.swap();
      expect(stack._storage).toEqual([1, 'f', 5, 'test', 6, 19, true]);
    });
  });
});