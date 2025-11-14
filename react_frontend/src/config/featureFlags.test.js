import { parseFeatureFlags, isEnabled } from './featureFlags';

test('parseFeatureFlags supports CSV', () => {
  const set = parseFeatureFlags('a,b , c');
  expect(set.has('a')).toBe(true);
  expect(set.has('b')).toBe(true);
  expect(set.has('c')).toBe(true);
});

test('parseFeatureFlags supports JSON array', () => {
  const set = parseFeatureFlags('["x","y"]');
  expect(set.has('x')).toBe(true);
  expect(set.has('y')).toBe(true);
});

test('isEnabled returns boolean', () => {
  expect(typeof isEnabled('unknown')).toBe('boolean');
});
