import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

/** jsdom has no IntersectionObserver, which Framer Motion needs for whileInView. */
class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback
  }

  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1, boundingClientRect: target.getBoundingClientRect?.() ?? {} }], this)
  }

  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? vi.fn()

afterEach(cleanup)
