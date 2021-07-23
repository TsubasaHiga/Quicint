'use strict'

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const mozjpeg = require('imagemin-mozjpeg')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const getImageLists = require('../utils/getImageLists')

const img = () => {
  return gulp
    .src(getImageLists(false))
    .pipe(
      plumber({
        errorHandler: (err) => {
          console.log(err)
          this.emit('end')
        },
      })
    )
    .pipe(newer(setting.io.output.images))
    .pipe(
      imagemin([
        pngquant(setting.pngquant),
        mozjpeg(setting.mozjpeg),
        imagemin.svgo(setting.svgo),
        imagemin.gifsicle(setting.gifsicle),
      ])
    )
    .pipe(gulp.dest(setting.io.output.images))
}

module.exports = img
