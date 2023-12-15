/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-03-30 20:20:59
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-15 19:06:49
 * @FilePath: \BMapSVF-Client\tailwind.config.cjs
 * @Description: Tailwind CSS configure
 */
module.exports = {
  purge: ["./index.html", "./src/**/*.{html,vue,js,scss}"],
  darkMode: false, // or 'media' or 'class' // Turn off the Dark mode variant
  theme: {
    // Response setting
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024) { ... }

      xl: "1440px"
      // => @media (min-width: 1440px) { ... }
    },
    fontSize: {
      xs: "0.73rem",
      sm: "0.83rem",
      base: "0.93rem",
      xl: "1.04rem",
      lg: "1.25rem",
      llg: "1.36rem",
      xxl: "1.67rem"
    },
    // Customize the global color
    colors: {
      transparent: "transparent",
      default: "#ffffff",
      primary: "#3e75fc",
      secondary: "#3eb1fc",
      dark: "#0a2a7a",
      gradient: "linear-gradient(#2e75fc, #6323ff)",
      success: "#099021",
      warning: "#ffcf26",
      error: "#ff554a",
      light: "rgba(0, 179, 255, 0.2)",
      "gray-200": "#d1d5d8",
      "neutral-5": "#eeeeee",
      "neutral-4": "#999999",
      "neutral-3": "#666666",
      "neutral-2": "#333333",
      "neutral-1": "#1d1d1d",
      "neutral-0": "#000000"
    },
    backgroundColor: theme => ({
      ...theme("colors"),
      "primary-30": "rgba(62, 117, 252, 0.03)"
    }),
    boxShadow: {
      default: "0rem 0rem 0.52rem 0.21rem rgba(0, 0, 0, 0.1)"
    },
    // The extension overwrites the original property name
    extend: {
      opacity: {
        0: "0",
        20: "0.2",
        30: "0.3",
        40: "0.4",
        60: "0.6",
        70: "0.7",
        80: "0.8",
        100: "1"
      }
    }
  },
  variants: {},
  // Support custom class names and class content details: https://www.tailwindcss.cn/docs/plugins
  plugins: [],
  // You can close classes you don't want to use here
  corePlugins: {
    container: false
  }
};
