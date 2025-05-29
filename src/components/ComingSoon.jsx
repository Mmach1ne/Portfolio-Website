import React from 'react';
import '../styles/ComingSoon.css';
import CanvasBackground from './CanvasBackground';
import StaticStarsSVG from './StaticStarsSVG';
import ShootingStarsSVG from './ShootingStarsSVG';

const ComingSoon = () => (
  <div className="coming-soon-container">
    <CanvasBackground />
    <ShootingStarsSVG />
    <StaticStarsSVG />
    <div className="coming-soon-message">
      Not yet available, coming soon!
    </div>
  </div>
);

export default ComingSoon;