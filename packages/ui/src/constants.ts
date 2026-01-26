/**
 * Brand constants and types
 */

export const BRANDS = ['default', 'alan', 'bsport', 'refurbed', 'peec', 'alma'] as const
export type Brand = (typeof BRANDS)[number]

const FONTS_BY_BRAND = {
  default: 'Lato',
  alan: 'Alan+Sans',
  bsport: 'Manrope',
  refurbed: 'Readex+Pro',
  peec: 'Geist',
  alma: 'DM+Serif+Text',
} as const
export const FONTS = Object.values(FONTS_BY_BRAND)
export type Font = (typeof FONTS_BY_BRAND)[Brand]
