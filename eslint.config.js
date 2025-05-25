// eslint.config.js
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import stylistic from '@stylistic/eslint-plugin'

export default [
  // 1) Core ESLint recommended
  js.configs.recommended,

  // 2) TS + React in one go
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react': reactPlugin,
    },
    rules: {
      // all the TS-recommended rules…
      ...tsPlugin.configs.recommended.rules,
      // …plus React’s recommended rules
      ...reactPlugin.configs.recommended.rules,
      // …but disable the old “must import React” rule:
      'react/react-in-jsx-scope': 'off',
    },
    settings: { 'react': { version: 'detect' }, 'react/jsx-runtime': 'automatic' },
  },

  // 3) Your stylistic overrides
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
]
