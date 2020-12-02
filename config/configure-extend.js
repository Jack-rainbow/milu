/*eslint-disable */
const { src, dir } = require("./utils")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
module.exports = {
    devtool: "none", // webpack内关闭sourceMap(不打包.js.map)文件
    watch: true,
    // 自定义监视模式
    watchOptions: {
        // 排除监听
        ignored: /node_modules/,
        // 监听到变化发生后，延迟 300ms（默认） 再去执行动作，
        // 防止文件更新太快导致重新编译频率太高
        aggregateTimeout: 300,
        // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
        // 默认 1000ms 询问一次
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [dir],
                use: ["cache-loader", "thread-loader"],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: /node_modules/,
                use: [
                    "cache-loader",
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.9],
                                speed: 4,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75,
                            },
                        },
                    },
                ],
            },
        ],
    },
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
                vendor: {
                    test(module) {
                        let path = module.resource
                        if (!path) return true
                        path = path.replace(/\\/g, "/")
                        let isNeed =
                            path &&
                            /node_modules/.test(path) &&
                            /node_modules\/(?!vuetify)/.test(path) &&
                            /node_modules\/(?!muse)\n*/.test(path)
                        if (!isNeed && path.indexOf("node_modules") > -1) {
                            console.log("vendor not need::", path, isNeed)
                        }
                        return isNeed
                    },
                    name: "chunk-vendors",
                    // 优先级，多个分组冲突时决定把代码放在哪块
                    priority: 10,
                    enforce: true,
                },
                // 拆分Vue
                vue: {
                    test(module) {
                        let path = module.resource
                        if (!path) return false
                        path = path.replace(/\\/g, "/")
                        // return path && path.indexOf('node_modules') > -1 && path.indexOf('vuetify') > -1
                        return path && /node_modules\/vue/.test(path)
                    },
                    name: "chunk-vuetify",
                    priority: 9,
                    enforce: true,
                },
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
            }),
        ],
    },
}
