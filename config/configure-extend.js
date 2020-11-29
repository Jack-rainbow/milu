/*eslint-disable */
const { isProduction } = require("./utils")

module.exports = {
  configureWebpack: {
    // Webpack配置
    devtool: "none", // webpack内关闭sourceMap
    optimization: {
      // 优化配置
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          // 拆分Vue
          vue: {
            test: /[\\/]node_modules[\\/]vue[\\/]/,
            name: "chunk-vue",
          },
        },
      },
    },
  },
  chainWebpack(config) {
    if (isProduction) {
      config.plugin("html").tap((args) => {
        args[0].cdn = cdn
        return args
      })
      config.externals(externals)
      config.plugin("html").tap((args) => {
        args[0].minify.minifyCSS = true
        return args
      })
      // gzip需要nginx进行配合
      config
        .plugin("compression")
        .use({})
        .tap(() => [
          {
            test: /\.js$|\.html$|\.css/, // 匹配文件名
            threshold: 10240, // 超过10k进行压缩
            deleteOriginalAssets: true, // 是否删除源文件，这里最好不要删除
          },
        ])
    }
  },
}
