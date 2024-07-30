const baseWebpackConfig = require("./webpack.base.config");
const webpackMerge = require("webpack-merge");
const path = require("path");
const DoudouZipPlugin = require("../lib/doudouZipPlugin");
module.exports = webpackMerge.merge(baseWebpackConfig, {
  mode: "development", // Webpack 会开启一些开发工具和优化，比如开启热更新、注入环境变量等。
  stats: {
    // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
  module: {
    // 自定义loader
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: path.resolve("lib/doudouyu.js"),
            options: {
              target: "doudou",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new DoudouZipPlugin({
      path: "./",
      fileName: "doudou.zip",
    }),
  ],
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    port: 3000,
  },
});
