import { isIterable } from './is-iterable';

function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

function dummy() {
  return true;
}

const iterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};

describe('isIterable', () => {
  test('should return true for iterable arguments', () => {
    expect(isIterable('string')).toBe(true);
    expect(isIterable([1, 'a', true, 3])).toBe(true);
    expect(isIterable(generator())).toBe(true);
    expect(isIterable(iterable)).toBe(true);
  });

  test('should return false for non-iterable arguments', () => {
    expect(isIterable({ a: 'a', b: 2 })).toBe(false);
    expect(isIterable(dummy)).toBe(false);
    expect(isIterable(dummy())).toBe(false);
  });
});
