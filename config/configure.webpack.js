/*eslint-disable */
const { isProduction, resolve } = require("./utils")
const useAlias = require("./use-alias")
const configureExtend = require("./configure-extend")
// 打包包时间分析
const webpack = require("webpack")
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const smp = new SpeedMeasurePlugin()
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin")
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")


// page title
const PAGE_NAME = "米鹿"

// 打包时排除  模块
const externals = {
    vue: "Vue",
    vuex: "Vuex",
    axios: "axios",
}

const config = smp.wrap({
    name: PAGE_NAME,
    output: {
        filename: "bundle.js",
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
    plugins: [
        // 提升二次构建速度
        new HardSourceWebpackPlugin(),

        new BundleAnalyzerPlugin(),
        // 查找重复包
        new DuplicatePackageCheckerPlugin(),

        //使用 DLLPlugin 进行分包
        new webpack.DllPlugin({
            name: "_dll_[name]", //该字段的值也就是输出的 manifest.json 文件 中 name 字段的值 例如 library.manifest.json 中就有 "name": "_dll_library"
            path: resolve("./build/library/[name].manifest.json"), //
        }),

        // moment  只打包中文包
        new MomentLocalesPlugin({
            localesToKeep: ["zh-cn"],
        }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 配置忽略规则
    ],
    ...configureExtend,
})

useAlias(config)
delete config.resolve.alias.set

module.exports = config
