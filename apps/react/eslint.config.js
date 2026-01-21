import { defineConfig } from 'eslint/config'
import rootConfig from '../../eslint.config.js'
import storybook from 'eslint-plugin-storybook'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  ...rootConfig,
  {
    files: ['**/*.stories.{js,ts,tsx}'],
    extends: [storybook.configs['flat/recommended']],
  },
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
])
