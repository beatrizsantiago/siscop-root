import type { Config } from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: [
    "\\\\node_modules\\\\"
  ],
  coverageProvider: "babel",
  coverageReporters: ["html"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/emptyMock.js",
    "\\.(svg|jpg|jpeg|png|webp)$": "<rootDir>/tests/__mocks__/emptyMock.js",
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@usecases/(.*)$': '<rootDir>/src/usecases/$1',
    '^@generalTypes/(.*)$': '<rootDir>/src/types/$1',
  },
  moduleDirectories: [
    "node_modules",
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['./jest.setup.tsx'],
};

export default config;
