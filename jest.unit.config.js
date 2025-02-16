/** @type {import('jest').Config} */
export default {
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  collectCoverageFrom: ['src/**/*.js', '!src/index.js'],
  watchPathIgnorePatterns: ['node_modules'],
  testPathIgnorePatterns: ['test/integration'],
};
