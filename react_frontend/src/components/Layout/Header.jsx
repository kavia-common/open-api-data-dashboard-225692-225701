import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme, setFilter } from '../../state/slices/uiSlice';

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with navigation, global search and theme toggle */
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return (
    <header className="header" role="banner">
      <div className="container nav" aria-label="Main navigation">
        <Link to="/" className="nav-title" aria-label="Home">
          <strong style={{ color: 'var(--color-primary)' }}>Open API Dashboard</strong>
        </Link>
        <nav className="nav" role="navigation">
          <NavLink to="/" className="button ghost" aria-label="Dashboard">Dashboard</NavLink>
          <NavLink to="/explorer" className="button ghost" aria-label="API Explorer">Explorer</NavLink>
          <NavLink to="/about" className="button ghost" aria-label="About">About</NavLink>
        </nav>
        <div style={{ flex: 1 }} />
        <SearchBar
          placeholder="Quick filter..."
          onChange={(v) => dispatch(setFilter(v))}
          ariaLabel="Global search filter"
        />
        <Button
          aria-label="Toggle theme"
          onClick={() => dispatch(toggleTheme())}
          style={{ marginLeft: 12 }}
          variant="secondary"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </Button>
      </div>
    </header>
  );
}
