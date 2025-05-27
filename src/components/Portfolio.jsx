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
        <h1 className="title">Ray's Portfolio</h1>
        <p className="subtitle">Scroll down to see more</p>
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
        {/* Hide/show "About Me" until scrolled or view-more clicked */}
        <motion.h2
          className="about-section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          About Me
        </motion.h2>

        <div className="about-content-section">
          <div className="about-left">
            <div className="about-icon">
              <img src="https://placehold.co/150x150" alt="Icon Placeholder" />
            </div>
            <div className="about-text-box">
              <p>
                Curiosity killed the cat. But as an aspiring engineer and current
                student at the University of Waterloo, it is the trait I
                value most. To me, being an engineer means having the drive to seek
                and solve real-world problems—and I’m just getting started.
              </p>
            </div>
          </div>

          <div className="about-right">
            <div className="logo-grid">
              {/* Column 1 (3 logos) */}
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>

              {/* Column 2 (4 logos) */}
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item"><img src="https://placehold.co/100x100" alt="Logo" /></div>
              <div className="logo-item" style={{ gridColumn: 2 }}><img src="https://placehold.co/100x100" alt="Logo" /></div>

              {/* Column 3 (3 logos) */}
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
