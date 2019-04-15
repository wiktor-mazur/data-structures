const { LinkedListNode } = require('./linked-list-node');

describe('LinkedListNode', () => {
  describe('#constructor', () => {
    test('should set given data', () => {
      const obj = {data: Symbol()};
      const node = new LinkedListNode(obj);

      expect(node.data).toEqual(obj);
    });

    describe('when next pointer was not passed', () => {
      test('should set next to null', () => {
        const node = new LinkedListNode();

        expect(node.next).toBeNull();
      });
    });

    describe('when next pointer was passed', () => {
      describe('if next pointer is of type LinkedListNode', () => {
        test('should set next to given LinkedListNode', () => {
          const nextNode = new LinkedListNode('b');
          const node = new LinkedListNode('a', nextNode);

          expect(node.next).toEqual(nextNode);
        });
      });

      describe('if next pointer is null', () => {
        test('should set next to null', () => {
          const node = new LinkedListNode(null, null);

          expect(node.next).toBeNull();
        });
      });

      describe('if next pointer is of any other type', () => {
        test('should create a new LinkedListNode instance, set it\'s data and assign it to next pointer', () => {
          const node = new LinkedListNode('a', 'b');

          expect(node.next instanceof LinkedListNode).toBe(true);
          expect(node.next.data).toEqual('b');
        });
      });
    });
  });

  describe('#hasNext', () => {
    test('should return true if node has next item', () => {
      const node = new LinkedListNode('a', 'b');

      expect(node.hasNext()).toBe(true);
    });

    test('should return false if node does not have next item', () => {
      const node = new LinkedListNode('a');

      expect(node.hasNext()).toBe(false);
    });
  });

  describe('#insertNodeAfter', () => {
    test('should nodeify the input', () => {
      const node = new LinkedListNode('a');
      node.insertNodeAfter('b');

      expect(node.next instanceof LinkedListNode).toBe(true);
    });

    describe('when this node is the last one in the list', () => {
      test('should insert new node after this one', () => {
        const nextNode = new LinkedListNode('b');
        const node = new LinkedListNode('a');
        node.insertNodeAfter(nextNode);

        expect(node.next).toEqual(nextNode);
        expect(node.next.next).toBeNull();
      });
    });

    describe('when this node is the last one in the list', () => {
      test('should insert new node between this one and the next one', () => {
        const nextNode = new LinkedListNode('b');
        const node = new LinkedListNode('a', 'c');
        node.insertNodeAfter(nextNode);

        expect(node.next.data).toEqual('b');
        expect(node.next.next.data).toEqual('c');
        expect(node.next.next.next).toBeNull();
      });
    });
  });

  describe('#removeNodeAfter', () => {
    describe('when this node has exactly one more item', () => {
      test('should remove this item', () => {
        const node = new LinkedListNode('a', 'b');
        node.removeNodeAfter();

        expect(node.data).toEqual('a');
        expect(node.next).toBeNull();
      });
    });

    describe('when this node has at least two more items', () => {
      test('should remove next item and glue this item with the rest of the list', () => {
        const node = new LinkedListNode('a', 'c');
        node.insertNodeAfter('b');
        node.removeNodeAfter();

        expect(node.data).toEqual('a');
        expect(node.next.data).toEqual('c');
        expect(node.next.next).toBeNull();
      });
    });

    describe('when this node has no next item', () => {
      test('should take no effect', () => {
        const node = new LinkedListNode('a');
        node.removeNodeAfter();

        expect(node.data).toEqual('a');
        expect(node.next).toBeNull();
      });
    });
  });

  describe('#nodeify', () => {
    describe('when given argument is of LinkedListNode type', () => {
      test('should return the unchanged argument', () => {
        const node = new LinkedListNode('a');

        expect(LinkedListNode.nodeify(node)).toEqual(node);
      });
    });

    describe('when given argument is not of LinkedListNode type', () => {
      test('should return new LinkedListItem and set it\'s data to given argument', () => {
        const node = LinkedListNode.nodeify('a');

        expect(node instanceof LinkedListNode).toBe(true);
        expect(node.data).toEqual('a');
      });
    });
  });
});