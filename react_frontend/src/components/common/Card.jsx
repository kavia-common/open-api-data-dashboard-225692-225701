import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, children, actions, style }) {
  /** Themed card container */
  return (
    <section className="card" style={style} aria-label={title || 'Card'}>
      {(title || actions) && (
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div>
            {title && <h3 style={{ margin: 0 }}>{title}</h3>}
            {subtitle && <small style={{ opacity: 0.7 }}>{subtitle}</small>}
          </div>
          {actions && <div>{actions}</div>}
        </header>
      )}
      <div>{children}</div>
    </section>
  );
}
