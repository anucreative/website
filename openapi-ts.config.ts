import { defineConfig } from '@hey-api/openapi-ts'
import { resolve } from 'path'

export default defineConfig({
  input: resolve(__dirname, 'services/api/openapi.json'),
  output: {
    path: resolve(__dirname, 'packages/data-types/src'),
    format: 'prettier',
  },
  plugins: ['@hey-api/typescript'],
})
