import { Brand, BRANDS } from '../src/constants.js'
import StyleDictionary from 'style-dictionary'
import { formats, transformGroups } from 'style-dictionary/enums'
import fs from 'fs'
import path from 'path'
import merge from 'lodash.merge'

/**
 * Load default tokens and merge with theme-specific overrides
 */
function loadThemeTokens(themeName: string): any {
  const defaultPath = path.join(process.cwd(), 'src/tokens/default.json')
  const themePath = path.join(process.cwd(), `src/tokens/${themeName}.json`)

  const defaultTokens = JSON.parse(fs.readFileSync(defaultPath, 'utf-8'))

  // For default theme, just use default tokens
  if (themeName === 'default') {
    return defaultTokens
  }

  // For other themes, merge with default
  const themeTokens = JSON.parse(fs.readFileSync(themePath, 'utf-8'))
  return merge(defaultTokens, themeTokens)
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand: string, tokens: any) {
  return {
    tokens,
    platforms: {
      web: {
        transformGroup: transformGroups.web,
        buildPath: `dist/assets/`,
        files: [
          {
            destination: `${brand}.css`,
            format: formats.cssVariables,
          },
        ],
      },
    },
  }
}

console.log('Build started...')

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS AND PLATFORMS
BRANDS.map(function (brand: Brand) {
  console.log(`\nProcessing: ${brand}`)

  const tokens = loadThemeTokens(brand)
  const sd = new StyleDictionary(getStyleDictionaryConfig(brand, tokens))
  sd.buildAllPlatforms()
})

console.log('\nBuild completed!')
