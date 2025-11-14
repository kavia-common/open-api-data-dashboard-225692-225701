import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from './ErrorState';

test('ErrorState renders and retries', () => {
  const onRetry = jest.fn();
  render(<ErrorState message="Failed" onRetry={onRetry} />);
  expect(screen.getByText(/Failed/)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/Retry/));
  expect(onRetry).toHaveBeenCalled();
});
