// components/ScoreRing.tsx
import React from 'react';

interface ScoreRingProps {
  score: number;
  size?: number;
}

export const ScoreRing: React.FC<ScoreRingProps> = ({ score, size = 38 }) => {
  const clamped = Math.max(0, Math.min(10, score));
  const pct = clamped * 10;
  const radius = size / 2 - 3;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct / 100);
  const color = pct >= 70 ? '#4ADE80' : pct >= 40 ? '#FBBF24' : '#F87171';
  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-md">
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="rgba(15,23,42,0.85)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="2"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text
        x={center}
        y={center + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={size * 0.28}
        fontWeight="700"
      >
        {clamped.toFixed(1)}
      </text>
    </svg>
  );
};