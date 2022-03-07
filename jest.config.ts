/*

 * For a detailed explanation regarding each configuration property and type check, visit:

 * https://jestjs.io/docs/configuration

 */

export default {
  bail: false,

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: 'coverage',

  coverageProvider: 'v8',

  preset: 'ts-jest',

  testMatch: ['**/__tests__/**/*.spec.ts'],
};
