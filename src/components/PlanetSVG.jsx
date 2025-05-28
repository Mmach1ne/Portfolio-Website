import React, { useEffect } from 'react';
import '../styles/PlanetSVG.css';

const PlanetSVG = () => {
  useEffect(() => {
    const smallStars = 25;
    const largeStars = 5;
    const container = document.getElementById('bg');

    const randomVal = (max, min) =>
      Math.floor(Math.max(Math.random() * max, min));

    for (let i = 0; i < smallStars; i++) {
      const star = document.createElement('div');
      star.className = 'small-star';
      star.style.height = `${randomVal(2, 1)}px`;
      star.style.width = `${randomVal(2, 1)}px`;
      star.style.top = `${randomVal(100, 5)}vh`;
      star.style.left = `${randomVal(100, 5)}vw`;
      star.style.opacity = `${randomVal(0.2, 1)}`;
      container.appendChild(star);
    }

    for (let i = 0; i < largeStars; i++) {
      const star = document.createElement('div');
      star.className = 'large-star';
      star.style.height = `${randomVal(5, 4)}px`;
      star.style.width = `${randomVal(5, 4)}px`;
      star.style.top = `${randomVal(80, 5)}vh`;
      star.style.left = `${randomVal(80, 5)}vw`;
      container.appendChild(star);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="earth">
        <div className="earth__shadow-container">
          <div className="earth__shadow"></div>
        </div>
        <div className="clouds">
          <div className="clouds__group-1"></div>
          <div className="clouds__group-2"></div>
        </div>
        <div className="trees">
          <div className="trees__group-1"></div>
          <div className="trees__group-2"></div>
        </div>
      </div>
      <div className="earth-aura"></div>
      <div className="bg" id="bg"></div>
    </div>
  );
};

export default PlanetSVG;