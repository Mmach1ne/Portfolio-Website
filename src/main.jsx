import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add viewport meta tag for proper mobile rendering
const viewport = document.querySelector('meta[name="viewport"]');
if (!viewport) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.head.appendChild(meta);
}

// Prevent any accidental navigation/reload on hash changes
window.addEventListener('hashchange', (e) => {
  e.preventDefault();
}, { passive: false });

// Prevent pull-to-refresh on mobile
let lastTouchY = 0;
let preventPullToRefresh = false;

document.addEventListener('touchstart', (e) => {
  if (e.touches.length !== 1) return;
  lastTouchY = e.touches[0].clientY;
  preventPullToRefresh = window.pageYOffset === 0;
}, { passive: false });

document.addEventListener('touchmove', (e) => {
  const touchY = e.touches[0].clientY;
  const touchYDelta = touchY - lastTouchY;
  lastTouchY = touchY;
  
  if (preventPullToRefresh && touchYDelta > 0 && window.pageYOffset === 0) {
    e.preventDefault();
  }
}, { passive: false });

createRoot(document.getElementById('root')).render(
  <App />
)