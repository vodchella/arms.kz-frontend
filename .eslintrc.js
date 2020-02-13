module.exports = {
  root: true,
  // extends: '@react-native-community',
  extends: 'eslint-config-rallycoding',
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react", "react-native"
  ],
  "globals": {
    "fetch": false
  },
  "rules": {
    "import/no-extraneous-dependencies": "off",
    "react/require-extension": "off",
    "global-require": "off",
    "no-nested-ternary": "off",
    "no-underscore-dangle": "off",
    "no-trailing-spaces": "error",
    "no-tabs": "error",
    "no-new-object": "error",
    "prefer-template": "error",
    "max-lines": [
      "error",
      500
    ],
    "padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": "*",
        "next": ["export", "function", "class"]
      }
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 0,
        "maxBOF": 0
      }
    ],
    "multiline-comment-style": [
      "error",
      "starred-block"
    ],
    "indent": [
      "error",
      4
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
