/**
 * Brand constants and types
 */

const FONTS_BY_BRAND = {
  default: 'Lato',
  alan: 'Alan+Sans',
  bsport: 'Manrope',
  refurbed: 'Readex+Pro',
  peec: 'Geist',
  alma: 'DM+Serif+Text',
  cobbleweb: 'Outfit',
  restream: 'Montserrat',
} as const

export const BRANDS = Object.keys(FONTS_BY_BRAND)
export type Brand = keyof typeof FONTS_BY_BRAND

export const FONTS = Object.values(FONTS_BY_BRAND)
export type Font = (typeof FONTS_BY_BRAND)[Brand]
