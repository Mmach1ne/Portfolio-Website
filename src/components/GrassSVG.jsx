import React, { useState } from 'react';

const GrassSVG = React.memo(() => {
  const [blades] = useState(() => 
    Array.from({ length: 200 }).map(() => ({
      x: Math.random() * 1000,
      height: 30 + Math.random() * 40,
      curve: Math.random() * 10 - 5,
      type: Math.floor(Math.random() * 3)
    }))
  );

  const grassTypes = [
    // Type 0 - Simple blade
    (x, height, curve) => 
      `M${x},100 q${curve},-${height} ${10},0`,
    // Type 1 - Curved blade
    (x, height, curve) => 
      `M${x},100 c${curve},-${height*0.3} ${5+curve},-${height*0.7} ${10},-${height}`,
    // Type 2 - Split blade
    (x, height, curve) => 
      `M${x},100 q${curve},-${height} ${5},-${height*0.8} q${-curve},-${height*0.2} ${5},0`
  ];

  return (
    <svg className="grass" viewBox="0 0 1000 100">
      <linearGradient id="grassGradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="#1a3b2a" />
        <stop offset="100%" stop-color="#0a2b1a" />
      </linearGradient>
      
      <rect x="0" y="0" width="1000" height="100" fill="url(#grassGradient)" />
      
      {blades.map((blade, i) => (
        <path
          key={i}
          d={grassTypes[blade.type](blade.x, blade.height, blade.curve)}
          stroke="#4a6b5a"
          strokeWidth={1 + Math.random()}
          fill="none"
          opacity={0.5 + Math.random() * 0.3}
        />
      ))}
    </svg>
  );
});

export default GrassSVG;