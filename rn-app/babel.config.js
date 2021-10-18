module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "lodash",
      {
        "id": "recompact"
      }
    ],
    [
      "import",
      {
        libraryName: "@ant-design/react-native"
      }
    ],
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
        }
      }
    ]
  ],
  "env": {
    "production": {
      "plugins": [
        "transform-remove-console",
        "react-native-paper/babel"
      ]
    }
  }
};
