import React from 'react';
import '../styles/ComingSoon.css';
import StaticStarsSVG from './StaticStarsSVG';
import ShootingStarsSVG from './ShootingStarsSVG';

const ComingSoon = () => (
  <div className="coming-soon-container">
    <ShootingStarsSVG />
    <StaticStarsSVG />
    <div className="coming-soon-message">
      Not yet available, coming soon!
    </div>
  </div>
);

export default ComingSoon;