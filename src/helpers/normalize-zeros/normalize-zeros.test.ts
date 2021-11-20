import { normalizeZeros } from './normalize-zeros';

describe('normalizeZeros', () => {
  test('should convert -0 to 0', () => {
    expect(normalizeZeros(-0)).toBe(0);
  });

  test('should return 0 if 0 was passed', () => {
    expect(normalizeZeros(0)).toBe(0);
  });

  test('should leave values of other types untouched', () => {
    expect(normalizeZeros(314)).toBe(314);
    // @ts-ignore
    expect(normalizeZeros('string')).toBe('string');
  });
});
