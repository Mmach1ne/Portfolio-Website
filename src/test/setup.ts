import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import './nextMocks.tsx';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
