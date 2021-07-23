'use strict'

const path = require('path')

module.exports = {
  setting: path.join(__dirname, '../../setting.json'),
  settingSite: path.join(__dirname, '../../setting-site.json'),
  define: path.join(__dirname, '../../define.json'),
  webpackDev: path.join(__dirname, '../../webpack.dev'),
  webpackProd: path.join(__dirname, '../../webpack.prod'),
}
