import React from 'react';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App app-shell">
      <Header />
      <main className="main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
