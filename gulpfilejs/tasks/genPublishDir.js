'use strict'

const genDir = require('../utils/genDir')
const paths = require('../constant/paths')
const setting = require(paths.setting)

const genPublishDir = (cb) => {
  genDir(setting.io.output.rootProduction, 'publish')
  cb()
}

module.exports = genPublishDir
