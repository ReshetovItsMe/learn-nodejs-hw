module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest'
    },
    setupFiles: ['./setup-tests.ts'],
    testRegex: '((\\.|/)(test))\\.ts?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ]
};
