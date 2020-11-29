//  vue配置
/*eslint-disable */
const configureWebpack = require("./config/configure.webpack")
const plugins = require("./config/plugin-options")

module.exports = {
  ...plugins,
  configureWebpack,
}
