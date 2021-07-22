'use strict'

const genDir = require('../utils/genDir')

const genPublishFullPathDir = (cb) => {
  genDir('dist-production-fullpath', 'publish-fullpath')
  cb()
}

module.exports = genPublishFullPathDir
