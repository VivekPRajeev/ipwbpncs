import "@testing-library/jest-dom";
import { beforeEach } from "vitest";

// Global test setup
beforeEach(() => {
  // Clear any previous test state
  localStorage.clear();
  sessionStorage.clear();
});

// Mock crypto.randomUUID for consistent testing
Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: () => "mock-uuid-" + Math.random().toString(36).substr(2, 9),
  },
});

// Mock for any Font Awesome issues in tests
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
