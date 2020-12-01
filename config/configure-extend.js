/*eslint-disable */
const { src } = require("./utils")
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
                include: src,
                use: ["thread-loader"],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
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
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                // 拆分Vue
                vue: {
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    name: "chunk-vue",
                },
                // commons 部分的作用是分离出 node_modules 中引入的模块
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
                // 拆分Vendor
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name(module) {
                //         // 获取第三方包名
                //         const packageName = module.context.match(
                //             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                //         )[1]

                //         // npm 软件包名称是 URL 安全的，但是某些服务器不喜欢@符号
                //         return `npm.${packageName.replace("@", "")}`
                //     },
                // },
            },
        },
        minimizer: [],
    },
}
