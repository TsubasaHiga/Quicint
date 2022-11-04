'use strict'

const gulp = require('gulp')
const plumber = require('gulp-plumber')
const newer = require('gulp-newer')
const mozjpeg = require('imagemin-mozjpeg')
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
const imageminWebp = require('imagemin-webp')
const rename = require('gulp-rename')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const getImageLists = require('../utils/getImageLists')

/**
 * imgManual
 * 手動で圧縮率を設定する場合のタスクです。
 * 特定の画像の圧縮率を下げたい場合等で使用する事を想定しています。
 * 設定記述：setting.jsonのpngquantManualとmozjpegManual
 */
const imgManual = (cb) => {
  const imageLists = getImageLists(true)
  if (imageLists.length !== 0) {
    return gulp
      .src(imageLists)
      .pipe(
        plumber({
          errorHandler: (err) => {
            console.log(err)
            this.emit('end')
          }
        })
      )
      .pipe(newer(setting.io.output.images))
      .pipe(
        imagemin([
          pngquant(setting.pngquantManual),
          mozjpeg(setting.mozjpegManual),
          imagemin.gifsicle(setting.gifsicleManual),
          imageminWebp(setting.webpManual)
        ])
      )
      .pipe(
        rename((path) => {
          const fileFullPath = `${path.dirname}/${path.basename + path.extname}`

          if (setting.webpConvertSettings.ignore.includes(fileFullPath)) {
            return
          }

          if (setting.webpConvertSettings.targetExtnames.includes(path.extname)) {
            {
              path.extname = '.webp'
            }
          }
        })
      )
      .pipe(gulp.dest(setting.io.output.images))
  } else {
    cb()
  }
}

module.exports = imgManual
