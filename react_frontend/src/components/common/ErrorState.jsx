import React from 'react';

// PUBLIC_INTERFACE
export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  /** Generic error display */
  return (
    <div className="card" role="alert" style={{ borderLeft: '4px solid var(--color-error)' }}>
      <strong style={{ color: 'var(--color-error)' }}>Error:</strong> <span>{message}</span>
      {onRetry && (
        <div style={{ marginTop: 8 }}>
          <button className="button" onClick={onRetry}>Retry</button>
        </div>
      )}
    </div>
  );
}
