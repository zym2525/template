const { defaults } = require('jest-config');

module.exports = {
    "moduleFileExtensions": ['js', 'jsx', 'json', 'vue'],
    "transform": {
        // 用 `vue-jest` 处理 `*.vue` 文件
        ".*\\.(vue)$": "vue-jest",
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest'
    },
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "snapshotSerializers": ['jest-serializer-vue'],
    // "collectCoverage": true,
    // "collectCoverageFrom": ["src/**/*.{js,vue}", "!**/node_modules/**"],
    // "coverageReporters": ["lcov", "text-summary"],
    "testURL": 'http://localhost/'
};