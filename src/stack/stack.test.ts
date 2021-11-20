import { Stack } from './stack';

describe('Stack', () => {
  let stack: Stack<any>;
  let emptyStack: Stack<any>;

  beforeEach(() => {
    stack = new Stack()
    stack.pushMany([1, 'f', 5, 'test', 6, true, 19]);

    emptyStack = new Stack();
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
      expect(emptyStack.peek()).toBeNull();
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
      expect(emptyStack.isEmpty()).toBe(true);
    });
  });

  describe('#size', () => {
    test('should return stack\'s size', () => {
      expect(stack.size()).toEqual(7);
    });

    test('should return empty stack\'s size', () => {
      expect(emptyStack.size()).toEqual(0);
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

  describe('#pushMany', () => {
    test('should enqueue the array of items', () => {
      emptyStack.push('first');
      emptyStack.pushMany(['enqueue_test', 'enqueue_test2', 'enqueue_test3']);
      expect(emptyStack.pop()).toEqual('enqueue_test3');
      expect(emptyStack.pop()).toEqual('enqueue_test2');
      expect(emptyStack.pop()).toEqual('enqueue_test');
      expect(emptyStack.pop()).toEqual('first');
    });

    test('should enqueue the iterable object', () => {
      const iterable = {
        *[Symbol.iterator]() {
          yield 'enqueue_test234';
          yield 'enqueue_test678';
          yield 'enqueue_test863';
        }
      };

      emptyStack.push('first');
      emptyStack.pushMany(iterable);
      expect(emptyStack.pop()).toEqual('enqueue_test863');
      expect(emptyStack.pop()).toEqual('enqueue_test678');
      expect(emptyStack.pop()).toEqual('enqueue_test234');
      expect(emptyStack.pop()).toEqual('first');
    });

    test('should throw if non-iterable argument was passed', () => {
      // @ts-ignore
      expect(() => {queue.batchEnqueue({ obj: 1 })}).toThrow();
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
      expect(emptyStack.pop()).toBeNull();
    });
  });

  describe('#swap', () => {
    test('should swap places of the top two element on the stack', () => {
      expect(stack.peek()).toEqual(19);
      stack.swap();
      expect(stack.pop()).toEqual(true);
      expect(stack.pop()).toEqual(19);
    });
  });
});
