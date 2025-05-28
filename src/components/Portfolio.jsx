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

const Portfolio = () => {
  const cursorReference = useRef(null);
  const { scrollY } = useScroll();
  const projectsRef = useRef(null);
  const [showPlanet, setShowPlanet] = useState(false);

  // parallax effects
  const fogOpacity = useTransform(scrollY, [0, 500], [0.8, 0]);
  const forestLeftY = useTransform(scrollY, [0, 1000], [0, -150]);
  const forestRightY = useTransform(scrollY, [0, 1000], [0, -150]);

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

  // smooth scroll to about section AND trigger planet fade-in
  const scrollToProjects = () => {
    setShowPlanet(true);
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-container">
      <CanvasBackground />
      <ShootingStarsSVG />
      <StaticStarsSVG />

      {/* Planet fades in when "View More" is clicked */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={showPlanet ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', top: 850,right: 600}}
      >
        <PlanetSVG />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={showPlanet ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', top: 1700,left: 1500}}
      >
        <PlanetWithRing />
      </motion.div>

      <motion.div style={{ y: forestLeftY }}>
        <ForestSVG side="left" />
      </motion.div>
      <motion.div style={{ y: forestRightY }}>
        <ForestSVG side="right" />
      </motion.div>
      <motion.div className="fog-layer" style={{ opacity: fogOpacity }} />
      <div className="custom-cursor" ref={cursorReference} />

      {/* Title Section */}
      <div className="title-section">
        <h1 className="title">Hi, I'm Ray</h1>
        <p className="subtitle">I'm a full stack developer.</p>
        <button className="view-more-btn" onClick={scrollToProjects}>
          View More
        </button>
      </div>

      {/* About Section */}
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
              <img src="../src/assets/Logos/PFP.jpeg" alt="Icon Placeholder" />
            </div>
            <div className="about-text-box">
              <p>
                Curiosity killed the cat. But as an aspiring engineer and current
                student at the University of Waterloo, it is the trait I value most.
                To me, being an engineer means having the drive to seek and solve
                real-world problems—and I’m just getting started.
              </p>
            </div>
          </div>

          <div className="about-right">
            <div className="logo-grid">
              {[
                { src: 'HTML.png', label: 'HTML' },
                { src: 'java.png', label: 'Java' },
                { src: 'Css.png', label: 'CSS' },
                { src: 'React.png', label: 'React' },
                { src: 'JS.png', label: 'JS' },
                { src: 'TS.png', label: 'TS' },
                { src: 'C++.png', label: 'C++' },
                { src: 'C.png', label: 'C#' },
                { src: 'Python.png', label: 'Python' },
                { src: 'git.png', label: 'Git', style: { gridColumn: 2 } },
              ].map(({ src, label, style }, i) => (
                <div className="logo-item" key={i} style={style}>
                  <img src={`../src/assets/Logos/${src}`} alt={label} />
                  <span className="logo-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <ProjectSection/>
      <ProjectSection2/>
      <ProjectSection3/>
      <ProjectSection4/>
      <ContactSection/>
    </div>
  );
};

export default Portfolio;
