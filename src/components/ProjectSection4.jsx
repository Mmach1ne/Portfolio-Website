import React from 'react';
import '../styles/ProjectSection4.css';

const ProjectSection4 = () => {
    
  return (
    <section className="heatsink-section">
      <div className="heatsink-container">
        {/* Left Panel - Project Info */}
        <div className="research-details">
          <h1 className="research-main-title">THERMAL DYNAMICS</h1>
          <h2 className="research-main-subtitle">HEATSINK DISSIPATION STUDY</h2>
          
          <p className="research-main-description">
            COMPREHENSIVE RESEARCH PAPER ANALYZING HEAT DISSIPATION MECHANISMS 
            IN MODERN HEATSINK DESIGNS. COMPUTATIONAL FLUID DYNAMICS SIMULATIONS 
            COUPLED WITH EXPERIMENTAL VALIDATION FOR OPTIMAL THERMAL PERFORMANCE.
          </p>
          
          <div className="research-highlights">
            <div className="research-highlight-item">
              <span className="research-highlight-label">TYPE</span>
              <span className="research-highlight-value">Research Paper</span>
            </div>
            <div className="research-highlight-item">
              <span className="research-highlight-label">PUBLISHED</span>
              <span className="research-highlight-value">January 2024</span>
            </div>
            <div className="research-highlight-item">
              <span className="research-highlight-label">PAGES</span>
              <span className="research-highlight-value">41 Pages</span>
            </div>
          </div>
          
          <div className="research-actions">
            <a href="/ThermalDynamic.pdf" download="ThermalDynamicPaper.pdf">
            <button className="research-action-primary">READ PAPER</button>
            </a>
          </div>
        </div>

        {/* Center - Document Preview */}
        <div className="document-preview">
          <div className="paper-window">
            <div className="paper-header">
              <div className="paper-controls">
                <span className="paper-dot close"></span>
                <span className="paper-dot minimize"></span>
                <span className="paper-dot maximize"></span>
              </div>
              <div className="paper-title">
                <span>thermal_dissipation_heatsinks_2024.pdf</span>
              </div>
            </div>
            
            <div className="paper-content">
              <div className="paper-page">
                <h3 className="paper-heading">Heat Dissipation Mechanisms in Modern Heatsink Designs: A Comprehensive Analysis</h3>
                <p className="paper-authors">Ray Xue</p>
                <p className="paper-institution">Department of Physics, Mulgrave Internation School</p>
                
                <div className="paper-abstract">
                  <h4>Abstract</h4>
                  <p>In this increasingly more technologically adept society, computing machines have become essential in everyday life. This paper seeks to provide an analytical overview of heatsink design...</p>
                </div>
                
                <div className="paper-sections">
                  <div className="section-item">
                    <span className="section-number">1.</span>
                    <span className="section-title">Introduction</span>
                  </div>
                  <div className="section-item">
                    <span className="section-number">2.</span>
                    <span className="section-title">Theoretical Background</span>
                  </div>
                  <div className="section-item">
                    <span className="section-number">3.</span>
                    <span className="section-title">Experimental Methodology</span>
                  </div>
                  <div className="section-item">
                    <span className="section-number">4.</span>
                    <span className="section-title">CFD Simulation Framework</span>
                  </div>
                  <div className="section-item active">
                    <span className="section-number">5.</span>
                    <span className="section-title">Results and Discussion</span>
                  </div>
                </div>
                
                <div className="paper-graph">
                  <div className="graph-title">Thermal Resistance vs. Air Velocity</div>
                  <div className="graph-content">
                    <div className="graph-bars">
                      <div className="bar" style={{height: '85%'}}><span>0.5 m/s</span></div>
                      <div className="bar" style={{height: '70%'}}><span>1.0 m/s</span></div>
                      <div className="bar" style={{height: '55%'}}><span>1.5 m/s</span></div>
                      <div className="bar" style={{height: '45%'}}><span>2.0 m/s</span></div>
                      <div className="bar" style={{height: '40%'}}><span>2.5 m/s</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Research Metrics */}
        <div className="metrics-panel">
          <div className="metrics-header">
            <h3>RESEARCH METRICS</h3>
            <div className="metrics-indicator active"></div>
          </div>
          
          <div className="metrics-section">
            <h4>METHODOLOGY</h4>
            <div className="method-stack">
              <div className="method-item">
                <span className="method-label">SIMULATION</span>
                <span className="method-value">SimScale</span>
              </div>
              <div className="method-item">
                <span className="method-label">MESH SIZE</span>
                <span className="method-value">7.6e-6m</span>
              </div>
              <div className="method-item">
                <span className="method-label">SOLVER</span>
                <span className="method-value">PBiCG</span>
              </div>
              <div className="method-item">
                <span className="method-label">VALIDATION</span>
                <span className="method-value">Experimental</span>
              </div>
            </div>
          </div>

          <div className="metrics-section">
            <h4>KEY FINDINGS</h4>
            <div className="findings-metrics">
              <div className="finding-item">
                <span className="finding-label">EFFICIENCY</span>
                <div className="finding-bar">
                  <div className="finding-fill efficiency"></div>
                </div>
                <span className="finding-status">+34%</span>
              </div>
              <div className="finding-item">
                <span className="finding-label">TEMP DROP</span>
                <div className="finding-bar">
                  <div className="finding-fill temp"></div>
                </div>
                <span className="finding-status">12.5°C</span>
              </div>
              <div className="finding-item">
                <span className="finding-label">FLOW RATE</span>
                <div className="finding-bar">
                  <div className="finding-fill flow"></div>
                </div>
                <span className="finding-status">2.1 m/s</span>
              </div>
            </div>
          </div>

          <div className="metrics-section">
            <h4>PARAMETERS</h4>
            <div className="parameter-list">
              <div className="parameter-item active">
                <span className="parameter-icon">●</span>
                <span className="parameter-name">Fin Geometry Optimization</span>
              </div>
              <div className="parameter-item active">
                <span className="parameter-icon">●</span>
                <span className="parameter-name">Material Conductivity</span>
              </div>
              <div className="parameter-item active">
                <span className="parameter-icon">●</span>
                <span className="parameter-name">Airflow Analysis</span>
              </div>
              <div className="parameter-item active">
                <span className="parameter-icon">●</span>
                <span className="parameter-name">Fluid Thermal Diffusion</span>
              </div>
            </div>
          </div>

          <div className="metrics-status">
            <span>Citations:</span>
            <span className="status-count">17</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection4;