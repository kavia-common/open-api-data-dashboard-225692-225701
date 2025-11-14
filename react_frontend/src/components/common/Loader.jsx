import React from 'react';

// PUBLIC_INTERFACE
export default function Loader({ label = 'Loading...' }) {
  /** Minimal loader with accessible label */
  return (
    <div role="status" aria-live="polite" className="surface" style={{ padding: 12 }}>
      <span style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0
      }}>{label}</span>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        border: '3px solid rgba(37,99,235,0.25)', borderTopColor: 'var(--color-primary)',
        animation: 'spin 1s linear infinite', margin: '6px auto'
      }} />
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
      <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.7 }}>{label}</div>
    </div>
  );
}
