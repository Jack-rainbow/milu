// const { VueLoaderPlugin } = require("vue-loader");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const configureWebpack = require("./config/configure.webpack");
const plugins = require("./config/plugin-options");

module.exports = {
  ...plugins,
  configureWebpack
  // plugins: [
  // new VueLoaderPlugin(),
  // new MiniCssExtractPlugin({
  //   filename: "[name].css"
  // }),
  // new webpack.DefinePlugin({
  //   __VUE_OPTIONS_API__: "true",
  //   __VUE_PROD_DEVTOOLS__: "false"
  // })
  // ],
};
