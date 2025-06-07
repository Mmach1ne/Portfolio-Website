// Portfolio.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CanvasBackground from './CanvasBackground';
import StaticStarsSVG from './StaticStarsSVG';
import ShootingStarsSVG from './ShootingStarsSVG';
import ForestSVG from './ForestSVG';
import PlanetSVG from './PlanetSVG';
import PlanetWithRing from './Ring';
import ProjectSection from './ProjectSection';
import ProjectSection2 from './ProjectSection2';
import ProjectSection3 from './ProjectSection3';
import ProjectSection4 from './ProjectSection4';
import ContactSection from './ContactSection';
import Planet2 from './Planet2';
import Planet3 from './Planet3';

const Portfolio = () => {
  const cursorReference = useRef(null);
  const { scrollY } = useScroll();
  const projectsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // parallax effects
  const fogOpacity = useTransform(scrollY, [0, 500], [0.8, 0]);

  // Planet animations
  const planet1Opacity = useTransform(scrollY, [200, 600], [0, 1]);
  const planet1Y = useTransform(scrollY, [200, 600], [-100, 0]);
  const planet2Opacity = useTransform(scrollY, [800, 1200], [0, 1]);
  const planet2Y = useTransform(scrollY, [800, 1200], [-100, 0]);
  const planet3Opacity = useTransform(scrollY, [1600, 2000], [0, 1]);
  const planet3Y = useTransform(scrollY, [1600, 2000], [-100, 0]);
  const planet4Opacity = useTransform(scrollY, [2400, 2800], [0, 1]);
  const planet4Y = useTransform(scrollY, [2400, 2800], [-100, 0]);

  // custom cursor tracking
  useEffect(() => {
    const updateCursorPosition = (e) => {
      if (cursorReference.current) {
        cursorReference.current.style.left = `${e.clientX}px`;
        cursorReference.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  // smooth scroll
  const scrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // logo data
  const logos = [
    { file: 'HTML.png', label: 'HTML' },
    { file: 'Java.png', label: 'Java' },
    { file: 'CSS.png', label: 'CSS' },
    { file: 'React.png', label: 'React' },
    { file: 'JS.png', label: 'JS' },
    { file: 'TS.png', label: 'TS' },
    { file: 'C++.png', label: 'C++' },
    { file: 'C.png', label: 'C#' },
    { file: 'Python.png', label: 'Python' },
    { file: 'git.png', label: 'Git', style: { gridColumn: 2 } },
  ];

  return (
    <div className="portfolio-container">
      <CanvasBackground />
      <ShootingStarsSVG />
      <StaticStarsSVG />

      {/* Planets - moved to lower z-index container */}
      {!isMobile && (
        <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '6000px', // make it as tall as your content
              pointerEvents: 'none',
            }}>
          <motion.div style={{ 
            opacity: planet1Opacity, 
            y: planet1Y, 
            position: 'absolute', 
            top: '850px', 
            right: 'min(600px, 40vw)',
            transform: 'scale(min(1, calc(0.5 + 0.5 * (100vw - 768px) / 832)))'
          }}>
            <PlanetSVG />
          </motion.div>
          <motion.div style={{ 
            opacity: planet2Opacity, 
            y: planet2Y, 
            position: 'absolute', 
            top: '1700px', 
            left: 'min(1500px, 80vw)',
            transform: 'scale(min(1, calc(0.5 + 0.5 * (100vw - 768px) / 832)))'
          }}>
            <PlanetWithRing />
          </motion.div>
          <motion.div style={{ 
            opacity: planet3Opacity, 
            y: planet3Y, 
            position: 'absolute', 
            top: '2700px', 
            right: 'min(500px, 35vw)',
            transform: 'scale(min(1, calc(0.5 + 0.5 * (100vw - 768px) / 832)))'
          }}>
            <Planet2 />
          </motion.div>
          <motion.div style={{ 
            opacity: planet4Opacity, 
            y: planet4Y, 
            position: 'absolute', 
            top: '4600px', 
            right: 'max(-600px, -40vw)',
            transform: 'scale(min(1, calc(0.5 + 0.5 * (100vw - 768px) / 832)))'
          }}>
            <Planet3 />
          </motion.div>
        </div>
      )}

      <motion.div className="fog-layer" style={{ opacity: fogOpacity }} />
      <div className="custom-cursor" ref={cursorReference} />

      {/* Title */}
      <div className="title-section">
        <h1 className="title">Hi, I'm Ray</h1>
        <p className="subtitle">I'm a full stack developer.</p>
        <button className="view-more-btn" onClick={scrollToProjects}>
          View More
        </button>
      </div>

      {/* About */}
      <motion.div
        className="content-section"
        ref={projectsRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1 }}
      >
        <div className="about-content-section">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.3 }}
          >
            About Me
          </motion.h2>

          <div className="about-left">
            <div className="about-icon">
              {/* PFP.jpeg must live in public/Logos */}
              <img src="/Logos/PFP.jpeg" alt="Icon Placeholder" />
            </div>
            <div className="about-text-box">
              <p>
                Curiosity killed the cat. But as an aspiring engineer and current
                student at the University of Waterloo, it is the trait I value most.
                To me, being an engineer means having the drive to seek and solve
                real-world problems—and I'm just getting started.
              </p>
            </div>
          </div>

          <div className="about-right">
            <div className="logo-grid">
              {logos.map(({ file, label, style }, i) => (
                <div className="logo-item" key={i} style={style}>
                  {/* files in public/Logos are served at /Logos/... */}
                  <img src={`/Logos/${file}`} alt={label} />
                  <span className="logo-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Projects & Contact */}
      <ProjectSection />
      <ProjectSection2 />
      <ProjectSection3 />
      <ProjectSection4 />
      <ContactSection />
    </div>
  );
};

export default Portfolio;