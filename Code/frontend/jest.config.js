module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['core-js'],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css)$': '<rootDir>/__mocks__/fileMock.js',
        '^@chakra-ui/(.*)$': '<rootDir>/node_modules/@chakra-ui/$1',
    },
};
