import React from 'react';

const StarsSVG = () => {
  const generateStarPath = (size) => {
    return `M${size} 0L${size*0.38} ${size*0.38}L0 ${size*0.38}L${size*0.38} ${size*0.62}L${size*0.16} ${size}L${size*0.5} ${size*0.78}L${size*0.84} ${size}L${size*0.62} ${size*0.62}L${size} ${size*0.38}L${size*0.62} ${size*0.38}Z`;
  };
  const generateShootingStars = () => {
    return Array.from({ length: 3 }).map((_, index) => {
      const viewportWidth = 1000;
      const viewportHeight = 1000;
      const edge = Math.random() < 0.7 ? 'top' : 
                  Math.random() < 0.5 ? 'left' : 'right';
      
      let startX, startY, endX, endY;
      const pathLength = 800 + Math.random() * 400;

      switch(edge) {
        case 'top':
          startX = Math.random() * viewportWidth;
          startY = -50;
          endX = startX + (Math.random() - 0.5) * 400;
          endY = viewportHeight + 100;
          break;
        case 'left':
          startX = -50;
          startY = Math.random() * viewportHeight/2;
          endX = viewportWidth/2 + Math.random() * 300;
          endY = viewportHeight + 100;
          break;
        case 'right':
          startX = viewportWidth + 50;
          startY = Math.random() * viewportHeight/2;
          endX = viewportWidth/2 - Math.random() * 300;
          endY = viewportHeight + 100;
          break;
      }

      const duration = 10 + Math.random() * 4; // 4-6 seconds
      const delay = 5 + Math.random() * 25; // 5-30 second delay between appearances

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
            to={`M${endX},${endY} L${endX + (endX - startX)*0.1},${endY + (endY - startY)*0.1}`}
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
    <svg className="stars" viewBox="0 0 1000 1000" preserveAspectRatio="none">
      <defs>
        <linearGradient id="cometGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
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
        const y = Math.random() * 800;
        const size = 1 + Math.random() * 3;
        const rotate = Math.random() * 360;
        const duration = 1 + Math.random() * 3;
        const delay = Math.random() * 5;

        return (
          <g 
            key={index} 
            transform={`translate(${x},${y}) rotate(${rotate})`}
            filter="url(#twinkle)"
          >
            <path
              d={generateStarPath(size)}
              fill="#ffffff"
              opacity="0.8"
            >
              {/* Opacity Animation */}
              <animate
                attributeName="opacity"
                values="0.3;1;0.3"
                dur={`${duration}s`}
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
              
              {/* Scale Animation */}
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
      {generateShootingStars()}
    </svg>
  );
};

export default StarsSVG;