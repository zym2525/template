const { defaults } = require('jest-config');

const transformPackages = [
    'react-native',
    '@react-native-community'
]

module.exports = {
    "preset": "react-native",
    "moduleFileExtensions": ['js', 'jsx', 'json'],
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "transformIgnorePatterns": [
        `node_modules/(?!(${transformPackages.join('|')})/)`,
    ],
    "testURL": 'http://localhost/',
    "setupFiles": ['./jest.setup.js'],
};