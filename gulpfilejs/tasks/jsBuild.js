'use strict'

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')

const paths = require('../constant/paths')
const setting = require(paths.setting)
const webpackProd = require(paths.webpackProd)

const jsBuild = () => {
  return gulp
    .src(setting.io.input.scripts + '**/*.{ts,js}')
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.log(err)
          this.emit('end')
        },
      })
    )
    .pipe(webpackStream(webpackProd, webpack))
    .pipe(gulp.dest(setting.io.output.scripts))
}

module.exports = jsBuild
