const test = require('node:test');
const assert = require('node:assert/strict');

const deepMerge = require('../utils/deepMerge');

test('deepMerge merges nested objects deeply', () => {
  const obj1 = { user: { name: 'Moeez' } };
  const obj2 = { user: { age: 22 } };

  const result = deepMerge(obj1, obj2);

  assert.deepEqual(result, { user: { name: 'Moeez', age: 22 } });
});

test('deepMerge does not mutate input objects', () => {
  const obj1 = { a: { b: 1 } };
  const obj2 = { a: { c: 2 } };

  const obj1Snapshot = JSON.parse(JSON.stringify(obj1));
  const obj2Snapshot = JSON.parse(JSON.stringify(obj2));

  deepMerge(obj1, obj2);

  assert.deepEqual(obj1, obj1Snapshot);
  assert.deepEqual(obj2, obj2Snapshot);
});

test('deepMerge overwrites primitives with the latest value', () => {
  const result = deepMerge({ a: 1 }, { a: 2 });

  assert.deepEqual(result, { a: 2 });
});

test('deepMerge resolves conflicting types by taking the latest value', () => {
  const result = deepMerge({ a: { b: 1 } }, { a: 2 });

  assert.deepEqual(result, { a: 2 });
});

test('deepMerge ignores non-object inputs like null', () => {
  const result = deepMerge({ a: 1 }, null);

  assert.deepEqual(result, { a: 1 });
});

test('deepMerge handles empty objects', () => {
  const result = deepMerge({}, {});

  assert.deepEqual(result, {});
});

test('deepMerge overwrites arrays and clones them', () => {
  const obj1 = { list: [1, 2] };
  const obj2 = { list: [3] };

  const result = deepMerge(obj1, obj2);

  assert.deepEqual(result, { list: [3] });
  assert.notStrictEqual(result.list, obj2.list);
});