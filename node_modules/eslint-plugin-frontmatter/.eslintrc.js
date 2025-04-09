module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },
  "extends": [
    "eslint:recommended",
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "unix"],
    "max-len": [1, 80, { "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true }],
    "no-console": ["error"],
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-undef": ["error", { "typeof": false }],
    "no-trailing-spaces": 2,
    "quotes": ["error", "single"],
  },
  "plugins": [
    "import",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true
    }
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
        ]
      }
    }
  }
};
