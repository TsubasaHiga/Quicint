'use strict'

// TODO ディレクトリ名「gulpfile.js」がlint-stagedでパスできる方法が見つかったら`gulpfile.js/`配下に移動する

const gulp = require('gulp')

// tasks
const cleanGarbage = require('./gulpfilejs/tasks/cleanGarbage')
const js = require('./gulpfilejs/tasks/js')
const jsBuild = require('./gulpfilejs/tasks/jsBuild')
const cleanAll = require('./gulpfilejs/tasks/cleanAll')
const cleanImg = require('./gulpfilejs/tasks/cleanImg')
const cleanEjs = require('./gulpfilejs/tasks/cleanEjs')
const scss = require('./gulpfilejs/tasks/scss')
const scssProduction = require('./gulpfilejs/tasks/scssProduction')
const img = require('./gulpfilejs/tasks/img')
const imgManual = require('./gulpfilejs/tasks/imgManual')
const sync = require('./gulpfilejs/tasks/sync')
const genPublishDir = require('./gulpfilejs/tasks/genPublishDir')
const ejsCompile = require('./gulpfilejs/tasks/ejsCompile')
const genZipArchive = require('./gulpfilejs/tasks/genZipArchive')
const watch = require('./gulpfilejs/tasks/watch')
const jsoncFileCeck = require('./gulpfilejs/tasks/jsoncFileCeck')

exports.default = gulp.series(jsoncFileCeck, gulp.parallel(watch, sync))
exports.development = gulp.series(jsoncFileCeck, cleanAll, scss, img, imgManual, ejsCompile, js)
exports.production = gulp.series(
  jsoncFileCeck,
  cleanAll,
  scssProduction,
  img,
  imgManual,
  ejsCompile,
  jsBuild,
  cleanGarbage,
  genPublishDir
)
exports.productionNoImg = gulp.series(jsoncFileCeck, scssProduction, ejsCompile, jsBuild, cleanGarbage, genPublishDir)
exports.checkJson = jsoncFileCeck
exports.zip = gulp.series(
  jsoncFileCeck,
  cleanAll,
  scssProduction,
  img,
  imgManual,
  ejsCompile,
  jsBuild,
  cleanGarbage,
  genZipArchive
)
exports.resetImg = gulp.series(cleanImg, img, imgManual)
exports.resetEjs = gulp.series(cleanEjs, ejsCompile)
exports.garbage = cleanGarbage
exports.jsBuild = gulp.series(jsBuild)
