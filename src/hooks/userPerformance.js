// hooks/usePerformance.js - Performance optimization hooks
import { useEffect, useRef, useCallback, useState } from 'react';

// Throttle hook for performance-sensitive operations
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = now;
    }
  }, [callback, delay]);
};

// Debounce hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

// Intersection Observer hook for lazy loading
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    if ('performance' in window && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
          }
        }
      });

      observer.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });

      return () => observer.disconnect();
    }
  }, []);
};

// RAF-based animation hook
export const useRAF = (callback, deps = []) => {
  const frame = useRef();
  const lastTime = useRef(performance.now());
  const func = useRef(callback);

  useEffect(() => {
    func.current = callback;
  }, [callback]);

  useEffect(() => {
    const animate = (time) => {
      const deltaTime = time - lastTime.current;
      lastTime.current = time;
      func.current(deltaTime);
      frame.current = requestAnimationFrame(animate);
    };
    
    frame.current = requestAnimationFrame(animate);
    
    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, deps);
};