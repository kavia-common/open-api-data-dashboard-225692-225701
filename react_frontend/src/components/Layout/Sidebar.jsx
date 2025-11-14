import React from 'react';
import { NavLink } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /** Simple accessible sidebar navigation */
  return (
    <aside className="surface" style={{ padding: 12 }}>
      <nav aria-label="Section navigation" className="nav" style={{ flexDirection: 'column' }}>
        <NavLink to="/" className="button ghost">Overview</NavLink>
        <NavLink to="/explorer" className="button ghost">API Explorer</NavLink>
        <NavLink to="/about" className="button ghost">About</NavLink>
      </nav>
    </aside>
  );
}
