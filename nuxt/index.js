const { resolve } = require('path')
const { ProvidePlugin } = require('webpack')

module.exports = function () {
  this.addPlugin({
    src: resolve(__dirname, 'plugin.js'),
    fileName: 'helpers.js',
  })

  this.options.build.plugins.push(
    new ProvidePlugin({
      UniSharp: '@unisharp/helpers.js',
    })
  )

  if (!this.options.build.babel.plugins) {
    this.options.build.babel.plugins = []
  }

  this.options.build.babel.plugins.push('@unisharp/babel-plugin')
}
