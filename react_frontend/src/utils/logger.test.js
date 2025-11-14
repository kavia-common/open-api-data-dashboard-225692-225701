import logger, { redact } from './logger';

test('redact hides sensitive params', () => {
  const url = 'https://example.com?a=1&token=abc&api_key=xyz';
  const redacted = redact(url);
  expect(redacted).not.toContain('abc');
  expect(redacted).not.toContain('xyz');
});

test('logger exposes methods', () => {
  expect(typeof logger.info).toBe('function');
  expect(typeof logger.error).toBe('function');
});
