// https://docs.expo.dev/guides/using-eslint/
// module.exports = {
//   extends: 'expo',
//   ignorePatterns: ['/dist/*'],
// };

module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'error',
    'single-quote': 'on',
  },
};

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//     node: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react/recommended',
//     'plugin:react-native/all',
//     'plugin:prettier/recommended',
//   ],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   plugins: ['react', 'react-native', '@typescript-eslint'],
//   rules: {
//     // ✅ Stylistic
//     semi: ['error', 'always'],
//     quotes: ['error', 'single'],
//     indent: ['error', 2],
//     'comma-dangle': ['error', 'always-multiline'],
//     'no-multiple-empty-lines': ['error', { max: 1 }],
//     'eol-last': ['error', 'always'],

//     // ✅ Code Quality
//     'no-unused-vars': 'off', // Turned off for TS
//     '@typescript-eslint/no-unused-vars': ['error'],
//     'no-undef': 'off', // Handled by TS
//     'no-console': 'warn',
//     eqeqeq: ['error', 'always'],
//     'no-redeclare': 'error',
//     'no-duplicate-case': 'error',
//     'no-empty': 'warn',
//     'no-extra-semi': 'error',

//     // ✅ Best Practices
//     curly: ['error', 'all'],
//     'dot-notation': 'error',
//     'no-eval': 'error',
//     'no-implied-eval': 'error',
//     'no-useless-return': 'error',

//     // ✅ ES6+
//     'prefer-const': 'error',
//     'no-var': 'error',
//     'arrow-spacing': ['error', { before: true, after: true }],
//     'object-shorthand': ['error', 'always'],

//     // ✅ React / React Native
//     'react/react-in-jsx-scope': 'off', // Not needed in React 17+
//     'react-native/no-inline-styles': 'warn',
//     'react-native/no-raw-text': 'off', // Allow raw text inside Text component
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
// };
