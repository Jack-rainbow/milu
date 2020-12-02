/*eslint-disable */
const { isProduction, resolve, dir } = require("./utils")
const useAlias = require("./use-alias")
const configureExtend = require("./configure-extend")
// 打包包时间分析
const webpack = require("webpack")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()
const MomentLocalesPlugin = require("moment-locales-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 参考链接：https://zhuanlan.zhihu.com/p/42465502
// page title
const PAGE_NAME = "米鹿"

// 打包时排除  模块
const externals = {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "vue-router",
    axios: "axios",
    moment: "moment",
}
const config = smp.wrap({
    name: PAGE_NAME,
    output: {
        // path: resolve("static"),
        filename: "[name].dll.js",
        // library: "[name]_library",
    },
    resolve: {
        extensions: [".js", ".jsx", ".vue", "ts", "tsx"],
        modules: [resolve("node_modules")],
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
    plugins: isProduction
        ? [
              // 提升二次构建速度
              new HardSourceWebpackPlugin({
                  // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
                  // 果清除了node_modules，则缓存也是如此
                  cacheDirectory: "../node_modules/.cache/hard-source/[confighash]",
                  // Either an absolute path or relative to webpack's options.context.
                  // Sets webpack's recordsPath if not already set.
                  recordsPath: "../node_modules/.cache/hard-source/[confighash]/records.json",
                  // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
                  // 置构建不同的缓存
                  configHash: function (webpackConfig) {
                      // node-object-hash on npm can be used to build this.
                      return require("node-object-hash")({ sort: false }).hash(webpackConfig)
                  },
                  // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
                  // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
                  environmentHash: {
                      root: process.cwd(),
                      directories: [],
                      files: ["package-lock.json", "yarn.lock"],
                  },
              }),

              new BundleAnalyzerPlugin(),
              // 查找重复包
              new DuplicatePackageCheckerPlugin(),

              // moment  只打包中文包
              new MomentLocalesPlugin({
                  localesToKeep: ["zh-cn"],
              }),
              //   压缩webpack插件(会增大包size-暂时隐藏)
              //   new CompressionPlugin({
              //       cache: true,
              //       //   algorithm: "gzip", //开启gzip
              //       test: /\.js$|\.html$|\.css/,
              //   }),
              new HtmlWebpackPlugin(),
              new LodashModuleReplacementPlugin(), //优化lodash
              new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 配置忽略规则
          ]
        : [],
    ...configureExtend,
})

useAlias(config)
delete config.resolve.alias.set

module.exports = config
