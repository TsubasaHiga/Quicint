'use strict'

const gulp = require('gulp')
const fs = require('fs')
const jsonlint = require('gulp-jsonlint')
const figlet = require('figlet')
require('colors')

const isExistFile = require('../utils/isExistFile')
const paths = require('../constant/paths')

const jsoncFileCeck = (cb) => {
  // 環境設定ファイルの読み込み
  const setting = isExistFile(paths.setting) ? JSON.parse(fs.readFileSync(paths.setting, 'utf8')) : ''

  // サイト設定ファイルの読み込み.
  const siteSetting = isExistFile(paths.settingSite) ? JSON.parse(fs.readFileSync(paths.settingSite, 'utf8')) : ''

  // ejs defineファイルの読み込み.
  const define = isExistFile(paths.define) ? JSON.parse(fs.readFileSync(paths.define, 'utf8')) : ''

  if (setting && siteSetting && define) {
    gulp.src([setting.io.setting, setting.io.siteSetting, setting.io.define]).pipe(jsonlint()).pipe(jsonlint.reporter())

    figlet(siteSetting.publishFileName, (err, data) => {
      if (err) {
        console.log(err)
        return false
      }
      console.log(data)
    })
    console.log('---------------------------'.green)
    console.log('json file check OK! Ready..'.bold.green)
    console.log('- OK: setting.json'.cyan)
    console.log('- OK: setting-site.json'.cyan)
    console.log('---------------------------'.green)
  } else {
    console.log('------------------------------'.red)
    console.log('The json file cannot be read..'.bold.red)
    console.log('------------------------------'.red)

    return false
  }

  cb()
}

module.exports = jsoncFileCeck
