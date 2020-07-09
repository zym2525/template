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
        "transform-remove-console"
      ]
    }
  }
};
