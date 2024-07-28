const ENV = process.env.NODE_ENV; // 获取脚本路径上的参数
module.exports = require(`./build/webpack.${ENV}.config`);
