import React from 'react';
import '../styles/ProjectSection2.css';
import { useNavigate } from 'react-router-dom';

const ProjectSection2 = () => {
  const navigate = useNavigate();


  return (
    <div className="clothing-ml-container">
      {/* Right side - Project Info */}
      <div className="project-info">
        <h1 className="project-title">CLOTHING ML</h1>
        <h2 className="project-subtitle">
          CATEGORIZATION
          <br />
          NEURAL NETWORK
        </h2>
        
        <p className="project-description">
          ADVANCED DEEP LEARNING MODEL BUILT WITH
          <br />
          PYTORCH FRAMEWORK AND CNN ARCHITECTURE.
          <br />
          FEATURING REAL-TIME IMAGE CLASSIFICATION,
          <br />
          FASHION CATEGORY DETECTION, AND 94% ACCURACY.
        </p>

        <div className="project-buttons">
          <button className="btn-primary"
            type="button"
            onClick={() => navigate('/coming-soon')}
          >VIEW CODE</button>
          <button className="btn-secondary"
            type="button"
            onClick={() => navigate('/coming-soon')}          
          >LEARN MORE</button>
        </div>
      </div>

      {/* Center - Code Editor */}
      <div className="code-editor">
        <div className="editor-header">
          <span className="filename">model.py</span>
          <div className="editor-controls">
            <div className="control-dot"></div>
            <div className="control-dot minimize"></div>
            <div className="control-dot close"></div>
          </div>
        </div>
        <div className="code-content">
          <div className="line-numbers">
            {Array.from({length: 15}, (_, i) => (
              <span key={i + 1} className="line-number">{i + 1}</span>
            ))}
          </div>
          <div className="code-text">
            <div className="code-line">
              <span className="keyword">import</span> <span className="string">torch</span>
            </div>
            <div className="code-line">
              <span className="keyword">import</span> <span className="string">torch.nn as nn</span>
            </div>
            <div className="code-line">
              <span className="keyword">import</span> <span className="string">torchvision.transforms as transforms</span>
            </div>
            <div className="code-line"></div>
            <div className="code-line">
              <span className="keyword">class</span> <span className="function">ClothingCNN</span><span className="punctuation">(</span><span className="class">nn.Module</span><span className="punctuation">):</span>
            </div>
            <div className="code-line">
              <span className="keyword">    def</span> <span className="function">__init__</span><span className="punctuation">(</span><span className="variable">self</span><span className="punctuation">):</span>
            </div>
            <div className="code-line">
              <span className="variable">        super</span><span className="punctuation">(</span><span className="class">ClothingCNN</span><span className="punctuation">, </span><span className="variable">self</span><span className="punctuation">).</span><span className="function">__init__</span><span className="punctuation">()</span>
            </div>
            <div className="code-line">
              <span className="variable">        self</span><span className="punctuation">.</span><span className="property">conv1</span> <span className="operator">=</span> <span className="function">nn.Conv2d</span><span className="punctuation">(</span><span className="number">3</span><span className="punctuation">, </span><span className="number">64</span><span className="punctuation">, </span><span className="number">3</span><span className="punctuation">)</span>
            </div>
            <div className="code-line">
              <span className="variable">        self</span><span className="punctuation">.</span><span className="property">conv2</span> <span className="operator">=</span> <span className="function">nn.Conv2d</span><span className="punctuation">(</span><span className="number">64</span><span className="punctuation">, </span><span className="number">128</span><span className="punctuation">, </span><span className="number">3</span><span className="punctuation">)</span>
            </div>
            <div className="code-line">
              <span className="variable">        self</span><span className="punctuation">.</span><span className="property">pool</span> <span className="operator">=</span> <span className="function">nn.MaxPool2d</span><span className="punctuation">(</span><span className="number">2</span><span className="punctuation">, </span><span className="number">2</span><span className="punctuation">)</span>
            </div>
            <div className="code-line"></div>
            <div className="code-line">
              <span className="keyword">    def</span> <span className="function">forward</span><span className="punctuation">(</span><span className="variable">self</span><span className="punctuation">, </span><span className="variable">x</span><span className="punctuation">):</span>
            </div>
            <div className="code-line">
              <span className="variable">        x</span> <span className="operator">=</span> <span className="variable">self</span><span className="punctuation">.</span><span className="function">pool</span><span className="punctuation">(</span><span className="function">F.relu</span><span className="punctuation">(</span><span className="variable">self</span><span className="punctuation">.</span><span className="function">conv1</span><span className="punctuation">(</span><span className="variable">x</span><span className="punctuation">)))</span>
            </div>
            <div className="code-line">
              <span className="variable">        x</span> <span className="operator">=</span> <span className="variable">self</span><span className="punctuation">.</span><span className="function">pool</span><span className="punctuation">(</span><span className="function">F.relu</span><span className="punctuation">(</span><span className="variable">self</span><span className="punctuation">.</span><span className="function">conv2</span><span className="punctuation">(</span><span className="variable">x</span><span className="punctuation">)))</span>
            </div>
            <div className="code-line">
              <span className="keyword">        return</span> <span className="variable">x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left side - Model Status */}
      <div className="model-status">
        <div className="status-header">
          <h3>PYTORCH MODEL</h3>
          <div className="status-indicator active"></div>
        </div>

        <div className="status-section">
          <h4>Training Metrics</h4>
          <div className="metric-item">
            <span className="metric-label">ACCURACY</span>
            <div className="metric-bar">
              <div className="metric-fill accuracy"></div>
            </div>
            <div className="status-dot active"></div>
          </div>
          <div className="metric-item">
            <span className="metric-label">LOSS</span>
            <div className="metric-bar">
              <div className="metric-fill loss"></div>
            </div>
            <div className="status-dot"></div>
          </div>
          <div className="metric-item">
            <span className="metric-label">VALIDATION</span>
            <div className="metric-bar">
              <div className="metric-fill validation"></div>
            </div>
            <div className="status-dot active"></div>
          </div>
          <div className="metric-item">
            <span className="metric-label">F1-SCORE</span>
            <div className="metric-bar">
              <div className="metric-fill f1"></div>
            </div>
            <div className="status-dot"></div>
          </div>
          <div className="metric-item">
            <span className="metric-label">PRECISION</span>
            <div className="metric-bar">
              <div className="metric-fill precision"></div>
            </div>
            <div className="status-dot active"></div>
          </div>
          <div className="metric-item">
            <span className="metric-label">RECALL</span>
            <div className="metric-bar">
              <div className="metric-fill recall"></div>
            </div>
            <div className="status-dot"></div>
          </div>
        </div>

        <div className="status-section">
          <h4>Classifications</h4>
          <div className="classification-item">
            <span className="class-label">SHIRTS</span>
            <span className="class-status">"T-Shirt" Classified</span>
          </div>
          <div className="classification-item">
            <span className="class-label">PANTS</span>
            <span className="class-status">"Jeans" Detected</span>
          </div>
          <div className="status-info">
            <span>Training Status:</span>
            <span className="status-value">Complete</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection2;