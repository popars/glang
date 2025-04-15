module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: ['js'],
    testMatch: ['**/test/**/*.spec.js'],
    setupFilesAfterEnv: ['./test/setup.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8'
  };