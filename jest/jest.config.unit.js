/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./jest.config.js');

module.exports = {
  ...baseConfig,
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
};
