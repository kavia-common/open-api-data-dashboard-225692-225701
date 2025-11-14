import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ children, variant = 'primary', onClick, disabled, type = 'button', style, ...rest }) {
  /** Themed button component */
  const className = ['button', variant === 'secondary' ? 'secondary' : '', variant === 'ghost' ? 'ghost' : '']
    .filter(Boolean)
    .join(' ');
  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled} style={style} {...rest}>
      {children}
    </button>
  );
}
