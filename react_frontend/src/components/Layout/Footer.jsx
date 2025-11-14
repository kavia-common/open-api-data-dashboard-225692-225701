import React from 'react';
import config from '../../config/env';

// PUBLIC_INTERFACE
export default function Footer() {
  /** App footer with health info */
  return (
    <footer className="footer">
      <div className="container">
        <span>© {new Date().getFullYear()} Open API Dashboard</span>
        <span style={{ marginLeft: 12, opacity: 0.8 }}>
          Env: {config.nodeEnv} · Log: {config.logLevel}
        </span>
        <a href={config.healthcheckPath} style={{ marginLeft: 12 }}>
          Healthcheck
        </a>
      </div>
    </footer>
  );
}
