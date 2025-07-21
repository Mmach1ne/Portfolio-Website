import React, { useState, useEffect } from 'react';
import Portfolio from './components/Portfolio';
import PortfolioMobile from './PortfolioMobile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComingSoon from './components/ComingSoon.jsx';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) {
    return <PortfolioMobile />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;