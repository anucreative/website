import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * Create browser worker with handlers
 */
export const worker = setupWorker(...handlers)

/**
 * Start the worker with sensible defaults
 */
export async function startWorker() {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    return await worker.start({
      onUnhandledRequest: 'warn',
    })
  }
}
