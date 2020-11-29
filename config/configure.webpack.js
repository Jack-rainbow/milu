/*eslint-disable */
const { isProduction } = require("./utils")
const { name } = require("../package")
const useAlias = require("./use-alias")

// page title
const PAGE_NAME = "米鹿"

// externals lib key
const externals = {
  vue: "Vue",
  vuex: "Vuex",
  axios: "axios",
}

const config = {
  name: PAGE_NAME,
  output: {
    // 把子应用打包成 umd 库格式
    library: `${name}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`,
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".json", "ts", "tsx"],
    alias: {
      set(name, path) {
        this[name] = path
        return this
      },
    },
  },
  externals: isProduction ? externals : {},
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  // parallel: require("os").cpus().length > 1,
  plugins: [],
}

useAlias(config)
delete config.resolve.alias.set

module.exports = config
