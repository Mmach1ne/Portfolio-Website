import React from 'react';
import '../styles/ProjectSection7.css';

const ProjectSection7 = () => {
  return (
    <section className="audio-logger-section">
      <div className="audio-container">
        {/* Left Panel - Technical Specs */}
        <div className="tech-specs-panel">
          <div className="specs-header">
            <h3>TECHNICAL ARCHITECTURE</h3>
            <div className="specs-indicator active"></div>
          </div>
          
          <div className="specs-section">
            <h4>AUDIO PIPELINE</h4>
            <div className="pipeline-stack">
              <div className="pipeline-item">
                <span className="pipeline-label">CAPTURE</span>
                <span className="pipeline-value">Windows Core Audio</span>
              </div>
              <div className="pipeline-item">
                <span className="pipeline-label">FORMAT</span>
                <span className="pipeline-value">16-bit PCM WAV</span>
              </div>
              <div className="pipeline-item">
                <span className="pipeline-label">SAMPLE RATE</span>
                <span className="pipeline-value">44.1 kHz</span>
              </div>
              <div className="pipeline-item">
                <span className="pipeline-label">BUFFER</span>
                <span className="pipeline-value">4096 samples</span>
              </div>
            </div>
          </div>

          <div className="specs-section">
            <h4>STT INTEGRATION</h4>
            <div className="stt-metrics">
              <div className="stt-item">
                <span className="stt-label">API</span>
                <div className="stt-bar">
                  <div className="stt-fill google"></div>
                </div>
                <span className="stt-status">Google STT</span>
              </div>
              <div className="stt-item">
                <span className="stt-label">ACCURACY</span>
                <div className="stt-bar">
                  <div className="stt-fill accuracy"></div>
                </div>
                <span className="stt-status">97%</span>
              </div>
              <div className="stt-item">
                <span className="stt-label">LATENCY</span>
                <div className="stt-bar">
                  <div className="stt-fill latency"></div>
                </div>
                <span className="stt-status"> 500ms</span>
              </div>
            </div>
          </div>

          <div className="specs-section">
            <h4>SYSTEM FEATURES</h4>
            <div className="feature-grid">
              <div className="feature-box active">
                <span className="feature-dot">●</span>
                <span className="feature-text">Real-time Transcription</span>
              </div>
              <div className="feature-box active">
                <span className="feature-dot">●</span>
                <span className="feature-text">Multi-source Capture</span>
              </div>
              <div className="feature-box active">
                <span className="feature-dot">●</span>
                <span className="feature-text">Gemini AI Analysis</span>
              </div>
              <div className="feature-box active">
                <span className="feature-dot">●</span>
                <span className="feature-text">Text-to-Speech Output</span>
              </div>
            </div>
          </div>

          <div className="connection-status">
            <span>Connection Status:</span>
            <span className="status-connected">ACTIVE</span>
          </div>
        </div>

        {/* Center - Dashboard Preview */}
        <div className="dashboard-preview">
          <div className="application-window">
            <div className="window-header">
              <div className="window-controls">
                <span className="control minimize"></span>
                <span className="control maximize"></span>
                <span className="control close"></span>
              </div>
              <div className="window-title">
                <span>Audio Transcription Dashboard</span>
              </div>
            </div>
            
            <div className="dashboard-content">
              <div className="status-bar">
                <span className="status-dot online"></span>
                <span className="status-text">Connected</span>
              </div>

              <div className="transcription-panel">
                <h3>Transcriptions</h3>
                <div className="transcription-display">
                  <div className="waveform-visualizer">
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                    <div className="waveform-bar"></div>
                  </div>
                  <div className="transcription-text">
                    <p className="transcript-line">
                      <span className="timestamp">[00:00:12]</span>
                      <span className="speaker">Speaker 1:</span>
                      "The audio capture system is now initialized and ready for processing..."
                    </p>
                    <div className="transcript-cursor"></div>
                  </div>
                </div>
              </div>

              <div className="selected-text-panel">
                <h4>Selected Text:</h4>
                <div className="text-selection">
                  <p>"The audio capture system is now initialized"</p>
                </div>
                <div className="action-buttons">
                  <button className="btn-analyze">Analyze with Gemini</button>
                  <button className="btn-tts">Text to Speech</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Project Info */}
        <div className="project-info-panel">
          <h1 className="project-7-title">AUDILOG</h1>
          <h2 className="project-7-subtitle">WINDOWS AUDIO LOGGER</h2>
          
          <p className="project-7-description">
            ADVANCED AUDIO CAPTURE AND TRANSCRIPTION SYSTEM 
            LEVERAGING WINDOWS CORE AUDIO API AND GOOGLE 
            SPEECH-TO-TEXT. FEATURES REAL-TIME TRANSCRIPTION, 
            AI-POWERED ANALYSIS, AND SEAMLESS TTS INTEGRATION.
          </p>
          
          <div className="tech-stack-summary">
            <div className="stack-item">
              <span className="stack-label">CORE</span>
              <span className="stack-value">Python + Win32 API</span>
            </div>
            <div className="stack-item">
              <span className="stack-label">STT</span>
              <span className="stack-value">Google Cloud Speech</span>
            </div>
            <div className="stack-item">
              <span className="stack-label">AI</span>
              <span className="stack-value">Gemini API</span>
            </div>
          </div>
          
          <div className="project-7-actions">
            <a
              href="https://github.com/Mmach1ne/AudioLogger.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="action-7-primary">VIEW CODE</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection7;