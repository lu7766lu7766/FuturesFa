var path = require('path')
var webpackConfig = require('./webpack.config')

// var resolve = (dir) =>
// {
//   return path.join(__dirname, dir)
// }

module.exports = {
  baseUrl: './',
  outputDir: 'www',
  lintOnSave: true,
  assetsDir: 'static',
  configureWebpack: webpackConfig,
  devServer: {
    disableHostCheck: true,
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8088,
    https: false,
    hotOnly: false,
    before: app =>
    {
      // var express = require('express')
      // app.use('/assets', express.static(resolve('assets')))
      // console.log(resolve('assets'))
    }
  }
}