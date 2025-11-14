import { getConfig } from './env';

test('getConfig returns defaults safely', () => {
  const cfg = getConfig();
  expect(cfg).toHaveProperty('nodeEnv');
  expect(cfg).toHaveProperty('logLevel');
  expect(typeof cfg.frontendUrl).toBe('string');
});
