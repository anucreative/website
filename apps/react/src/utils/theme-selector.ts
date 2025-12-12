// Determine theme based on company param
export const getThemeFromSlug = (slug?: string): 'default' | 'alan' => {
  if (slug === 'alan') {
    return 'alan'
  }
  return 'default'
}
