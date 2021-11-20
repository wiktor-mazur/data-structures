/**
 * If given value is -0 it converts it to 0, otherwise returns the unchanged value.
 */
export function normalizeZeros(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}

