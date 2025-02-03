module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // If you need to keep some any types
    '@typescript-eslint/no-require-imports': 'off', // If you need to keep require imports
  },
} 