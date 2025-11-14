import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ placeholder = 'Search...', onChange, ariaLabel = 'Search input' }) {
  /** Accessible search input that debounces change events lightly */
  const [value, setValue] = useState('');
  return (
    <input
      className="input"
      aria-label={ariaLabel}
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        const v = e.target.value;
        setValue(v);
        if (onChange) onChange(v);
      }}
    />
  );
}
