/**
 * If given value is -0 it converts it to 0, otherwise returns untouched value.
 *
 * @param { * } value
 *
 * @returns { * }
 */
function normalizeZeros(value) {
  return Object.is(value, -0) ? 0 : value;
}

module.exports = { normalizeZeros };
