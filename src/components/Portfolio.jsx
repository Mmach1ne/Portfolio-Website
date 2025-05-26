import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CanvasBackground from './CanvasBackground';
import StarsSVG from './StarsSVG';
import ForestSVG from './ForestSVG';

const Portfolio = () => {
  const cursorReference = useRef(null);
  const { scrollY } = useScroll();

  const fogOpacity = useTransform(scrollY, [0, 500], [0.8, 0]);
  const forestLeftY = useTransform(scrollY, [0, 1000], [0, -150]);
  const forestRightY = useTransform(scrollY, [0, 1000], [0, -150]);

  
  const cursorY = useTransform(scrollY, [0, 1000], [0, 500]);

useEffect(() => {
  const updateCursorPosition = (e) => {
    const cursor = cursorReference.current;
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  };
  window.addEventListener('mousemove', updateCursorPosition);
  return () => window.removeEventListener('mousemove', updateCursorPosition);
}, []);

  const projectPlaceholders = [
    { id: 1, title: 'Project 1', image: 'https://placehold.co/400x300' },
    { id: 2, title: 'Project 2', image: 'https://placehold.co/400x300' },
    { id: 3, title: 'Project 3', image: 'https://placehold.co/400x300' },
    { id: 4, title: 'Project 4', image: 'https://placehold.co/400x300' },
  ];

  return (
    <div className="portfolio-container">
      <CanvasBackground />
      <StarsSVG />
      <motion.div style={{ y: forestLeftY }}>
        <ForestSVG side="left" />
      </motion.div>
      <motion.div style={{ y: forestRightY }}>
        <ForestSVG side="right" />
      </motion.div>
      <motion.div className="fog-layer" style={{ opacity: fogOpacity }} />
      <div
        className="custom-cursor"
        ref={cursorReference}
        style={{ y: cursorY }} here for scroll-based movement
      />
      <div className="title-section">
        <h1 className="title">Ray's Portfolio</h1>
        <p className="subtitle">Scroll down to see more</p>
      </div>
      <motion.div
        className="content-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        {projectPlaceholders.map((projectItem) => (
          <div key={projectItem.id} className="placeholder-card">
            <img src={projectItem.image} alt={projectItem.title} />
            <h3>{projectItem.title}</h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Portfolio;