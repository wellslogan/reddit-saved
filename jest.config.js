module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '@models$': '<rootDir>/client/models',
    '@models/(.*)$': '<rootDir>/client/models/$1',
    '@utils$': '<rootDir>/client/utils',
    '@utils/(.*)$': '<rootDir>/client/utils/$1',
    '@components$': '<rootDir>/src',
    '@components/(.*)$': '<rootDir>/client/components/$1',
    '@app/(.*)$': '<rootDir>/client/$1',
  },
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  setupFiles: ['jest-localstorage-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/client/setupTests.ts',
};
