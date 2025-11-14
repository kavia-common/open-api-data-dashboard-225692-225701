import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './state/store';
import App from './App';

function ThemedRoot() {
  const theme = useSelector((s) => s.ui.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemedRoot />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
