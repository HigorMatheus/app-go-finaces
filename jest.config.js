module.exports = {
  preset: 'jest-expo',

  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
    '@testing-library/react-hooks',
  ],
  colletCoverage: true,
  colletCoverage:[
    'src/**/*.tsx',
    '!src/**/*.spec.tsx'
  ],
  coverageReporters: ['lcov']
};
