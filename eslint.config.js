import js from '@eslint/js';
import boundaries from 'eslint-plugin-boundaries';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const restrictedImports = {
  paths: [
    { name: '@mui/material', message: 'Import from @/vendor instead.' },
    { name: '@mui/material/*', message: 'Import from @/vendor instead.' },
    { name: '@mui/icons-material', message: 'Import from @/vendor/icons instead.' },
    { name: '@mui/icons-material/*', message: 'Import from @/vendor/icons instead.' },
    { name: '@emotion/react', message: 'Import from @/vendor instead.' },
    { name: '@emotion/styled', message: 'Import from @/vendor instead.' },
    { name: 'framer-motion', message: 'Import from @/vendor/motion instead.' },
    { name: 'react-router-dom', message: 'Import from @/vendor/router instead.' },
    { name: 'three', message: 'Import from @/vendor/three instead.' },
    { name: '@react-three/fiber', message: 'Import from @/vendor/three instead.' },
    { name: '@react-three/drei', message: 'Import from @/vendor/three instead.' },
    { name: 'maplibre-gl', message: 'Import from @/vendor/map instead.' },
    { name: 'react-map-gl', message: 'Import from @/vendor/map instead.' },
    { name: 'react-map-gl/maplibre', message: 'Import from @/vendor/map instead.' },
  ],
};

export default tseslint.config(
  { ignores: ['dist', '.next', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'vendor', pattern: 'src/vendor/**' },
        { type: 'theme', pattern: 'src/theme/**' },
        { type: 'content', pattern: 'src/content/**' },
        { type: 'hooks', pattern: 'src/hooks/**' },
        { type: 'lib', pattern: 'src/lib/**' },
        { type: 'app', pattern: 'src/app/**' },
        { type: 'primitive', pattern: 'src/components/0-primitive/**' },
        { type: 'composition', pattern: 'src/components/1-composition/**' },
        { type: 'module', pattern: 'src/components/2-module/**' },
        { type: 'layout', pattern: 'src/components/3-layout/**' },
        { type: 'page', pattern: 'src/components/4-page/**' },
      ],
      'boundaries/ignore': ['**/*.test.{ts,tsx}', 'src/test/**'],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-restricted-imports': ['error', restrictedImports],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'vendor', allow: ['vendor'] },
            { from: 'theme', allow: ['vendor', 'theme'] },
            { from: 'content', allow: ['content'] },
            { from: 'hooks', allow: ['vendor', 'hooks', 'lib'] },
            { from: 'lib', allow: ['lib'] },
            { from: 'primitive', allow: ['vendor', 'theme', 'primitive'] },
            { from: 'composition', allow: ['vendor', 'theme', 'primitive', 'composition'] },
            {
              from: 'module',
              allow: [
                'vendor',
                'theme',
                'primitive',
                'composition',
                'module',
                'content',
                'hooks',
                'lib',
              ],
            },
            {
              from: 'layout',
              allow: ['vendor', 'theme', 'primitive', 'composition', 'module', 'layout', 'hooks'],
            },
            {
              from: 'page',
              allow: [
                'vendor',
                'theme',
                'primitive',
                'composition',
                'module',
                'layout',
                'page',
                'content',
                'hooks',
                'lib',
              ],
            },
            { from: 'app', allow: ['vendor', 'theme', 'layout', 'page', 'app'] },
          ],
        },
      ],
    },
  },
  {
    files: ['src/vendor/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': 'off',
      'boundaries/element-types': 'off',
    },
  },
);
