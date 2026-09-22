import '@testing-library/jest-dom/vitest'
import { createElement } from 'react'
import { vi } from 'vitest'

function TestIcon({ icon }: { icon: unknown }) {
  return createElement('svg', {
    'aria-hidden': 'true',
    'data-icon': typeof icon === 'string' ? icon : 'inline-icon',
  })
}

vi.mock('@iconify/react', () => ({ Icon: TestIcon }))
vi.mock('@iconify/react/dist/iconify.js', () => ({ Icon: TestIcon }))

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
