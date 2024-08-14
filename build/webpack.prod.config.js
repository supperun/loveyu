const baseWebpackConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = webpackMerge.merge(baseWebpackConfig, {
  mode: 'production', // 或 'production' 或 'none' Webpack 会对代码进行压缩、优化，以及移除一些开发环境下的工具和提示。
  public: '/assets',
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({ extractComments: false, test: /\.js(\?.*)?$/i }),
    ],
  },
})
