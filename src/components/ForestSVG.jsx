import React, { useState, useMemo } from 'react';
import '../styles/Forest.css';

const ForestSVG = React.memo(({ side }) => {
  const [trees] = useState(() => {
    const treePositions = [];
    for(let i = 0; i < 7; i++) {
      treePositions.push({
        x: 25 + i * 22,
        scale: 0.7 + Math.random() * 0.5,
        y: 950 - i * 40 - Math.random() * 20,
        rotation: Math.random() * 6 - 3,
        glowIntensity: 0.3 + Math.random() * 0.4,
        swayDuration: 8 + Math.random() * 4,
        swayDelay: Math.random() * 2
      });
    }
    return treePositions;
  });

  const fireflies = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 160,
      y: 700 + Math.random() * 200,
      duration: 10 + Math.random() * 5,
      delay: Math.random() * 5,
      path: {
        x1: Math.random() * 40 - 20,
        y1: Math.random() * -40,
        x2: Math.random() * 40 - 20,
        y2: Math.random() * -40,
        x3: Math.random() * 40 - 20,
        y3: Math.random() * -40,
        x4: Math.random() * 40 - 20,
        y4: Math.random() * -40
      }
    }));
  }, []);

  return (
    <div className={`forest-container forest-${side}`}>
      <svg viewBox="0 0 200 1000" width="200" height="1000">
        <defs>
          {/* Enhanced gradients */}
          <linearGradient id={`treeGradient-${side}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="30%" stopColor="#047857" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          
          <radialGradient id={`treeGlow-${side}`} cx="50%" cy="30%">
            <stop offset="0%" stopColor="#86efac" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#4ade80" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={`trunkGradient-${side}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#16213e" />
            <stop offset="100%" stopColor="#0f3460" />
          </linearGradient>

          {/* Mist gradient */}
          <linearGradient id={`mistGradient-${side}`} x1="0%" x2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#86efac" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>

          {/* Light ray gradient */}
          <linearGradient id={`lightRay-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>

          {/* Blur filters */}
          <filter id="treeBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>

          <filter id="glowFilter">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background mist layers */}
        <rect 
          className="forest-mist"
          x="-100" 
          y="600" 
          width="400" 
          height="400" 
          fill={`url(#mistGradient-${side})`}
        />

        {/* Light rays */}
        {[0, 60, 120].map((x, i) => (
          <rect
            key={`ray-${i}`}
            className="light-ray"
            x={x}
            y="0"
            width="20"
            height="1000"
            fill={`url(#lightRay-${side})`}
            style={{ '--ray-delay': `${i * 0.5}s` }}
            transform={`rotate(${5 - i * 2})`}
          />
        ))}

        {/* Tree shadows */}
        {trees.map((tree, i) => (
          <g 
            key={`shadow-${i}`}
            className="tree-shadow"
            transform={`translate(${tree.x},${tree.y}) scale(${tree.scale})`}
          >
            <ellipse
              cx="0"
              cy="0"
              rx="40"
              ry="15"
              fill="#000000"
            />
          </g>
        ))}

        {/* Background glow */}
        {trees.map((tree, i) => (
          <ellipse
            key={`glow-${i}`}
            className="tree-glow"
            cx={tree.x}
            cy={tree.y - 100 * tree.scale}
            rx={80 * tree.scale}
            ry={120 * tree.scale}
            fill={`url(#treeGlow-${side})`}
            style={{
              '--glow-intensity': tree.glowIntensity,
              '--glow-delay': `${tree.swayDelay}s`
            }}
          />
        ))}

        {/* Trees */}
        {trees.map((tree, i) => (
          <g 
            key={`tree-${i}`}
            className="tree-group"
            transform={`translate(${tree.x},${tree.y}) scale(${tree.scale}) rotate(${tree.rotation})`}
            style={{
              '--sway-duration': `${tree.swayDuration}s`,
              '--sway-delay': `${tree.swayDelay}s`
            }}
          >
            {/* Enhanced trunk */}
            <path 
              d="M-5 0 C-5 -15, -4 -25, -3 -35 L3 -35 C4 -25, 5 -15, 5 0 Z" 
              fill={`url(#trunkGradient-${side})`}
              opacity="0.9"
            />
            
            {/* Tree layers with more detail */}
            <g filter="url(#glowFilter)">
              {/* Bottom layer */}
              <path
                d="M0 -35 
                   C-35 -35, -50 -15, -40 5
                   C-30 0, -20 -5, -10 -5
                   L-5 0 L5 0 L10 -5
                   C20 -5, 30 0, 40 5
                   C50 -15, 35 -35, 0 -35 Z"
                fill={`url(#treeGradient-${side})`}
                transform="translate(0, -20) scale(1, 2.8)"
              />
              
              {/* Middle layer */}
              <path
                d="M0 -70 
                   C-30 -70, -40 -55, -32 -40
                   C-24 -45, -15 -50, -5 -50
                   L0 -45 L0 -45
                   L5 -50
                   C15 -50, 24 -45, 32 -40
                   C40 -55, 30 -70, 0 -70 Z"
                fill={`url(#treeGradient-${side})`}
                opacity="0.95"
                transform="scale(0.85, 2)"
              />
              
              {/* Top layer */}
              <path
                d="M0 -120 
                   C-25 -120, -33 -108, -27 -96
                   C-20 -100, -10 -104, 0 -104
                   C10 -104, 20 -100, 27 -96
                   C33 -108, 25 -120, 0 -120 Z"
                fill={`url(#treeGradient-${side})`}
                opacity="0.9"
                transform="scale(0.7, 1.8)"
              />
            </g>

            {/* Magical particles around tree */}
            {[...Array(4)].map((_, j) => (
              <circle
                key={`particle-${j}`}
                className="magic-particle"
                cx={-30 + j * 20}
                cy={-60 - j * 25}
                r="2"
                fill="#86efac"
                filter="url(#glowFilter)"
                style={{
                  '--particle-duration': `${4 + j}s`,
                  '--particle-delay': `${j * 0.7}s`
                }}
              />
            ))}
          </g>
        ))}

        {/* Fireflies */}
        {fireflies.map((firefly) => (
          <circle
            key={`firefly-${firefly.id}`}
            className="firefly"
            cx={firefly.x}
            cy={firefly.y}
            r="1.5"
            fill="#fef08a"
            filter="url(#glowFilter)"
            style={{
              '--firefly-duration': `${firefly.duration}s`,
              '--firefly-delay': `${firefly.delay}s`,
              '--firefly-x1': `${firefly.path.x1}px`,
              '--firefly-y1': `${firefly.path.y1}px`,
              '--firefly-x2': `${firefly.path.x2}px`,
              '--firefly-y2': `${firefly.path.y2}px`,
              '--firefly-x3': `${firefly.path.x3}px`,
              '--firefly-y3': `${firefly.path.y3}px`,
              '--firefly-x4': `${firefly.path.x4}px`,
              '--firefly-y4': `${firefly.path.y4}px`
            }}
          />
        ))}
      </svg>
    </div>
  );
});

export default ForestSVG;