'use strict'

const del = require('del')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const cleanImg = () => del(setting.io.output.images + '**/*.{png,apng,jpg,gif,svg,webp,ico}')

module.exports = cleanImg
