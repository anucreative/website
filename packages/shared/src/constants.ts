/**
 * Shared constants across the monorepo
 */

// API endpoint constants
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3001',
  NODE_API_URL: process.env.VITE_NODE_API_URL || 'http://localhost:3001',
  PYTHON_API_URL: process.env.VITE_PYTHON_API_URL || 'http://localhost:8000',
  DATA: '/api/data',
} as const

// Application constants
export const APP = {
  NAME: 'anucreative',
  VERSION: '1.0.0',
  ENVIRONMENT: process.env.NODE_ENV || 'development',
} as const

// Cache and timeout constants
export const CACHE = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  LONG_TTL: 60 * 60 * 1000, // 1 hour
} as const

// Request timeout
export const REQUEST_TIMEOUT = 10000 // 10 seconds

/**
 * Get the appropriate API URL based on environment
 */
export const getApiUrl = (): string => {
  return API_ENDPOINTS.BASE_URL
}
