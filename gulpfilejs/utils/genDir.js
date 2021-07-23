'use strict'

const gulp = require('gulp')
const path = require('path')
const zip = require('gulp-zip')
const notify = require('gulp-notify')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const genDir = (dirname, type) => {
  dirname = typeof dirname !== 'undefined' ? dirname : 'publish_data'

  const distname = 'dist'
  const userHome =
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
  const publishDir = path.join(userHome, setting.publishDir)

  const srcIgnore = [
    distname + '/**/*',
    '!' + distname + '/**/maps',
    '!' + distname + '/**/*.map',
    '!' + distname + '/**/*.DS_Store',
    '!' + distname + '/**/*.LICENSE',
    '!' + distname + '/**/*Thumbs.db',
  ]

  if (type === 'zip') {
    return gulp
      .src(srcIgnore)
      .pipe(zip(dirname + '.zip'))
      .pipe(gulp.dest(publishDir))
      .pipe(
        notify({
          title: '納品データをZIP化しました 🗜',
          message: '出力先：' + publishDir + '/' + dirname + '.zip',
        })
      )
  } else {
    return gulp.src(srcIgnore).pipe(gulp.dest(dirname))
  }
}

module.exports = genDir
