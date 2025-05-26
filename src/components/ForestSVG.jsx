import React, { useState } from 'react';

const ForestSVG = React.memo(({ side }) => {
  const [trees] = useState(() => {
    const treePositions = [];
    for(let i = 0; i < 5; i++) {
      treePositions.push({
        x: side === 'left' ? 40 + i * 35 : 160 - i * 35,
        height: 250 + Math.random() * 150,
        y: 900 - i * 60,
        variation: Math.floor(Math.random() * 3)
      });
    }
    return treePositions;
  });

  const treeVariations = [
    // Variation 0
    <>
      <path d="M-25 0 L0 -80 L25 0 L15 30 L-15 30 Z" fill="#1a3b2a" />
      <path d="M-20 -40 L0 -120 L20 -40 L15 -10 L-15 -10 Z" fill="#2a4b3a" />
    </>,
    // Variation 1
    <>
      <path d="M-30 0 Q0 -100 30 0 T0 40 Z" fill="#183728" />
      <circle cx="0" cy="-60" r="25" fill="#2a5a4a" />
    </>,
    // Variation 2
    <>
      <polygon points="-25,0 0,-90 25,0 15,40 -15,40" fill="#1a4b3a" />
      <ellipse cx="0" cy="-50" rx="20" ry="30" fill="#2a6b5a" />
    </>
  ];

  return (
    <svg className={`forest-${side}`} viewBox="0 0 200 1000">
      {trees.map((tree, i) => (
        <g key={i} transform={`translate(${tree.x},${tree.y}) scale(0.8)`}>
          {/* Tree trunk */}
          <path 
            d="M-5 0 Q0 -20 5 0 V100" 
            fill="#3a2e2e" 
            stroke="#2a1e1e" 
            strokeWidth="2"
          />
          
          {/* Foliage */}
          <g transform={`scale(1 ${tree.height/300})`}>
            {treeVariations[tree.variation]}
          </g>
          
          {/* Highlights */}
          <path 
            d="M-5 -50 Q0 -60 5 -50" 
            fill="#ffffff" 
            opacity="0.1" 
            transform="scale(1 0.8)"
          />
        </g>
      ))}
    </svg>
  );
});

export default ForestSVG;