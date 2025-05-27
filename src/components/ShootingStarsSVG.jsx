import React from 'react';

const ShootingStarsSVG = () => {
  const viewWidth = 1000;
  const viewHeight = 500; // top half of full 1000x1000

  const generateShootingStars = () => {
    return Array.from({ length: 5 }).map((_, index) => {
      const startX = -50 - Math.random() * 100;
      const startY = Math.random() * viewHeight; // only top half
      const horizontalDistance = 400 + Math.random() * 600;
      const verticalDistance = 200 + Math.random() * 400;
      const endX = startX + horizontalDistance;
      const endY = Math.min(startY + verticalDistance, viewHeight);
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 15;

      return (
        <path
          key={`shooting-${index}`}
          d={`M${startX},${startY} L${endX},${endY}`}
          stroke="url(#cometGradient)"
          strokeWidth="2.5"
          opacity="0"
          filter="url(#glow)"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0;0.9;0"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
            keyTimes="0;0.3;1"
          />
          <animate
            attributeName="d"
            from={`M${startX},${startY} L${startX},${startY}`}
            to={`M${endX},${endY} L${endX - (endX - startX)*0.1},${endY - (endY - startY)*0.1}`}
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0, 1000; 800, 200; 1000, 0"
            dur={`${duration}s`}
            begin={`${delay}s`}
            repeatCount="indefinite"
          />
        </path>
      );
    });
  };

  return (
    <svg className="shooting-stars" viewBox={`0 0 ${viewWidth} ${viewHeight}`} preserveAspectRatio="none" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '50vh', zIndex: 0 }}>
      <defs>
        <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {generateShootingStars()}
    </svg>
  );
};

export default ShootingStarsSVG;