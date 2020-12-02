/*eslint-disable */
const { isProduction } = require("./utils")

module.exports = {
  //配置全局样式变量(https://cli.vuejs.org/zh/guide/css.html#css-modules)
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: !!isProduction,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      sass: {
        // sass-loader v7 以上的版本，将选项名从 data 更改为 prependData
        prependData: `@import "@/assets/scss/main.scss";`,
      },
      less: { javascriptEnabled: true },
    },
  },
}
