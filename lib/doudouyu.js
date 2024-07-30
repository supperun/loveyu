module.exports = function (source) {
  const options = this.getOptions(); // 拿到配置loader中的参数
  console.log(options);
  return source;
};
