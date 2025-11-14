import { renderHook, act } from '@testing-library/react';
import useAsync from './useAsync';

test('useAsync runs and sets value', async () => {
  const { result } = renderHook(() => useAsync(async () => 'hi', []));
  await act(async () => { await result.current.run(); });
  expect(result.current.value).toBe('hi');
  expect(result.current.isLoading).toBe(false);
});
