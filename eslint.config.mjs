// ESLint flat-config for vigimed-www (Next 16, React 19, ESLint 9).
//
// Preset choice: eslint-config-next/core-web-vitals
//   + @typescript-eslint flat/recommended + flat/strict.
// Rationale for strict: tsconfig already enforces noUncheckedIndexedAccess,
// so narrowing discipline is expected of code in this repo; the strict preset
// codifies that expectation at lint time rather than only at type-check time.
// Typed-linting (parserOptions.project) is intentionally off to keep `npm run lint`
// fast; the strict non-typed rules catch enough for a ~200 LOC app.
//
// Non-goals per VM-349 spec: no Prettier, no pre-commit hook.
// The `--max-warnings=0` gate lives in the `lint` npm script, not here.
//
// Filename note: `.mjs` rather than `.js` because package.json has no
// `"type": "module"`; `.mjs` is ESLint 9 and Next 16 idiomatic.

import nextVitals from 'eslint-config-next/core-web-vitals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

const tsRecommended = tsPlugin.configs['flat/recommended'];
const tsStrict = tsPlugin.configs['flat/strict'];

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'coverage/**',
      'next-env.d.ts',
      'tsconfig.tsbuildinfo',
      '.preview/**',
      '.vercel/**',
    ],
  },
  ...nextVitals,
  ...tsRecommended,
  ...tsStrict,
  {
    languageOptions: {
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node },
    },
  },
];

export default config;
