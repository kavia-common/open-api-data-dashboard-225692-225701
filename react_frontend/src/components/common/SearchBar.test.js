import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('SearchBar calls onChange', () => {
  const onChange = jest.fn();
  render(<SearchBar onChange={onChange} />);
  const input = screen.getByRole('searchbox');
  fireEvent.change(input, { target: { value: 'abc' } });
  expect(onChange).toHaveBeenCalledWith('abc');
});
