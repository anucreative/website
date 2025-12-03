import { setupServer } from 'msw/node'
import { handlers } from '@monorepo/msw'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'

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
