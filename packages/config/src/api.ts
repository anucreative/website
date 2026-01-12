/**
 * API endpoint constants
 */

export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3001',
  NODE_API_URL: process.env.VITE_NODE_API_URL || 'http://localhost:3001',
  PYTHON_API_URL: process.env.VITE_PYTHON_API_URL || 'http://localhost:8000',
  DATA: '/api/data',
} as const

export const REQUEST_TIMEOUT = 10000 // 10 seconds

/**
 * Get the appropriate API URL based on environment
 */
export const getApiUrl = (): string => {
  return API_ENDPOINTS.BASE_URL
}
