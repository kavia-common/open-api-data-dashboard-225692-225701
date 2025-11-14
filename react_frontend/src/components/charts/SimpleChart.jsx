import React from 'react';

/**
 * SimpleChart draws a lightweight SVG line chart.
 * props:
 *  - data: array<number>
 *  - labels: array<string>
 *  - height, width: numbers
 */
// PUBLIC_INTERFACE
export default function SimpleChart({ data = [], labels = [], height = 120, width = 320 }) {
  if (!data.length) return <div style={{ padding: 8, opacity: 0.7 }}>No data</div>;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const stepX = width / (data.length - 1 || 1);

  const points = data.map((v, i) => {
    const x = i * stepX;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} role="img" aria-label="Simple line chart">
      <polyline
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        points={points}
      />
      {data.map((v, i) => {
        const x = i * stepX;
        const y = height - ((v - min) / range) * height;
        return <circle key={i} cx={x} cy={y} r="2" fill="var(--color-secondary)" />;
      })}
    </svg>
  );
}
