import React, { useEffect } from 'react';
import '../styles/Planet3.css';

const Planet3 = () => {
  useEffect(() => {
    const smallStars = 25;
    const largeStars = 6;
    const container = document.getElementById('bg');

    const randomVal = (max, min) =>
      Math.floor(Math.max(Math.random() * max, min));

    // Clear any existing stars (useful if component re-renders)
    const existingStars = container.querySelectorAll('.small-star, .large-star');
    existingStars.forEach(star => star.remove());

    // Create small stars
    for (let i = 0; i < smallStars; i++) {
      const star = document.createElement('div');
      star.className = 'small-star';
      star.style.height = `${randomVal(2, 1)}px`;
      star.style.width = `${randomVal(2, 1)}px`;
      star.style.top = `${randomVal(100, 5)}vh`;
      star.style.left = `${randomVal(100, 5)}vw`;
      star.style.opacity = `${randomVal(0.3, 1)}`;
      star.style.animationDelay = `${randomVal(4, 0)}s`;
      container.appendChild(star);
    }

    // Create large stars
    for (let i = 0; i < largeStars; i++) {
      const star = document.createElement('div');
      star.className = 'large-star';
      star.style.height = `${randomVal(5, 3)}px`;
      star.style.width = `${randomVal(5, 3)}px`;
      star.style.top = `${randomVal(90, 5)}vh`;
      star.style.left = `${randomVal(90, 5)}vw`;
      star.style.animationDelay = `${randomVal(4, 0)}s`;
      container.appendChild(star);
    }

    // Cleanup function to remove stars when component unmounts
    return () => {
      const stars = container.querySelectorAll('.small-star, .large-star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="jupiter">
        <div className="jupiter__shadow-container">
          <div className="jupiter__shadow"></div>
        </div>
        <div className="bands">
          <div className="bands__group-1"></div>
          <div className="bands__group-2"></div>
          <div className="bands__group-3"></div>
        </div>
        <div className="swirls">
          <div className="swirls__group-1"></div>
          <div className="swirls__group-2"></div>
        </div>
        <div className="red-spot"></div>
      </div>
      <div className="jupiter-aura"></div>
      <div className="bg" id="bg"></div>
    </div>
  );
};

export default Planet3;