import React from 'react';
import '../styles/ProjectSection.css';

const ProjectSection = () => {
  return (
    <section className="project-section">
      <div className="project-container">
        {/* Left side - STM32 Project preview */}
        <div className="project-preview">
          <div className="stm32-mockup">
            {/* STM32 Board Illustration */}
            <div className="board-container">
              <div className="stm32-board">
                <div className="board-header">
                  <h3>STM32F407VGT6</h3>
                  <div className="status-indicator active"></div>
                </div>
                
                {/* GPIO Pins */}
                <div className="gpio-section">
                  <h4>GPIO Status</h4>
                  <div className="pin-grid">
                    <div className="pin-row">
                      <span className="pin-label">PA0</span>
                      <div className="pin-status high"></div>
                    </div>
                    <div className="pin-row">
                      <span className="pin-label">PA1</span>
                      <div className="pin-status low"></div>
                    </div>
                    <div className="pin-row">
                      <span className="pin-label">PA2</span>
                      <div className="pin-status high"></div>
                    </div>
                    <div className="pin-row">
                      <span className="pin-label">PB0</span>
                      <div className="pin-status low"></div>
                    </div>
                    <div className="pin-row">
                      <span className="pin-label">PB1</span>
                      <div className="pin-status high"></div>
                    </div>
                    <div className="pin-row">
                      <span className="pin-label">PC0</span>
                      <div className="pin-status low"></div>
                    </div>
                  </div>
                </div>
                
                {/* Sensor Data */}
                <div className="sensor-section">
                  <h4>Sensor Readings</h4>
                  <div className="sensor-data">
                    <div className="sensor-item">
                      <span className="sensor-label">Temperature</span>
                      <span className="sensor-value">24.5°C</span>
                    </div>
                    <div className="sensor-item">
                      <span className="sensor-label">Humidity</span>
                      <span className="sensor-value">45.2%</span>
                    </div>
                    <div className="sensor-item">
                      <span className="sensor-label">Pressure</span>
                      <span className="sensor-value">1013.2 hPa</span>
                    </div>
                    <div className="sensor-item">
                      <span className="sensor-label">Light</span>
                      <span className="sensor-value">750 lux</span>
                    </div>
                  </div>
                </div>
                
                {/* System Info */}
                <div className="system-section">
                  <h4>System Status</h4>
                  <div className="system-info">
                    <div className="info-item">
                      <span className="info-label">CPU Usage</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '35%' }}></div>
                      </div>
                      <span className="info-value">35%</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Memory</span>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '62%' }}></div>
                      </div>
                      <span className="info-value">62%</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Uptime</span>
                      <span className="info-value">2h 34m</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Code Preview */}
              <div className="code-preview">
                <div className="code-header">
                  <span>main.c</span>
                  <div className="code-status">●</div>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="line-number">1</span>
                    <span className="code-text">#include "stm32f4xx.h"</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">2</span>
                    <span className="code-text">#include "main.h"</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">3</span>
                    <span className="code-text"></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">4</span>
                    <span className="code-text">int main(void) </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">5</span>
                    <span className="code-text">  HAL_Init();</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">6</span>
                    <span className="code-text">  SystemClock_Config();</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">7</span>
                    <span className="code-text">  MX_GPIO_Init();</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">8</span>
                    <span className="code-text">  MX_USART2_UART_Init();</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">9</span>
                    <span className="code-text"></span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">10</span>
                    <span className="code-text">  while (1) </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">11</span>
                    <span className="code-text">    HAL_GPIO_TogglePin(...);</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">12</span>
                    <span className="code-text">    HAL_Delay(500);</span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">13</span>
                    <span className="code-text">  </span>
                  </div>
                  <div className="code-line">
                    <span className="line-number">14</span>
                    <span className="code-text"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Project info */}
        <div className="project-info">
          <h1 className="project-title">STM32 IoT</h1>
          <h2 className="project-subtitle">Embedded System</h2>
          
          <p className="project-description">
            Advanced embedded system built with STM32F407VGT6 microcontroller, 
            featuring real-time sensor monitoring, GPIO control, and UART communication.
          </p>
          
          <div className="project-buttons">
            <button className="btn-primary">VIEW CODE</button>
            <button className="btn-secondary">LEARN MORE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;