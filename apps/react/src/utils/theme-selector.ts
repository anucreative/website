// Determine theme based on company param
export const getThemeFromCompany = (company?: string): 'default' | 'alan' => {
  if (company === 'alan') {
    return 'alan'
  }
  return 'default'
}
