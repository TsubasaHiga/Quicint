'use strict'

const gulp = require('gulp')
const scss = require('./scss')
const img = require('./img')
const imgManual = require('./imgManual')
const js = require('./js')
const ejsCompile = require('./ejsCompile')
const reload = require('./reload')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const watch = () => {
  gulp.watch(setting.io.input.styles + '**/*.scss', scss)
  gulp.watch(setting.io.input.images + '**/*', gulp.series(img, imgManual))
  gulp.watch(setting.io.input.scripts + '**/*.{ts,js}', gulp.series(js, ejsCompile, reload))
  gulp.watch(setting.io.input.ejs + '**/*.ejs', { interval: 250 }, gulp.series(ejsCompile, reload))
}

module.exports = watch
