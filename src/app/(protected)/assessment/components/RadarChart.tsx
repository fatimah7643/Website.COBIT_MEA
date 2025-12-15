'use client';

import React, { useState, useEffect } from 'react';

interface RadarChartComponentProps {
  data: Array<{
    subject: string;
    score: number;
    fullMark: number;
  }>;
}

const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a placeholder during SSR
    return (
      <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded">
        <div className="text-gray-500">Loading chart...</div>
      </div>
    );
  }

  // Calculate the points for the radar chart
  const angles = data.map((_, i) => (i * 2 * Math.PI) / data.length);
  const maxValue = Math.max(...data.map(item => item.fullMark), 5);

  // Calculate points for the radar shape
  const points = data.map((item, i) => {
    const angle = angles[i];
    const normalizedScore = item.score / maxValue;
    const distance = normalizedScore * 120; // max radius
    const x = 150 + distance * Math.sin(angle);
    const y = 150 - distance * Math.cos(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate axis lines
  const axisLines = data.map((item, i) => {
    const angle = angles[i];
    const x = 150 + 120 * Math.sin(angle);
    const y = 150 - 120 * Math.cos(angle);
    return `M150,150 L${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 300 300">
        {/* Grid circles */}
        <circle cx="150" cy="150" r="30" fill="none" stroke="#e5e7eb" />
        <circle cx="150" cy="150" r="60" fill="none" stroke="#e5e7eb" />
        <circle cx="150" cy="150" r="90" fill="none" stroke="#e5e7eb" />
        <circle cx="150" cy="150" r="120" fill="none" stroke="#e5e7eb" />

        {/* Axis lines */}
        <path d={axisLines} stroke="#e5e7eb" strokeWidth="1" />

        {/* Data polygon */}
        <polygon
          points={points}
          fill="#3b82f6"
          fillOpacity="0.6"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((item, i) => {
          const angle = angles[i];
          const normalizedScore = item.score / maxValue;
          const distance = normalizedScore * 120;
          const x = 150 + distance * Math.sin(angle);
          const y = 150 - distance * Math.cos(angle);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#3b82f6"
              stroke="white"
              strokeWidth="1"
            />
          );
        })}

        {/* Labels */}
        {data.map((item, i) => {
          const angle = angles[i];
          const normalizedScore = item.score / maxValue;
          const distance = normalizedScore * 120 + 25; // Add distance for label
          const x = 150 + distance * Math.sin(angle);
          const y = 150 - distance * Math.cos(angle);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="12"
              fill="#374151"
            >
              {item.subject}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChartComponent;