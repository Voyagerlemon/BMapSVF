/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-31 20:48:36
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-05-06 16:38:32
 * @FilePath: \BMapSVF-Client\.cz-config.js
 * @Description: cz-customizable配置文件
 */
module.exports = {
  types: [
    { value: "feat", name: "✨ feat:  新增feature" },
    { value: "fix", name: "🐛 fix:  修复bug" },
    { value: "merge", name: "🧶 merge:  合并" },
    { value: "perf", name: "⚡ perf:  性能优化" },
    {
      value: "refactor",
      name: "💡 refactor:  代码重构, 没有增加feature, 也没有修复bug"
    },
    { value: "chore", name: "🧰 chore:  改变构建流程或者增加依赖库、工具等" },
    { value: "revert", name: "🔙 revert:  回滚到上一个版本" },
    {
      value: "style",
      name: "🎨 style:  仅仅修改了空格、格式缩进、逗号等, 不改变代码逻辑"
    },
    {
      value: "docs",
      name: "📝 docs: 仅仅更新了文档, 比如README等"
    },
    { value: "test", name: "✅ test:  增加测试，包括单元测试、集成测试等" },
    {
      value: "version",
      name: "📌 version:  版本发布"
    }
  ],

  scopes: ["Common module", "Global component", "Micro application", "Version updating", "cli"],
  messages: {
    type: "选择要提交的更改类型:",
    scope: "\n此更改影响的范围(可选):",
    customScope: "此更改影响的范围:"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
