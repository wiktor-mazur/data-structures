import { Queue } from './queue';

describe('Queue', () => {
  let emptyQueue: Queue<any>;
  let queue: Queue<any>;

  beforeEach(() => {
    queue = new Queue();
    queue.batchEnqueue([1, 'f', 5, 'test', 6, true, 19]);

    emptyQueue = new Queue();
  });

  describe('#peek', () => {
    test('should return tail-first element from the queue', () => {
      expect(queue.peek()).toEqual(1);
    });

    test('should not remove it from the queue', () => {
      queue.peek();
      expect(queue.peek()).toEqual(1);
    });

    test('should return null if queue is empty', () => {
      expect(emptyQueue.peek()).toBeNull();
    });
  });

  describe('#isEmpty', () => {
    test('should return false if queue is not empty', () => {
      expect(queue.isEmpty()).toBe(false);
    });

    test('should return true if the queue is empty', () => {
      expect(emptyQueue.isEmpty()).toBe(true);
    });
  });

  describe('#size', () => {
    test('should return queue\'s size', () => {
      expect(queue.size()).toEqual(7);
    });

    test('should return empty queue\'s size', () => {
      expect(emptyQueue.size()).toEqual(0);
    });
  });

  describe('#enqueue', () => {
    test('should enqueue the item', () => {
      queue.enqueue('enqueue_test');
      expect(queue.peekLast()).toEqual('enqueue_test');
    });

    test('should return the added element', () => {
      expect(queue.enqueue('enqueue_test')).toEqual('enqueue_test');
    });
  });

  describe('#batchEnqueue', () => {
    test('should enqueue the array of items', () => {
      emptyQueue.enqueue('first');
      emptyQueue.batchEnqueue(['enqueue_test', 'enqueue_test2', 'enqueue_test3']);
      expect(emptyQueue.peekLast()).toEqual('enqueue_test3');
      expect(emptyQueue.dequeue()).toEqual('first');
      expect(emptyQueue.dequeue()).toEqual('enqueue_test');
      expect(emptyQueue.dequeue()).toEqual('enqueue_test2');
      expect(emptyQueue.dequeue()).toEqual('enqueue_test3');
    });

    test('should enqueue the iterable object', () => {
      const iterable = {
        *[Symbol.iterator]() {
         yield 'enqueue_test234';
         yield 'enqueue_test678';
         yield 'enqueue_test863';
        }
      };

      emptyQueue.enqueue('first');
      emptyQueue.batchEnqueue(iterable);
      expect(emptyQueue.peekLast()).toEqual('enqueue_test863');
      expect(emptyQueue.dequeue()).toEqual('first');
      expect(emptyQueue.dequeue()).toEqual('enqueue_test234');
      expect(emptyQueue.dequeue()).toEqual('enqueue_test678');
    });

    test('should throw if non-iterable argument was passed', () => {
      // @ts-ignore
      expect(() => {queue.batchEnqueue({ obj: 1 })}).toThrow();
    });
  });

  describe('#dequeue', () => {
    test('should remove the tail-first element from the queue', () => {
      queue.dequeue();
      expect(queue.peek()).toEqual('f');
    });

    test('should return the removed element', () => {
      expect(queue.dequeue()).toEqual(1);
    });

    test('should return null if the queue was empty', () => {
      expect(emptyQueue.dequeue()).toBeNull();
    });
  });
});
