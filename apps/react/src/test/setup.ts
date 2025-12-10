import { setupServer } from 'msw/node'
import { handlers } from '@website/msw'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

// Create and start the MSW server for testing
const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})

afterAll(() => {
  server.close()
})
