'use strict'

const del = require('del')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const cleanEjs = () => del(setting.io.output.root + '**/*.html')

module.exports = cleanEjs
