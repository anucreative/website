/**
 * Theme type definitions
 * Supports a generic theme and alan theme
 */

export type ThemeType = 'default' | 'alan'

export interface ThemeConfig {
  name: ThemeType
  primaryColor: string
  secondaryColor: string
  accentColor: string
}

export const THEME_CONFIGS: Record<ThemeType, ThemeConfig> = {
  default: {
    name: 'default',
    primaryColor: '#333333',
    secondaryColor: '#f5f5f5',
    accentColor: '#0066cc',
  },
  alan: {
    name: 'alan',
    primaryColor: '#1a1a1a',
    secondaryColor: '#ffffff',
    accentColor: '#ff6b35',
  },
}

/**
 * Get theme configuration by name
 */
export const getThemeConfig = (theme: ThemeType): ThemeConfig => {
  return THEME_CONFIGS[theme] ?? THEME_CONFIGS['default']
}
