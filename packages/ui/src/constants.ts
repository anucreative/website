/**
 * Brand constants and types
 */

export const BRANDS = ['default', 'alan', 'bsport', 'refurbed', 'peec'] as const

export type Brand = (typeof BRANDS)[number]
