import React from 'react';
import '../styles/ProjectSection5.css';

const ProjectSection5 = () => {
  return (
    <section className="raybot-section">
      <div className="raybot-container">
        {/* Left Panel - Bot Architecture */}
        <div className="architecture-panel">
          <div className="arch-header">
            <h3>BOT ARCHITECTURE</h3>
            <div className="arch-indicator active"></div>
          </div>
          
          <div className="memory-section">
            <h4>MEMORY SYSTEM</h4>
            <div className="memory-stats">
              <div className="memory-item">
                <span className="memory-label">DATABASE</span>
                <span className="memory-value">SQLite</span>
              </div>
              <div className="memory-item">
                <span className="memory-label">STORAGE</span>
                <span className="memory-value">128MB</span>
              </div>
              <div className="memory-item">
                <span className="memory-label">CONVERSATIONS</span>
                <span className="memory-value">1,247</span>
              </div>
              <div className="memory-item">
                <span className="memory-label">RECALL TIME</span>
                <span className="memory-value"> 50ms</span>
              </div>
            </div>
          </div>

          <div className="skills-section">
            <h4>ACTIVE SKILLS</h4>
            <div className="skills-grid">
              <div className="skill-module active">
                <div className="skill-icon">λ</div>
                <span className="skill-name">Math Solver</span>
                <div className="skill-usage">847 calls</div>
              </div>
              <div className="skill-module active">
                <div className="skill-icon">&lt;/&gt;</div>
                <span className="skill-name">Code Generator</span>
                <div className="skill-usage">523 calls</div>
              </div>
              <div className="skill-module active">
                <div className="skill-icon">📊</div>
                <span className="skill-name">Data Analysis</span>
                <div className="skill-usage">392 calls</div>
              </div>
              <div className="skill-module">
                <div className="skill-icon">🔍</div>
                <span className="skill-name">Web Search</span>
                <div className="skill-usage">Loading...</div>
              </div>
              <div className="skill-module active">
                <div className="skill-icon">💬</div>
                <span className="skill-name">Context Memory</span>
                <div className="skill-usage">Always On</div>
              </div>
              <div className="skill-module">
                <div className="skill-icon">+</div>
                <span className="skill-name">Add Skill</span>
                <div className="skill-usage">Modular</div>
              </div>
            </div>
          </div>

          <div className="task-manager">
            <h4>TASK QUEUE</h4>
            <div className="task-list">
              <div className="task-item processing">
                <span className="task-id">#1247</span>
                <span className="task-type">Math Query</span>
                <div className="task-progress"></div>
              </div>
              <div className="task-item queued">
                <span className="task-id">#1248</span>
                <span className="task-type">Code Request</span>
                <div className="task-progress"></div>
              </div>
              <div className="task-item completed">
                <span className="task-id">#1246</span>
                <span className="task-type">Memory Recall</span>
                <div className="task-progress"></div>
              </div>
            </div>
          </div>

          <div className="system-metrics">
            <span>Response Time:</span>
            <span className="metric-value">~1.2s</span>
          </div>
        </div>

        {/* Center - Chat Interface */}
        <div className="chat-preview">
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="terminal-dot close"></span>
                <span className="terminal-dot minimize"></span>
                <span className="terminal-dot maximize"></span>
              </div>
              <div className="terminal-title">
                <span>raybot_terminal.py</span>
              </div>
              <div className="terminal-status">● Running</div>
            </div>
            
            <div className="terminal-content">
              <div className="chat-history">
                <div className="message-block user-message">
                  <span className="prompt">&gt;&gt;&gt;</span>
                  <span className="message-content">Hey Raybot, remember when we discussed the fibonacci sequence last week?</span>
                </div>
                
                <div className="message-block bot-message">
                  <span className="prompt">[RAYBOT]</span>
                  <span className="message-content">Yes! On March 12th, we explored the Fibonacci sequence. You were particularly interested in its recursive implementation and asked about optimization using memoization. Would you like to continue from where we left off?</span>
                </div>
                
                <div className="message-block user-message">
                  <span className="prompt">&gt;&gt;&gt;</span>
                  <span className="message-content">Yes! Can you generate an optimized version with dynamic programming?</span>
                </div>
                
                <div className="message-block bot-message">
                  <span className="prompt">[RAYBOT]</span>
                  <span className="skill-indicator">[Activating: Code Generator]</span>
                  <pre className="code-output">
{`def fibonacci_dp(n):
    if n <= 1:
        return n
    
    # Dynamic programming approach
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    
    return dp[n]

# Time: O(n), Space: O(n)`}</pre>
                  <span className="message-content">This dynamic programming solution reduces time complexity from O(2^n) to O(n). I've stored this implementation in our conversation history for future reference.</span>
                </div>
                
                <div className="message-block user-message">
                  <span className="prompt">&gt;&gt;&gt;</span>
                  <span className="input-cursor">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Project Info */}
        <div className="raybot-info">
          <h1 className="raybot-title">RAYBOT</h1>
          <h2 className="raybot-subtitle">INTELLIGENT CONVERSATIONAL AGENT</h2>
          
          <p className="raybot-description">
            PYTHON-BASED CONVERSATIONAL AGENT COMBINING A MODULAR SKILLS SYSTEM, 
            SQLITE MEMORY BANK, AND LIGHTWEIGHT TASK MANAGER. ANALYSES MESSAGES 
            TO SELECT APPROPRIATE SKILLS WHILE MAINTAINING CONVERSATION CONTINUITY 
            THROUGH PERSISTENT MEMORY STORAGE.
          </p>
          
          <div className="tech-specs">
            <div className="spec-item">
              <span className="spec-label">LANGUAGE</span>
              <span className="spec-value">Python 3.9+</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">DATABASE</span>
              <span className="spec-value">SQLite</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">ARCHITECTURE</span>
              <span className="spec-value">Plugin-Based</span>
            </div>
          </div>
          
          <div className="project-features">
            <h4>KEY FEATURES</h4>
            <ul className="feature-highlights">
              <li>Modular skill system for easy expansion</li>
              <li>Persistent memory across conversations</li>
              <li>Multi-threaded task processing</li>
              <li>Context-aware response generation</li>
              <li>Single-function skill integration</li>
            </ul>
          </div>
          
          <div className="raybot-actions">
            <a
              href="https://github.com/Mmach1ne/LLM-RAG-Agent"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="action-primary">VIEW CODE</button>
            </a>

            <a
              href="https://effervescent-haupia-013614.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="action-secondary">TRY DEMO</button>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection5;