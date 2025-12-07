import defaultTheme from './themes/default.json'
import alanTheme from './themes/alan.json'
import { merge } from 'es-toolkit'

/**
 * Theme type definitions
 */
export type ThemeType = 'default' | 'alan'

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  text?: string
  background?: string
  border?: string
  [key: string]: string | undefined
}

export interface ThemeTypography {
  fontFamily?: string
  fontSize?: string
  lineHeight?: string
  h1Size?: string
  h1Weight?: string
  h2Size?: string
  h2Weight?: string
  h3Size?: string
  h3Weight?: string
  h4Size?: string
  h4Weight?: string
  h2LineHeight?: string
  [key: string]: string | undefined
}

export interface ThemeSpacing {
  unit?: string
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  [key: string]: string | undefined
}

export interface ThemeFormat {
  borderRadius?: string
  [key: string]: string | undefined
}

export interface Theme {
  name: ThemeType
  colors: ThemeColors
  typography?: ThemeTypography
  spacing?: ThemeSpacing
  layout?: {
    maxWidth?: string
    [key: string]: string | undefined
  }
  format?: ThemeFormat
  [key: string]: unknown
}

/**
 * Base themes
 */
const THEMES: Record<ThemeType, Theme> = {
  default: defaultTheme as Theme,
  alan: alanTheme as Theme,
}

/**
 * Get theme by name (merges with default)
 */
export const getTheme = (theme: ThemeType): Theme => {
  const defaultTheme = THEMES['default']
  const selected = THEMES[theme] ?? defaultTheme

  if (theme !== 'default') {
    return merge(defaultTheme, selected)
  }

  return selected
}

/**
 * Converts theme object properties to CSS custom properties (variables)
 * e.g. toCSSVars({ primary: '#333333' }, 'color') returns: ['  --color-primary: #333333;']
 */
const toCSSVars = (
  obj: Record<string, string | undefined> | undefined,
  prefix: string
): string[] => {
  if (!obj) return []

  return Object.entries(obj).reduce<string[]>((acc, [key, value]) => {
    if (value) {
      // Convert camelCase keys to kebab-case (e.g., fontSize -> font-size)
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      acc.push(`  --${prefix}-${kebabKey}: ${value};`)
    }

    return acc
  }, [])
}

/**
 * Convert theme to CSS variable string
 */
export const themeToCSSVariables = (theme: Theme): string => {
  const lines = [
    ':root {',
    ...toCSSVars(theme.colors, 'color'),
    ...toCSSVars(theme.typography, 'font'),
    ...toCSSVars(theme.spacing, 'spacing'),
    ...toCSSVars(theme.layout, 'layout'),
    ...toCSSVars(theme.format, 'format'),
    '}',
  ]

  return lines.join('\n')
}

/**
 * Get CSS string for a theme (for use in <style> tag)
 */
export const getThemeStyles = (theme: ThemeType): string => {
  const selectedTheme = getTheme(theme)
  return themeToCSSVariables(selectedTheme)
}
