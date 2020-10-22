module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js'
  ],
  coverageReporters: [
    'json-summary',
    'text',
    'lcov'
  ]
};
