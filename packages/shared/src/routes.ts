/**
 * Shared route definitions for TanStack Router
 * Single source of truth for all frontend routes
 */

export const ROUTES = {
  HOME: '/',
  CV: '/cv',
  CV_ALAN: '/cv/alan',
  NOT_FOUND: '*',
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]

/**
 * Get all available routes
 */
export const getAllRoutes = (): RoutePath[] => {
  return Object.values(ROUTES).filter(route => route !== '*')
}
