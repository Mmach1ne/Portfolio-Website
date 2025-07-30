// Portfolio.jsx - Fixed Version without Fireflies/Forest
import React, { useEffect, useRef, useState, lazy, Suspense, useMemo, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Import Navigation
import Navigation from './navigation';

// Lazy load heavy components
const PlanetSVG = lazy(() => import('./PlanetSVG'));
const PlanetWithRing = lazy(() => import('./Ring'));
const Planet2 = lazy(() => import('./Planet2'));
const Planet3 = lazy(() => import('./Planet3'));
const ProjectSection = lazy(() => import('./ProjectSection'));
const ProjectSection2 = lazy(() => import('./ProjectSection2'));
const ProjectSection3 = lazy(() => import('./ProjectSection3'));
const ProjectSection4 = lazy(() => import('./ProjectSection4'));
const ProjectSection5 = lazy(() => import('./ProjectSection5'));
const ProjectSection6 = lazy(() => import('./ProjectSection6'));
const ProjectSection7 = lazy(() => import('./ProjectSection7'));
const ContactSection = lazy(() => import('./ContactSection'));

// Import star components
import StaticStarsSVG from './StaticStarsSVG';
import ShootingStarsSVG from './ShootingStarsSVG';

const Portfolio = () => {
  const cursorRef = useRef(null);
  const { scrollY } = useScroll();
  const projectsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Check if mobile device - optimized to prevent re-renders
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Parallax transforms - declared at top level
  const fogOpacity = useTransform(scrollY, [0, 500], [0.8, 0]);
  
  // Planet animations with viewport-based positioning
  const planet1Opacity = useTransform(scrollY, [200, 600], [0, 1]);
  const planet1Y = useTransform(scrollY, [200, 600], [-100, 0]);
  const planet2Opacity = useTransform(scrollY, [800, 1200], [0, 1]);
  const planet2Y = useTransform(scrollY, [800, 1200], [-100, 0]);
  const planet3Opacity = useTransform(scrollY, [1600, 2000], [0, 1]);
  const planet3Y = useTransform(scrollY, [1600, 2000], [-100, 0]);
  const planet4Opacity = useTransform(scrollY, [2400, 2800], [0, 1]);
  const planet4Y = useTransform(scrollY, [2400, 2800], [-100, 0]);

  // Throttled cursor tracking
  useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    const updateCursorPosition = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.left = `${e.clientX}px`;
            cursorRef.current.style.top = `${e.clientY}px`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', updateCursorPosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, [isMobile]);

  const scrollToProjects = useCallback(() => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Logo data
  const logos = useMemo(() => [
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
  ], []);

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <Navigation />
      
      {/* Star backgrounds */}
      <ShootingStarsSVG />
      <StaticStarsSVG />

      {/* Planets with viewport-based positioning */}
      {!isMobile && (
        <Suspense fallback={null}>
          <div className="planets-container">
            <motion.div 
              style={{ 
                opacity: planet1Opacity, 
                y: planet1Y
              }}
              className="planet-wrapper planet-1"
            >
              <div className="planet-isolate">
                <PlanetSVG />
              </div>
            </motion.div>
            <motion.div 
              style={{ 
                opacity: planet2Opacity, 
                y: planet2Y
              }}
              className="planet-wrapper planet-2"
            >
              <div className="planet-isolate">
                <PlanetWithRing />
              </div>
            </motion.div>
            <motion.div 
              style={{ 
                opacity: planet3Opacity, 
                y: planet3Y
              }}
              className="planet-wrapper planet-3"
            >
              <div className="planet-isolate">
                <Planet2 />
              </div>
            </motion.div>
            <motion.div 
              style={{ 
                opacity: planet4Opacity, 
                y: planet4Y
              }}
              className="planet-wrapper planet-4"
            >
              <div className="planet-isolate">
                <Planet3 />
              </div>
            </motion.div>
          </div>
        </Suspense>
      )}

      <motion.div className="fog-layer" style={{ opacity: fogOpacity }} />
      {!isMobile && <div className="custom-cursor" ref={cursorRef} />}

      {/* Title Section */}
      <div className="title-section" id="home">
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
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
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
              <img 
                src="/Logos/PFP.jpeg" 
                alt="Profile" 
                loading="lazy"
                width="150"
                height="150"
              />
            </div>
            <div className="about-text-box">
              <p>
                Curiosity killed the cat. But as an aspiring engineer, curiosity is the trait I value most.
                Being an engineer is being driven to seek and solve
                real-world problems—and I'm just getting started.
              </p>
            </div>
          </div>

          <div className="about-right">
            <div className="logo-grid">
              {logos.map(({ file, label, style }, i) => (
                <div className="logo-item" key={label} style={style}>
                  <img 
                    src={`/Logos/${file}`} 
                    alt={label}
                    loading="lazy"
                    width="100"
                    height="100"
                  />
                  <span className="logo-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lazy loaded project sections with proper ordering */}
      <div className="sections-container" id="projects">
        <motion.div 
          data-section="projects1" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection />
          </Suspense>
        </motion.div>
        
        <motion.div 
          data-section="projects2" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection2 />
          </Suspense>
        </motion.div>
        
        <motion.div 
          data-section="projects3" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection3 />
          </Suspense>
        </motion.div>
        
        <motion.div 
          data-section="projects4" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection4 />
          </Suspense>
        </motion.div>
        
        <motion.div 
          data-section="projects5" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection5 />
          </Suspense>
        </motion.div>
          
        <motion.div 
          data-section="projects6" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection6 />
          </Suspense>
        </motion.div>

        <motion.div 
          data-section="projects7" 
          className="section-wrapper"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ProjectSection7 />
          </Suspense>
        </motion.div>

        <motion.div 
          data-section="contact" 
          className="section-wrapper" 
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense fallback={<div className="section-loader">Loading...</div>}>
            <ContactSection />
          </Suspense>
        </motion.div>
        


      </div>
    </div>
  );
};

export default Portfolio;