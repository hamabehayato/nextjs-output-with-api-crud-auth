module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "no-inferrable-types": 0,
    "@typescript-eslint/ban-types": [
      // https://www.javaer101.com/en/article/53004069.html
      "error",
      {
        types: {
          String: false,
          Boolean: false,
          Number: false,
          Symbol: false,
          "{}": false,
          Object: false,
          object: false,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
  },
  ignorePatterns: ["node_modules/", "dist/"],
  globals: {
    module: "readonly", // module は読み取り専用
  },
};
