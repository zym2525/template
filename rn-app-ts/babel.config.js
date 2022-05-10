const path = require('path')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "lodash",
    [
      "import",
      {
        libraryName: "ahooks",
        camel2DashComponentName: false
      },
      "ahooks"
    ],
    [
      "module-resolver",
      {
        "root": [
          "./src"
        ],
        "alias": {
          "@": "./src",
          "@config": "./config",
        }
      }
    ],
    [
      'react-native-reanimated/plugin', {
        relativeSourceLocation: true,
      },
    ]
  ],
  env: {
    production: {
      plugins: [
        "transform-remove-console",
        "react-native-paper/babel"
      ]
    }
  }
};
