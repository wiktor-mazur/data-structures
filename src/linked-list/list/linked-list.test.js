const { LinkedList } = require('./linked-list');
const { LinkedListNode } = require('../node/linked-list-node');

describe('LinkedList', () => {
  describe('#constructor', () => {
    test('should nodeify input and set as first node', () => {
      const list = new LinkedList('a');

      expect(list.next instanceof LinkedListNode).toBe(true);
      expect(list.next.data).toEqual('a');
    });
  });

  describe('#[Symbol.iterator]', () => {
    test('should return list\'s values generator', () => {
      const list = new LinkedList('a');
      list.insertEndNode('b');

      const valuesMock = jest.fn(list.values);
      list.values = valuesMock;

      for (let item of list) {}

      expect(valuesMock.mock.calls.length).toEqual(1);
    });
  });

  describe('#values', () => {
    test('should yield all list\'s values', () => {
      const values = [];
      const list = new LinkedList('a');
      list.insertEndNode('b');

      for (let item of list.values()) {
        values.push(item.data);
      }

      expect(values).toEqual(['a', 'b']);
    });

    test('should not yield anything if the list is empty', () => {
      let iterations = 0;

      const list = new LinkedList('a');
      list.removeLastNode();

      for (let item of list.values()) {
        ++iterations;
      }

      expect(iterations).toEqual(0);
    });
  });

  describe('#getLastNode', () => {
    test('should return last node', () => {
      const list = new LinkedList('a');
      expect(list.getLastNode().data).toEqual('a');
      list.insertEndNode('b');
      expect(list.getLastNode().data).toEqual('b');
    });

    test('should return null if there are no nodes', () => {
      const list = new LinkedList('a');
      list.removeLastNode();

      expect(list.getLastNode()).toBeNull();
    });
  });

  describe('#getSecondLastNode', () => {
    test('should return second last node', () => {
      const list = new LinkedList('a');
      list.insertEndNode('b');
      list.insertEndNode('c');

      expect(list.getSecondLastNode().data).toEqual('b');
    });

    test('should return null if there is no second last node', () => {
      const list = new LinkedList('a');

      expect(list.getSecondLastNode()).toBeNull();
    });
  });

  describe('#getNodeByIndex', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList('a');
      list.insertEndNode('b');
      list.insertEndNode('c');
      list.insertEndNode('d');
      list.insertEndNode('e');
    });

    test('should find and return first item', () => {
      expect(list.getNodeByIndex(0).data).toEqual('a');
    });

    test('should find and return middle item', () => {
      expect(list.getNodeByIndex(2).data).toEqual('c');
    });

    test('should find and return last item', () => {
      expect(list.getNodeByIndex(4).data).toEqual('e');
    });

    test('should return null if item does not exist', () => {
      expect(list.getNodeByIndex(99)).toBeNull();
    });

    test('should throw if negative index was passed', () => {
      expect(() => {
        list.getNodeByIndex(-1);
      }).toThrow();
    });

    test('should throw if non-numeric index was passed', () => {
      expect(() => {
        list.getNodeByIndex('string');
      }).toThrow();
    });

    test('should throw if float index was passed', () => {
      expect(() => {
        list.getNodeByIndex(1.5);
      }).toThrow();
    });
  });

  describe('#findNodeByData', () => {
    let list;
    let data = {obj: 'value'};
    const node = new LinkedListNode(data);

    beforeEach(() => {
      list = new LinkedList('b');
      list.insertBeginningNode('a');
      list.insertEndNode(node);
      list.insertEndNode('c');
    });

    test('should find node in the list by it\'s data', () => {
      expect(list.findNodeByData('a') instanceof LinkedListNode).toBe(true);
      expect(list.findNodeByData('b') instanceof LinkedListNode).toBe(true);
      expect(list.findNodeByData('c') instanceof LinkedListNode).toBe(true);
      expect(list.findNodeByData(data)).toEqual(node);
    });

    test('should return null if the list does not contain node with given data', () => {
      expect(list.findNodeByData({obj: 'value'})).toBeNull();
      expect(list.findNodeByData('d')).toBeNull();
    });
  });

  describe('#hasNode', () => {
    let list;
    let node;

    beforeEach(() => {
      list = new LinkedList('a');
      node = new LinkedListNode('b');
    });

    test('should return true if the list contains given node', () => {
      list.insertEndNode(node);

      expect(list.hasNode(node)).toBe(true);
    });

    test('should return false if the list does not contain given node', () => {
      expect(list.hasNode(node)).toBe(false);
    });
  });

  describe('#hasNodes', () => {
    test('should return true if list has at least one node', () => {
      const list = new LinkedList('a');

      expect(list.hasNodes()).toBe(true);
    });

    test('should return false if list has no nodes', () => {
      const list = new LinkedList('a');
      list.removeLastNode();

      expect(list.hasNodes()).toBe(false);
    });
  });

  describe('#removeLastNode', () => {
    test('should remove last node if there\'s only one node in the list', () => {
      const list = new LinkedList('a');
      list.removeLastNode();

      expect(list.next).toBeNull();
    });

    test('should remove last node if there are more than two nodes in the list', () => {
      const list = new LinkedList('a');
      list.insertEndNode('b');
      list.insertEndNode('c');
      list.removeLastNode();

      expect(list.next.data).toEqual('a');
      expect(list.next.next.data).toEqual('b');
      expect(list.next.next.next).toBeNull();
    });

    test('should take no action if there are no nodes in the list', () => {
      const list = new LinkedList('a');
      list.removeLastNode();
      list.removeLastNode();
      list.removeLastNode();

      expect(list.next).toBeNull();
    });
  });

  describe('#removeFirstNode', () => {
    test('should remove first node if it\'s the only node in the list', () => {
      const list = new LinkedList('a');
      list.removeFirstNode();

      expect(list.next).toBeNull();
    });

    test('should remove first nodes if there are more than two nodes in the list', () => {
      const list = new LinkedList('a');
      list.insertEndNode('b');
      list.insertEndNode('c');
      list.insertEndNode('d');
      list.removeFirstNode();
      list.removeFirstNode();

      expect(list.next.data).toEqual('c');
      expect(list.next.next.data).toEqual('d');
      expect(list.next.next.next).toBeNull();
    });

    test('should take no action if the list is empty', () => {
      const list = new LinkedList('a');
      list.removeFirstNode();
      list.removeFirstNode();
      list.removeFirstNode();
      list.removeFirstNode();

      expect(list.next).toBeNull();
    });
  });

  describe('#removeNodeAtIndex', () => {
    let list;

    beforeEach(() => {
      list = new LinkedList('a');
      list.insertEndNode('b');
      list.insertEndNode('c');
    });

    test('should remove first node in the list', () => {
      list.removeNodeAtIndex(0);

      expect(list.next.data).toEqual('b');
      expect(list.next.next.data).toEqual('c');
      expect(list.next.next.next).toBeNull();
    });

    test('should remove middle node from the list', () => {
      list.removeNodeAtIndex(1);

      expect(list.next.data).toEqual('a');
      expect(list.next.next.data).toEqual('c');
      expect(list.next.next.next).toBeNull();
    });

    test('should remove last node in the list', () => {
      list.removeNodeAtIndex(2);

      expect(list.next.data).toEqual('a');
      expect(list.next.next.data).toEqual('b');
      expect(list.next.next.next).toBeNull();
    });

    test('should remove all items from the list', () => {
      list.removeNodeAtIndex(1);
      list.removeNodeAtIndex(0);
      list.removeNodeAtIndex(0);

      expect(list.next).toBeNull();
    });

    test('should return true if the removal was successful', () => {
      expect(list.removeNodeAtIndex(0)).toBe(true);
    });

    test('should return false if the removal was not successful', () => {
      expect(list.removeNodeAtIndex(100)).toBe(false);
    });

    test('should throw if passed index is negative', () => {
      expect(() => {
        list.removeNodeAtIndex(-1);
      }).toThrow();
    });

  });

  describe('#insertEndNode', () => {
    test('should insert node at the end if the list is empty', () => {
      const list = new LinkedList('a');
      list.removeLastNode();
      list.insertEndNode(new LinkedListNode('b'));

      expect(list.next.data).toEqual('b');
    });

    test('should insert new node at the end if the list is not empty', () => {
      const list = new LinkedList('a');
      list.insertEndNode(new LinkedListNode('b'));

      expect(list.next.next.data).toEqual('b');
    });

    test('should nodify input', () => {
      const list = new LinkedList('a');
      list.insertEndNode('b');

      expect(list.next instanceof LinkedListNode).toBe(true);
      expect(list.next.next instanceof LinkedListNode).toBe(true);
    });
  });

  describe('#insertBeginningNode', () => {
    test('should insert node at the beginning if the list is empty', () => {
      const list = new LinkedList('b');
      list.removeLastNode();
      list.insertBeginningNode(new LinkedListNode('a'));

      expect(list.next.data).toEqual('a');
    });

    test('should insert new node at the beginning if the list is not empty', () => {
      const list = new LinkedList('b');
      list.insertBeginningNode(new LinkedListNode('a'));

      expect(list.next.data).toEqual('a');
    });

    test('should nodify input', () => {
      const list = new LinkedList('b');
      list.insertBeginningNode('a');

      expect(list.next instanceof LinkedListNode).toBe(true);
      expect(list.next.next instanceof LinkedListNode).toBe(true);
    });
  });
});