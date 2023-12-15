/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-30 20:46:10
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 19:02:40
 * @FilePath: \BMapSVF-Client\.eslintrc.js
 * @Description: eslint related configurations
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  plugins: ["prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-prototype-builtins": 0,
    "no-case-declarations": 0,
    "no-console": 0,
    "no-debugger": 0,
    "prefer-const": [
      2,
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-var": 2,
    "no-unused-vars": 0,
    "no-use-v-if-with-v-for": 0,
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    eqeqeq: [2, "always"],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
