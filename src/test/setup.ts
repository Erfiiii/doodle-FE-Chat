import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// 1. Extend Vitest's 'expect' with Jest-DOM matchers
expect.extend(matchers)

// 2. Automatically run cleanup after each test to prevent memory leaks
afterEach(() => {
  cleanup()
})
