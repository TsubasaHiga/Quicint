'use strict'

const del = require('del')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const cleanAll = () => del([setting.io.output.root + '/**/*', setting.io.output.rootProduction + '/**/*'])

module.exports = cleanAll
