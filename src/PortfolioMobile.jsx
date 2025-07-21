import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './PortfolioMobile.css';

const PortfolioMobile = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollIcon, setShowScrollIcon] = useState(true);

  // ──────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ──────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    /*
     * Hide the scroll‑icon once the contact section has entered the viewport.
     * We recalc on every scroll to keep behaviour snappy but tear the listener
     * down on unmount so we don’t leak.
     */
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      if (!contactEl) return;

      const { top } = contactEl.getBoundingClientRect();
      const reachedContact = top <= window.innerHeight * 0.75; // 75 % viewport
      setShowScrollIcon(!reachedContact);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIconClick = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ──────────────────────────────────────────────────────────────────────────────
  // Data
  // ──────────────────────────────────────────────────────────────────────────────
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
    { file: 'git.png', label: 'Git' }
  ];

  const projects = [
    {
      id: 1,
      title: 'STM32 COMMS',
      subtitle: 'Dual Channel Communication System',
      description: 'Advanced embedded system built with STM32F407VGT6 microcontroller.',
      tech: 'C / Embedded / UART',
      github: 'https://github.com/Mmach1ne/ECE-198-RJD',
      demo: '/STM32Comms.pdf'
    },
    {
      id: 2,
      title: 'CLOTHING ML',
      subtitle: 'Categorization Neural Network',
      description: 'Deep learning model with PyTorch achieving 94% accuracy.',
      tech: 'Python / PyTorch / CNN',
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'HARMONI',
      subtitle: 'Music Social Platform',
      description: 'Real‑time social platform with AI integration.',
      tech: 'Python / React / OpenAI',
      github: 'https://github.com/yanxue06/HarmoniQ',
      demo: '#'
    },
    {
      id: 4,
      title: 'THERMAL DYNAMICS',
      subtitle: 'Heatsink Research Paper',
      description: 'Comprehensive research on heat dissipation mechanisms.',
      tech: 'Research / CFD / SimScale',
      github: '#',
      demo: '/ThermalDynamic.pdf'
    },
    {
      id: 5,
      title: 'RAYBOT',
      subtitle: 'Intelligent Conversational Agent',
      description: 'Python‑based chatbot with modular skills system.',
      tech: 'Python / SQLite / AI',
      github: 'https://github.com/Mmach1ne/LLM-Agent.git',
      demo: 'https://effervescent-haupia-013614.netlify.app'
    },
    {
      id: 6,
      title: 'TRANSIT TRACKER',
      subtitle: 'Real‑Time Bus Monitoring',
      description: 'IoT system with AWS integration for transit tracking.',
      tech: 'AWS / IoT / Next.js',
      github: 'https://github.com/Mmach1ne/UWTransportGPS.git',
      demo: '#'
    }
  ];

  // ──────────────────────────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────────────────────────
  return (
    <div className="mobile-portfolio">
      {/* Mobile Navigation */}
      <nav className="mobile-nav-bar">
        <div className="nav-logo">RAY XUE</div>
        <div className="nav-links">
          <a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">Hi, I'm Ray</h1>
          <p className="hero-subtitle">Full Stack Developer</p>
          <p className="hero-subtitle">(Try desktop for the full experience!)</p>
          <a href="#about" className="cta-button">Learn More</a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="about-container">
            <img src="/Logos/PFP.jpeg" alt="Ray Xue" className="profile-image" />
            <p className="about-text">
                Curiosity killed the cat. But as an aspiring engineer, 
                curiosity is the trait I value most.
                Being an engineer is being driven to seek and solve
                real-world problems—and I'm just getting started.
            </p>
          </div>

          <div className="skills-grid">
            {logos.map((logo) => (
              <motion.div
                key={logo.label}
                className="skill-card"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={`/Logos/${logo.file}`} alt={logo.label} />
                <span>{logo.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <div className="projects-container">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-subtitle">{project.subtitle}</h4>
                <p className="project-description">{project.description}</p>
                <p className="project-tech">{project.tech}</p>
                <div className="project-links">
                  {project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo !== '#' && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link demo"
                    >
                      {project.demo.endsWith('.pdf') ? 'Read Paper' : 'Live Demo'}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <motion.div
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-description">
            Have a question or looking for a full‑stack developer? Feel free to
            reach out!
          </p>

          <div className="contact-form">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
            <textarea
              placeholder="Message"
              rows="5"
              className="form-textarea"
            ></textarea>
            <button className="submit-button">Send Message</button>
          </div>

          <div className="social-links">
            {/* GitHub */}
            <a href="https://github.com/Mmach1ne" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/ray-xue-uw" target="_blank" rel="noopener noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
            {/* Email */}
            <a href="mailto:r29xue@uwaterloo.ca">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" />
              </svg>
            </a>
          </div>

          <p className="footer-text">Ray Xue ©2025</p>
        </motion.div>
      </section>

      {/* Animated scroll‑down icon */}
      {showScrollIcon && (
        <motion.div
          className="scroll-icon"
          onClick={handleIconClick}
          /* Simple up‑down y animation */
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          {/* SVG chevron‑down */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioMobile;
