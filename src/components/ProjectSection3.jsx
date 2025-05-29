import React from 'react';
import '../styles/ProjectSection3.css';

const ProjectSection3 = () => {
  return (
    <section className="social-media-section">
      <div className="social-container">
        {/* Left Panel - System Architecture */}
        <div className="system-panel">
          <div className="system-header">
            <h3>SYSTEM ARCHITECTURE</h3>
            <div className="system-indicator active"></div>
          </div>
          
          <div className="architecture-section">
            <h4>BACKEND STACK</h4>
            <div className="tech-stack">
              <div className="tech-item">
                <span className="tech-label">RUNTIME</span>
                <span className="tech-value">Python 3.9+</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">FRAMEWORK</span>
                <span className="tech-value">React + Vite</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">DATABASE</span>
                <span className="tech-value">Firebase</span>
              </div>
              <div className="tech-item">
                <span className="tech-label">WEBSOCKETS</span>
                <span className="tech-value">Firebase Auth</span>
              </div>
            </div>
          </div>

          <div className="architecture-section">
            <h4>AI INTEGRATION</h4>
            <div className="ai-metrics">
              <div className="ai-item">
                <span className="ai-label">MODEL</span>
                <div className="ai-bar">
                  <div className="ai-fill openai"></div>
                </div>
                <span className="ai-status">GPT-4</span>
              </div>
              <div className="ai-item">
                <span className="ai-label">RESPONSE</span>
                <div className="ai-bar">
                  <div className="ai-fill response"></div>
                </div>
                <span className="ai-status"> 2s</span>
              </div>
              <div className="ai-item">
                <span className="ai-label">CONTEXT</span>
                <div className="ai-bar">
                  <div className="ai-fill context"></div>
                </div>
                <span className="ai-status">8K tokens</span>
              </div>
            </div>
          </div>

          <div className="architecture-section">
            <h4>FEATURES</h4>
            <div className="feature-list">
              <div className="feature-item active">
                <span className="feature-icon">●</span>
                <span className="feature-name">Real-time Messaging</span>
              </div>
              <div className="feature-item active">
                <span className="feature-icon">●</span>
                <span className="feature-name">AI Chatbot Assistant</span>
              </div>
              <div className="feature-item active">
                <span className="feature-icon">●</span>
                <span className="feature-name">User Authentication</span>
              </div>
              <div className="feature-item active">
                <span className="feature-icon">●</span>
                <span className="feature-name">Media Sharing</span>
              </div>
            </div>
          </div>

          <div className="system-status">
            <span>API Status:</span>
            <span className="status-active">CONNECTED</span>
          </div>
        </div>

        {/* Center - Interface Preview */}
        <div className="interface-preview">
          <div className="browser-window">
            <div className="browser-header">
              <div className="browser-controls">
                <span className="browser-dot close"></span>
                <span className="browser-dot minimize"></span>
                <span className="browser-dot maximize"></span>
              </div>
              <div className="browser-url">
                <span>localhost:3000/harmoniq</span>
              </div>
            </div>
            
            <div className="interface-content">
              <div className="chat-interface">
                <div className="chat-sidebar">
                  <div className="user-profile">
                    <div className="profile-avatar"></div>
                    <span className="profile-name">Ray Xue</span>
                    <span className="profile-status">● Online</span>
                  </div>
                  <div className="chat-list">
                    <div className="chat-item active">
                      <div className="chat-avatar ai"></div>
                      <div className="chat-info">
                        <span className="chat-name">AI Assistant</span>
                        <span className="chat-preview">How can I help you today?</span>
                      </div>
                    </div>
                    <div className="chat-item">
                      <div className="chat-avatar"></div>
                      <div className="chat-info">
                        <span className="chat-name">Yan Xue</span>
                        <span className="chat-preview">Wow, I love your music taste!</span>
                      </div>
                    </div>
                    <div className="chat-item">
                      <div className="chat-avatar"></div>
                      <div className="chat-info">
                        <span className="chat-name">Angela Chen</span>
                        <span className="chat-preview">Wow, Im a big fan of her music too.</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="chat-main">
                  <div className="chat-header">
                    <h4>AI Assistant</h4>
                    <span className="chat-subtitle">Powered by OpenAI</span>
                  </div>
                  <div className="chat-messages">
                    <div className="message user">
                      <span className="message-text">Hey, what are the most popular genres right now?</span>
                    </div>
                    <div className="message ai">
                      <span className="message-text">🔥 Top Music Genres of 2025: Hip-Hop/Rap, Latin Music (Reggaeton & Cumbia), Afrobeats & Amapiano. </span>
                    </div>
                    <div className="message user">
                      <span className="message-text">Great,Thanks!</span>
                    </div>
                    <div className="message ai typing">
                      <span className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </div>
                  </div>
                  <div className="chat-input">
                    <input type="text" placeholder="Type your message..." />
                    <button className="send-button">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Project Info */}
        <div className="project-details">
          <h1 className="project-main-title">HARMONI</h1>
          <h2 className="project-main-subtitle">MUSIC SOCIAL PLATFORM</h2>
          
          <p className="project-main-description">
            NEXT-GENERATION SOCIAL MEDIA PLATFORM INTEGRATING REAL-TIME COMMUNICATION 
            WITH INTELLIGENT AI INTEGRATION. BUILT WITH PYTHON BACKEND, 
            JAVASCRIPT FRONTEND, AND OPENAI API FOR SEAMLESS USER INTERACTIONS.
          </p>
          
          <div className="tech-highlights">
            <div className="highlight-item">
              <span className="highlight-label">STACK</span>
              <span className="highlight-value">Python + JS + OpenAI</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">TYPE</span>
              <span className="highlight-value">Full-Stack Application</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-label">STATUS</span>
              <span className="highlight-value">Launch Ready</span>
            </div>
          </div>
          
          <div className="project-actions">
            <a
                href="https://github.com/yanxue06/HarmoniQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="action-primary">View Code</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection3;