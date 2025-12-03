import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * Create browser worker with handlers (only in browser environment)
 */
export const worker = typeof window !== 'undefined' ? setupWorker(...handlers) : null

/**
 * Start the worker with sensible defaults
 */
export async function startWorker() {
  // Only start in browser environment
  if (typeof window === 'undefined') {
    return
  }

  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    if (worker) {
      return await worker.start({
        onUnhandledRequest: 'warn',
      })
    }
  }
}
