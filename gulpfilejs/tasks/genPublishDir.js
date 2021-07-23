'use strict'

const genDir = require('../utils/genDir')

const genPublishDir = (cb) => {
  genDir('dist-production', 'publish')
  cb()
}

module.exports = genPublishDir
