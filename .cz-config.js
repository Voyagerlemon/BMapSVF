module.exports = {
  types: [
    { value: "feat", name: "feat:  新增feature" },
    { value: "fix", name: "fix:  修复bug" },
    { value: "merge", name: "merge:  合并" },
    { value: "perf", name: "perf:  优化相关，比如提升性能、体验" },
    { value: "refactor", name: "refactor:  代码重构，没有加新功能或者修复bug" },
    { value: "chore", name: "chore:  改变构建流程、或者增加依赖库、工具等" },
    { value: "revert", name: "revert:  回滚到上一个版本" },
    {
      value: "style",
      name: "style:  仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑"
    },
    {
      value: "docs",
      name: "docs: 仅仅修改了文档，比如README, CHANGELOG, CONTRIBUTE等等"
    },
    { value: "test", name: "test:  测试用例，包括单元测试、集成测试等" },
    {
      value: "version",
      name: "version:  发版本用的"
    }
  ],

  scopes: ["公共模块", "微件", "版本更新", "cli"],
  messages: {
    type: "选择要提交的更改类型:",
    scope: "\n此更改影响的范围(可选):",
    customScope: "此更改影响的范围:"
  },
  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
