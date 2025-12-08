import StyleDictionary from 'style-dictionary'
import { formats, transformGroups } from 'style-dictionary/enums'

const BRANDS = ['default', 'alan']

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
function getStyleDictionaryConfig(brand: string) {
  return {
    source: [`tokens/${brand}.json`],
    platforms: {
      web: {
        transformGroup: transformGroups.web,
        buildPath: `dist/`,
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

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

BRANDS.map(function (brand) {
  console.log(`\nProcessing: ${brand}`)

  const sd = new StyleDictionary(getStyleDictionaryConfig(brand))
  sd.buildAllPlatforms()
})

console.log('\nBuild completed!')
