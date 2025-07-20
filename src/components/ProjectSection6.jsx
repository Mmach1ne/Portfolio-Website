import React from 'react';
import '../styles/ProjectSection6.css';

const ProjectSection6 = () => {
  return (
    <section className="bus-tracking-section">
      <div className="bus-tracking-container">
        {/* Left Panel - Project Info */}
        <div className="tracking-info">
          <h1 className="tracking-title">TRANSIT TRACKER</h1>
          <h2 className="tracking-subtitle">REAL-TIME BUS MONITORING</h2>
          
          <p className="tracking-description">
            ARCHITECTED A REAL-TIME BUS TRACKING SYSTEM LEVERAGING STM32 
            MICROCONTROLLERS, AWS IOT CORE, AND MICROSERVICES. IMPLEMENTED 
            MQTT COMMUNICATION, SERVERLESS PROCESSING WITH LAMBDA, DOCKERIZED 
            SERVICES ON ECS, AND NEXT.JS LIVE MAP VISUALIZATION.
          </p>
          
          <div className="aws-services">
            <h4>AWS STACK</h4>
            <div className="service-grid">
              <div className="service-item">
                <div className="service-icon">IoT</div>
                <span className="service-name">IoT Core</span>
              </div>
              <div className="service-item">
                <div className="service-icon">λ</div>
                <span className="service-name">Lambda</span>
              </div>
              <div className="service-item">
                <div className="service-icon">API</div>
                <span className="service-name">API Gateway</span>
              </div>
              <div className="service-item">
                <div className="service-icon">ECS</div>
                <span className="service-name">ECS</span>
              </div>
              <div className="service-item">
                <div className="service-icon">CW</div>
                <span className="service-name">CloudWatch</span>
              </div>
              <div className="service-item">
                <div className="service-icon">DDB</div>
                <span className="service-name">DynamoDB</span>
              </div>
            </div>
          </div>
          
          <div className="system-features">
            <div className="feature-metric">
              <span className="metric-label">LATENCY</span>
              <span className="metric-value">&lt; 100ms</span>
            </div>
            <div className="feature-metric">
              <span className="metric-label">UPTIME</span>
              <span className="metric-value">99.9%</span>
            </div>
            <div className="feature-metric">
              <span className="metric-label">DEVICES</span>
              <span className="metric-value">250+</span>
            </div>
          </div>
          
          <div className="tracking-actions">
            <button className="action-primary">VIEW ARCHITECTURE</button>
            <button className="action-secondary">LIVE DEMO</button>
          </div>
        </div>

        {/* Center - Map Interface */}
        <div className="map-interface">
          <div className="map-window">
            <div className="map-header">
              <div className="map-controls">
                <button className="control-btn active">Live</button>
                <button className="control-btn">Routes</button>
                <button className="control-btn">Analytics</button>
              </div>
              <div className="map-status">
                <span className="status-dot active"></span>
                <span>Real-time Updates</span>
              </div>
            </div>
            
            <div className="map-container">
              <div className="map-view">
                {/* Map Grid */}
                <div className="map-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="grid-line horizontal" style={{top: `${i * 20}%`}}></div>
                  ))}
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="grid-line vertical" style={{left: `${i * 20}%`}}></div>
                  ))}
                </div>
                
                {/* Bus Routes */}
                <svg className="route-overlay">
                  <path className="route-path route-1" d="M 50 350 Q 150 250 250 300 T 450 200" />
                  <path className="route-path route-2" d="M 100 100 L 200 150 L 300 120 L 400 180" />
                  <path className="route-path route-3" d="M 80 250 Q 180 200 280 250 T 480 150" />
                </svg>
                
                {/* Bus Markers */}
                <div className="bus-marker bus-1" style={{left: '25%', top: '60%'}}>
                  <div className="bus-icon">🚌</div>
                  <div className="bus-info">
                    <span className="bus-number">42A</span>
                    <span className="bus-speed">35 km/h</span>
                  </div>
                </div>
                
                <div className="bus-marker bus-2" style={{left: '45%', top: '30%'}}>
                  <div className="bus-icon">🚌</div>
                  <div className="bus-info">
                    <span className="bus-number">18B</span>
                    <span className="bus-speed">28 km/h</span>
                  </div>
                </div>
                
                <div className="bus-marker bus-3" style={{left: '70%', top: '45%'}}>
                  <div className="bus-icon">🚌</div>
                  <div className="bus-info">
                    <span className="bus-number">7X</span>
                    <span className="bus-speed">42 km/h</span>
                  </div>
                </div>
                
                {/* Bus Stops */}
                <div className="bus-stop" style={{left: '20%', top: '55%'}}>
                  <div className="stop-marker"></div>
                  <span className="stop-name">Central Station</span>
                </div>
                
                <div className="bus-stop" style={{left: '50%', top: '25%'}}>
                  <div className="stop-marker"></div>
                  <span className="stop-name">University</span>
                </div>
                
                <div className="bus-stop" style={{left: '75%', top: '50%'}}>
                  <div className="stop-marker"></div>
                  <span className="stop-name">Tech Park</span>
                </div>
              </div>
              
              {/* Map Info Panel */}
              <div className="map-info-panel">
                <div className="info-section">
                  <h5>ACTIVE BUSES</h5>
                  <div className="info-value">23</div>
                </div>
                <div className="info-section">
                  <h5>AVG DELAY</h5>
                  <div className="info-value">2.3 min</div>
                </div>
                <div className="info-section">
                  <h5>PASSENGERS</h5>
                  <div className="info-value">1,847</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - System Architecture */}
        <div className="architecture-view">
          <div className="arch-header">
            <h3>SYSTEM ARCHITECTURE</h3>
            <div className="arch-status active"></div>
          </div>
          
          <div className="data-flow">
            <div className="flow-node device">
              <div className="node-icon">📡</div>
              <span className="node-label">STM32 Devices</span>
              <div className="node-metric">250 units</div>
            </div>
            
            <div className="flow-arrow">↓</div>
            
            <div className="flow-node mqtt">
              <div className="node-icon">📨</div>
              <span className="node-label">MQTT Protocol</span>
              <div className="node-metric">5k msg/s</div>
            </div>
            
            <div className="flow-arrow">↓</div>
            
            <div className="flow-node aws">
              <div className="node-icon">☁️</div>
              <span className="node-label">AWS IoT Core</span>
              <div className="node-metric">99.9% uptime</div>
            </div>
            
            <div className="flow-arrow">↓</div>
            
            <div className="flow-node lambda">
              <div className="node-icon">λ</div>
              <span className="node-label">Lambda Functions</span>
              <div className="node-metric">50ms avg</div>
            </div>
            
            <div className="flow-arrow">↓</div>
            
            <div className="flow-node services">
              <div className="node-icon">🔧</div>
              <span className="node-label">Microservices</span>
              <div className="node-metric">12 containers</div>
            </div>
            
            <div className="flow-arrow">↓</div>
            
            <div className="flow-node frontend">
              <div className="node-icon">🗺️</div>
              <span className="node-label">Next.js Frontend</span>
              <div className="node-metric">Live updates</div>
            </div>
          </div>
          
          <div className="monitoring-section">
            <h4>MONITORING</h4>
            <div className="monitor-grid">
              <div className="monitor-item">
                <span className="monitor-label">CPU</span>
                <div className="monitor-bar">
                  <div className="monitor-fill" style={{width: '45%'}}></div>
                </div>
              </div>
              <div className="monitor-item">
                <span className="monitor-label">Memory</span>
                <div className="monitor-bar">
                  <div className="monitor-fill" style={{width: '62%'}}></div>
                </div>
              </div>
              <div className="monitor-item">
                <span className="monitor-label">Network</span>
                <div className="monitor-bar">
                  <div className="monitor-fill" style={{width: '78%'}}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="deployment-info">
            <div className="deploy-item">
              <span className="deploy-label">CI/CD</span>
              <span className="deploy-value">GitHub Actions</span>
            </div>
            <div className="deploy-item">
              <span className="deploy-label">Scaling</span>
              <span className="deploy-value">Auto-scaling</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection6;