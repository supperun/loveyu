class DoudouZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    // webpack 模块实例，可以通过 compiler 对象访问，
    // 这样确保使用的是模块的正确版本
    // （不要直接 require/import webpack）
    const { webpack } = compiler

    // Compilation 对象提供了对一些有用常量的访问。
    const { Compilation } = webpack

    // RawSource 是其中一种 “源码”("sources") 类型，
    // 用来在 compilation 中表示资源的源码
    const { RawSource } = webpack.sources
    compiler.hooks.emit.tapPromise('DoudouZipPlugin', (compilation) => {
      // 返回一个 pormise ，异步任务完成后 resolve
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          console.log('异步任务完成...')
          resolve()
        }, 1000)
      })
    })
  }
}
module.exports = DoudouZipPlugin
