/**
 * Deeply merges two or more objects into a new object.
 *
 * Rules:
 * - Primitives (including null): overwritten by the latest value
 * - Plain objects: merged recursively
 * - Arrays: overwritten by the latest array (cloned)
 * - Non-object inputs (null, undefined, numbers, strings, etc.): ignored
 *
 * @param {...any} sources Two or more objects to merge.
 * @returns {Object} A new merged object (inputs are not mutated).
 */
const deepMerge = (...sources) => {
  const result = {};

  sources.forEach((source) => {
    if (!isPlainObject(source)) {
      return;
    }

    mergeInto(result, source);
  });

  return result;
};

/**
 * Merges `source` into `target`.
 * Only `target` is mutated; source values are cloned to keep inputs immutable.
 *
 * @param {Object} target
 * @param {Object} source
 * @returns {void}
 */
const mergeInto = (target, source) => {
  Object.keys(source).forEach((key) => {
    const incoming = source[key];
    const existing = target[key];

    // Objects: recursively merge (only if both are plain objects)
    if (isPlainObject(incoming)) {
      if (isPlainObject(existing)) {
        target[key] = deepMerge(existing, incoming);
        return;
      }

      // Clone incoming object into a fresh object
      target[key] = deepMerge(incoming);
      return;
    }

    // Arrays: overwrite by design (and clone to avoid sharing reference)
    if (Array.isArray(incoming)) {
      target[key] = incoming.slice();
      return;
    }

    // Primitives / null: overwrite with latest value
    target[key] = incoming;
  });
};

/**
 * Checks whether a value is a plain object (not null, not array, not Date, etc.).
 *
 * @param {any} value
 * @returns {boolean}
 */
const isPlainObject = (value) => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  if (Array.isArray(value)) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

module.exports = deepMerge;