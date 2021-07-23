'use strict'

const browserSync = require('../modules/browserSync')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const sync = () => browserSync.init(setting.browsersync)

module.exports = sync
