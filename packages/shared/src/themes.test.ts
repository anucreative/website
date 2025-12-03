import { describe, it, expect } from 'vitest'
import { getTheme, themeToCSSVariables, getThemeStyles, type Theme } from './themes'
import { merge } from 'es-toolkit'

describe('themes', () => {
  describe('getTheme', () => {
    it('should return a theme object', () => {
      const theme = getTheme('default')
      expect(theme).toBeDefined()
      expect(theme.colors).toBeDefined()
      expect(theme.colors.primary).toBeDefined()
      expect(theme.colors.secondary).toBeDefined()
    })

    it('should return the alan theme', () => {
      const theme = getTheme('alan')
      expect(theme).toBeDefined()
      expect(theme.colors.primary).toBe('#1a1a1a')
      expect(theme.colors.secondary).toBe('#ffffff')
      expect(theme.colors.accent).toBe('#ff6b35')
    })

    it('alan theme should have inherited typography', () => {
      const alanTheme = getTheme('alan')

      expect(alanTheme.typography).toBeDefined()
      expect(alanTheme.typography?.fontFamily).toBeDefined()
      expect(alanTheme.typography?.fontSize).toBeDefined()
    })

    it('both themes should have required color properties', () => {
      const defaultTheme = getTheme('default')
      const alanTheme = getTheme('alan')

      expect(defaultTheme.colors.primary).toBeDefined()
      expect(alanTheme.colors.primary).toBeDefined()
    })
  })

  describe('Theme merging', () => {
    it('should merge theme objects correctly', () => {
      const base: Theme = {
        name: 'default',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#0066cc',
        },
        typography: {
          fontFamily: 'Arial',
          fontSize: '16px',
        },
      }

      const override: Partial<Theme> = {
        colors: {
          primary: '#111111',
          accent: '#ff0000',
          secondary: '#ffffff',
        },
      }

      const merged = merge(base, override) as Theme

      expect(merged.colors.primary).toBe('#111111')
      expect(merged.colors.secondary).toBe('#ffffff')
      expect(merged.colors.accent).toBe('#ff0000')
      expect(merged.typography?.fontFamily).toBe('Arial')
    })

    it('should handle empty override', () => {
      const base: Theme = {
        name: 'default',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#0066cc',
        },
      }

      const merged = merge(base, {}) as Theme

      expect(merged.colors.primary).toBe(base.colors.primary)
      expect(merged.colors.secondary).toBe(base.colors.secondary)
    })
  })

  describe('themeToCSSVariables', () => {
    it('should convert theme to CSS variables with valid structure', () => {
      const theme = getTheme('default')
      const css = themeToCSSVariables(theme)

      expect(css).toContain(':root {')
      expect(css).toContain('--color-')
      expect(css).toContain('}')
    })

    it('should convert camelCase keys to kebab-case', () => {
      const theme: Theme = {
        name: 'default',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#0066cc',
          backgroundColor: '#eeeeee',
        },
      }

      const css = themeToCSSVariables(theme)

      expect(css).toContain('--color-background-color: #eeeeee;')
    })

    it('should include typography variables if present', () => {
      const theme = getTheme('default')
      const css = themeToCSSVariables(theme)

      if (theme.typography?.fontFamily) {
        expect(css).toContain('--font-font-family:')
      }
    })

    it('should include spacing variables if present', () => {
      const theme = getTheme('default')
      const css = themeToCSSVariables(theme)

      if (theme.spacing?.unit) {
        expect(css).toContain('--spacing-unit:')
      }
    })

    it('should skip undefined values', () => {
      const theme: Theme = {
        name: 'default',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#0066cc',
          text: undefined,
        },
      }

      const css = themeToCSSVariables(theme)

      expect(css).not.toContain('--color-text:')
    })

    it('should return valid CSS syntax', () => {
      const theme = getTheme('default')
      const css = themeToCSSVariables(theme)

      expect(css.startsWith(':root {')).toBe(true)
      expect(css.endsWith('}')).toBe(true)
    })
  })

  describe('getThemeStyles', () => {
    it('should return CSS string for default theme', () => {
      const css = getThemeStyles('default')

      expect(css).toContain(':root {')
      expect(css).toContain('--color-')
      expect(css).toContain('}')
    })

    it('should return CSS string for alan theme', () => {
      const css = getThemeStyles('alan')

      expect(css).toContain(':root {')
      expect(css).toContain('--color-')
      expect(css).toContain('}')
    })

    it('should contain alan theme color values', () => {
      const css = getThemeStyles('alan')

      expect(css).toContain('#1a1a1a')
      expect(css).toContain('#ffffff')
      expect(css).toContain('#ff6b35')
    })
  })

  describe('Theme structure', () => {
    it('default theme should have required color properties', () => {
      const theme = getTheme('default')

      expect(theme.colors.primary).toBeDefined()
      expect(theme.colors.secondary).toBeDefined()
      expect(theme.colors.accent).toBeDefined()
    })

    it('alan theme should have required color properties', () => {
      const theme = getTheme('alan')

      expect(theme.colors.primary).toBeDefined()
      expect(theme.colors.secondary).toBeDefined()
      expect(theme.colors.accent).toBeDefined()
    })

    it('themes should have valid hex color values', () => {
      const hexRegex = /^#(?:[0-9a-f]{3}){1,2}$/i
      const theme = getTheme('default')

      Object.values(theme.colors).forEach(color => {
        if (color) {
          // Allow both hex and rgba colors
          const isHex = hexRegex.test(color)
          const isRgba = color.startsWith('rgba(')
          expect(isHex || isRgba).toBe(true)
        }
      })
    })
  })
})
