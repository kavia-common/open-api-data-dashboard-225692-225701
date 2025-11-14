import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './state/store';
import App from './App';

test('renders header title', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(screen.getByText(/Open API Dashboard/i)).toBeInTheDocument();
});
