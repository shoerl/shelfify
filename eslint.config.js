// eslint.config.js
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';

export default [
  // 0) *Ignore* everything in these paths/globs
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "config/**",
      "**/*.config.js",
    ],
  },
  // 1) ESLint core “recommended”
  js.configs.recommended,

  // 2) TypeScript + React support
  {
    // apply to both .ts/.tsx
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
      // TS and React recommended
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,

      // we no longer need to import React for JSX
      'react/react-in-jsx-scope': 'off',

      // let TS handle “undefined” names
      'no-undef': 'off',

      // shrink unused-vars to warnings, and ignore _-prefixed names
      '@typescript-eslint/no-unused-vars': 'off',

      // don’t block you from ever using `any`
      '@typescript-eslint/no-explicit-any': ['off'],
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off'

    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // 3) Your stylistic overrides
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: true,
    jsx: true,

  }),
  // 4) Turn off max-statements-per-line
  {
    rules: {
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/multiline-ternary': 'off'
    },
  },
];
