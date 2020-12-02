/*eslint-disable */
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = {
    devtool: "none", // webpack内关闭sourceMap(不打包.js.map)文件
    optimization: {
        // 优化配置
        runtimeChunk: "single",
        splitChunks: {
            // initial 入口chunk，对于异步导入的文件不处理,async 异步chunk，只对异步导入的文件处理（个人理解）. all 全部chunk
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                // commons 部分的作用是分离出 node_modules 中引入的模块
                common: {
                    name: "chunk-common",
                    minChunks: 2,
                    minSize: 30000,
                },
                // 这里需要注意的是如果使用initial 会将首页需要的依赖和项目本身的依赖打包2次增大文件体积
                default: false,
                // 拆分Vendor
                // vendor: {},
            },
        },
        minimizer: [
            // 压缩 CSS
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require("cssnano"),
                cssProcessorPluginOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            })
        ],
    },
}
