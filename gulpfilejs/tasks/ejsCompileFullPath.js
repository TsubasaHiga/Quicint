'use strict'

const ejsCompile = require('./ejsCompile')

const ejsCompileFullPath = (cb) => {
  ejsCompile('fullpath')
  cb()
}

module.exports = ejsCompileFullPath
