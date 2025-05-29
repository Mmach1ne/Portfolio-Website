import React from 'react';
import Portfolio from './components/Portfolio';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ComingSoon from './components/ComingSoon.jsx';
import './App.css';

function App() {
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