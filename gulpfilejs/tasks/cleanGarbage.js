'use strict'

const del = require('del')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const cleanGarbage = () =>
  del(setting.io.output.html + '**/*{maps,.map,.DS_Store,.LICENSE,Thumbs.db}')

module.exports = cleanGarbage
