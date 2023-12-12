/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-31 20:48:36
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-12-12 21:30:56
 * @FilePath: \BMapSVF-Client\.cz-config.js
 * @Description: cz-customizable Configuration file
 */
module.exports = {
  types: [
    { value: "feat", name: "✨ feat:  new feature" },
    { value: "fix", name: "🐛 fix:  fix bug" },
    { value: "merge", name: "🧶 merge:  merge" },
    { value: "perf", name: "⚡ perf:  performance optimization" },
    {
      value: "refactor",
      name: "💡 refactor:  Code refactoring, no features added, no bugs fixed"
    },
    { value: "chore", name: "🧰 chore:  Change the build process or add dependency libraries, tools, etc" },
    { value: "revert", name: "🔙 revert:  Roll back to the previous version" },
    {
      value: "style",
      name: "🎨 style:  Only modified the space, format indentation, comma, etc., do not change the code logic"
    },
    {
      value: "docs",
      name: "📝 docs: Just updated documentation, such as README, etc"
    },
    { value: "test", name: "✅ test:  Add tests, including unit tests, integration tests, etc" },
    {
      value: "version",
      name: "📌 version:  release version"
    }
  ],

  scopes: ["Common module", "Global component", "Micro application", "Version updating", "cli"],
  messages: {
    type: "Select the type of change you want to commit:",
    scope: "\nScope of impact of this change (optional):",
    customScope: "The extent to which this change affects:"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
