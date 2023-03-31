/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-03-30 20:20:59
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-03-30 20:31:07
 * @FilePath: \BMapSVF-Client\tailwind.config.cjs
 * @Description: Tailwind CSS配置
 */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // 响应设置
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024) { ... }

      xl: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    fontSize: {
      xs: "0.73rem",
      sm: "0.83rem",
      base: "0.93rem",
      xl: "1.04rem",
      lg: "1.25rem",
      xxl: "1.67rem",
    },
    colors: {
      transparent: "transparent",
      default: "#ffffff",
      digit: "#00131B",
      digitline: "#00B3FF",
      primary: "#00B3FF",
      secondary: "#3eb1fc",
      dark: "#0a2a7a",
      gradient: "linear-gradient(#2e75fc, #6323ff)",
      success: "#099021",
      warning: "#ffcf26",
      error: "#ff554a",
      light: "rgba(0, 179, 255, 0.2)",
      "neutral-5": "#eeeeee",
      "neutral-4": "#999999",
      "neutral-3": "#666666",
      "neutral-2": "#333333",
      "neutral-1": "#1d1d1d",
      "neutral-0": "#000000",
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      "primary-30": "rgba(62, 117, 252, 0.03)",
    }),
    boxShadow: {
      default: "0rem 0rem 0.52rem 0.21rem rgba(0, 0, 0, 0.1)",
    },
    // 拓展覆盖原属性名称
    extend: {
      opacity: {
        0: "0",
        20: "0.2",
        30: "0.3",
        40: "0.4",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        100: "1",
      },
    },
  },
  variants: {},
  // 支持自定义类名及类内容详见 https://www.tailwindcss.cn/docs/plugins
  plugins: [],
  // 可以在此关闭你不想使用的类
  corePlugins: {
    container: false,
  },
};
