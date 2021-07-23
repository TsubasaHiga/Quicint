'use strict'

const fs = require('fs')

const isExistFile = (file) => {
  try {
    fs.statSync(file)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false
    }
  }
}

module.exports = isExistFile
