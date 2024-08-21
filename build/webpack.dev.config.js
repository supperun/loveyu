const baseWebpackConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge.merge(baseWebpackConfig, {
  mode: 'development', // Webpack 会开启一些开发工具和优化，比如开启热更新、注入环境变量等。
  stats: {
    // 控制台输出日志控制
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    hash: true,
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    port: 3000,
  },
})
