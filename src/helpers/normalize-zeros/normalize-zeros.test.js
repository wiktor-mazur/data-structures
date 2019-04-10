const { normalizeZeros } = require('./normalize-zeros');

describe('normalizeZeros', () => {
  test('should convert -0 to 0', () => {
    expect(normalizeZeros(-0)).toBe(0);
  });

  test('should return 0 if 0 was passed', () => {
    expect(normalizeZeros(0)).toBe(0);
  });

  test('should leave values of other types untouched', () => {
    const obj = {a: 1};
    const sym = Symbol();

    expect(normalizeZeros(314)).toBe(314);
    expect(normalizeZeros('string')).toBe('string');
    expect(normalizeZeros(true)).toBe(true);
    expect(normalizeZeros(obj)).toBe(obj);
    expect(normalizeZeros(sym)).toBe(sym);
  });
});
