// StaticStarsSVG.jsx - Fixed circles with transparent background
import React from 'react';

const generateStarPath = (size) => {
  return `M${size} 0L${size*0.38} ${size*0.38}L0 ${size*0.38}L${size*0.38} ${size*0.62}L${size*0.16} ${size}L${size*0.5} ${size*0.78}L${size*0.84} ${size}L${size*0.62} ${size*0.62}L${size} ${size*0.38}L${size*0.62} ${size*0.38}Z`;
};

const StaticStarsSVG = () => (
  <svg className="stars" viewBox="0 0 1000 1000" preserveAspectRatio="none">
    <defs>
      <filter id="twinkle" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    {Array.from({ length: 150 }).map((_, index) => {
      const x = Math.random() * 1000;
      const y = Math.random() * 1000;
      const size = 1 + Math.random() * 3;
      const rotate = Math.random() * 360;
      const duration = 1 + Math.random() * 3;
      const delay = Math.random() * 5;

      return (
        <g key={index} transform={`translate(${x},${y}) rotate(${rotate})`} filter="url(#twinkle)">
          <path
            d={generateStarPath(size)}
            fill="#ffffff"
            opacity="0.8"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur={`${duration}s`}
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.2;1"
              dur={`${duration * 1.5}s`}
              additive="sum"
              repeatCount="indefinite"
              begin={`${delay}s`}
            />
          </path>
        </g>
      );
    })}
  </svg>
);

export default StaticStarsSVG;