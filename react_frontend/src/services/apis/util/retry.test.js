import { withRetry } from './retry';

test('withRetry retries then succeeds', async () => {
  let count = 0;
  const fn = jest.fn(async () => {
    count += 1;
    if (count < 2) throw new Error('fail');
    return 'ok';
  });
  const res = await withRetry(fn, { retries: 2, minTimeout: 1, maxTimeout: 2 });
  expect(res).toBe('ok');
  expect(fn).toHaveBeenCalledTimes(2);
});
