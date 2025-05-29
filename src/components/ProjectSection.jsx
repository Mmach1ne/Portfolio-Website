import React from 'react';
import '../styles/ProjectSection.css';
import {motion} from 'framer-motion'

const ProjectSection = () => {
  return (
    <section className="project-section">
      <div className="project-title-section">
        <h1 className="project-title">Projects</h1>
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
                    <h4>Communications</h4>
                    <div className="sensor-data">
                      <div className="sensor-item">
                        <span className="sensor-label">SLAVE</span>
                        <span className="sensor-value">"Hello World" Sent</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">MASTER</span>
                        <span className="sensor-value">"Hello World" Recieved</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Connection</span>
                        <span className="sensor-value">Stable</span>
                      </div>
                      <div className="sensor-item">
                        <span className="sensor-label">Light</span>
                        <span className="sensor-value">750 lux</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Code Preview */}
                <div className="Pcode-preview">
                  <div className="Pcode-header">
                    <span>main.c</span>
                    <div className="Pcode-status">●</div>
                  </div>
                  <div className="Pcode-content">
                    <div className="Pcode-line">
                      <span className="line-number">1</span>
                      <span className="Pcode-text">#include "stm32f4xx.h"</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">2</span>
                      <span className="Pcode-text">#include "main.h"</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">3</span>
                      <span className="Pcode-text"></span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">4</span>
                      <span className="Pcode-text">int main(void) </span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">5</span>
                      <span className="Pcode-text">  HAL_Init();</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">6</span>
                      <span className="Pcode-text">  SystemClock_Config();</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">7</span>
                      <span className="Pcode-text">  MX_GPIO_Init();</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">8</span>
                      <span className="Pcode-text">  MX_USART2_UART_Init();</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">9</span>
                      <span className="Pcode-text"></span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">10</span>
                      <span className="Pcode-text">  while (1) </span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">11</span>
                      <span className="Pcode-text">    HAL_GPIO_TogglePin(...);</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">12</span>
                      <span className="Pcode-text">    HAL_Delay(500);</span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">13</span>
                      <span className="Pcode-text">  </span>
                    </div>
                    <div className="Pcode-line">
                      <span className="line-number">14</span>
                      <span className="Pcode-text"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Project info */}
          <div className="project-info">
            <h1 className="project-title">STM32 Comms</h1>
            <h2 className="project-subtitle">Dual Channel Communication SyS</h2>
            
            <p className="project-description">
              Advanced embedded system built with STM32F407VGT6 microcontroller, 
              featuring real-time Keystroke Logging, GPIO control, and UART communication.
            </p>
            
            <div className="project-buttons">
              <a
                href="https://github.com/Mmach1ne/ECE-198-RJD"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-primary">VIEW CODE</button>
              </a>
              <a href="/STM32Comms.pdf" download="STM32-Comms-Manual.pdf">
                <button className="btn-secondary">LEARN MORE</button>
              </a>

            </div>
          </div>
      </div>
    </div>
    </section>
  );
};

export default ProjectSection;