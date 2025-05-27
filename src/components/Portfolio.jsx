// src/components/Portfolio.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CanvasBackground from './CanvasBackground';
import StaticStarsSVG from './StaticStarsSVG';
import ShootingStarsSVG from './ShootingStarsSVG';
import ForestSVG from './ForestSVG';
import '../styles/Portfolio.css';

const Portfolio = () => {
  const cursorReference = useRef(null);
  const { scrollY } = useScroll();
  const projectsRef = useRef(null);

  const fogOpacity = useTransform(scrollY, [0, 500], [0.8, 0]);
  const forestLeftY = useTransform(scrollY, [0, 1000], [0, -150]);
  const forestRightY = useTransform(scrollY, [0, 1000], [0, -150]);

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

  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      <CanvasBackground />
      <ShootingStarsSVG />
      <StaticStarsSVG />
      <motion.div style={{ y: forestLeftY }}><ForestSVG side="left" /></motion.div>
      <motion.div style={{ y: forestRightY }}><ForestSVG side="right" /></motion.div>
      <motion.div className="fog-layer" style={{ opacity: fogOpacity }} />
      <div className="custom-cursor" ref={cursorReference} />

      {/* Title Section */}
      <div className="title-section">
        <h1 className="title">Hello. I'm Ray.</h1>
        <p className="subtitle">I'm a full stack developer.</p>
        <button className="view-more-btn" onClick={scrollToProjects}>View More</button>
      </div>

      {/* About Section (replaces projects) */}
      <motion.div
        className="content-section"
        ref={projectsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <h2 className="about-section-title">About Me</h2>
        <div className="about-content-section">
          <div className="about-left">
            <div className="about-icon">
              <img src="https://placehold.co/150x150" alt="Icon Placeholder" />
            </div>
            <div className="about-text-box">
              <p>Curiosity killed the cat. But as an aspiring engineer and current student at the University of Waterloo, it is the trait I value most. To me, being an engineer means having the drive to seek and solve problems in the professional field or everyday life. This passion to create has inspired me to start new projects and consistently improve my skills, striving to contribute to the field of technology.</p>
            </div>
          </div>
          <div className="about-right">
            <div className="logo-grid">
              {/* Column 1 */}
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>

              {/* Column 2 (Middle column with 4 items) */}
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>

              {/* Column 3 */}
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio;