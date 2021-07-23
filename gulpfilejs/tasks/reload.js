'use strict'

const browserSync = require('../modules/browserSync')

const reload = (cb) => {
  browserSync.reload()
  cb()
}

module.exports = reload
