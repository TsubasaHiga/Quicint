'use strict'

/**
 *
 * 初期設定（プラグイン読み込み、webpack設定、変数、入出力設定、環境依存設定など）
 *
 */

// プラグイン読み込み
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
const css = require('gulp-sass')
const cssnano = require('cssnano')
const cssDeclarationSorter = require('css-declaration-sorter')
const colors = require('colors')
const crypto = require('crypto')
const dateutils = require('date-utils')
const del = require('del')
const ejs = require('gulp-ejs')
const figlet = require('figlet')
const fs = require('fs')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const htmlbeautify = require('gulp-html-beautify')
const imagemin = require('gulp-imagemin')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const jsonlint = require('gulp-jsonlint')
const mozjpeg = require('imagemin-mozjpeg')
const mqpacker = require('css-mqpacker')
const newer = require('gulp-newer')
const notify = require('gulp-notify')
const packageImporter = require('node-sass-package-importer')
const path = require('path')
const plumber = require('gulp-plumber')
const pngquant = require('imagemin-pngquant')
const postcss = require('gulp-postcss')
const replace = require('gulp-replace')
const rename = require('gulp-rename')
const sizeOf = require('image-size')
const through = require('through2')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const zip = require('gulp-zip')

// ファイル存在判定
const isExistFile = file => {
  try {
    fs.statSync(file)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
  }
}

// 環境設定ファイルの読み込み
const setting = isExistFile('./setting.json')
  ? JSON.parse(fs.readFileSync('./setting.json', 'utf8'))
  : ''

// webpackの設定ファイルの読み込み
const webpackConfig = require('./webpack.config')
const webpackConfigBuild = require('./webpack.production.config')

// json file check task
const jsoncFileCeck = cb => {
  // サイト設定ファイルの読み込み.
  const siteSetting = isExistFile('./setting-site.json')
    ? JSON.parse(fs.readFileSync('./setting-site.json', 'utf8'))
    : ''

  // ejs defineファイルの読み込み.
  const define = isExistFile('./define.json')
    ? JSON.parse(fs.readFileSync('./define.json', 'utf8'))
    : ''

  if (setting && siteSetting && define) {
    gulp
      .src([setting.io.setting, setting.io.siteSetting, setting.io.define])
      .pipe(jsonlint())
      .pipe(jsonlint.reporter())

    figlet('QUICINT', (err, data) => {
      if (err) {
        console.dir(err)
        return
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
  }

  cb()
}

// BrowserSync - sync
const sync = () => browserSync.init(setting.browsersync)

// BrowserSync - reload
const reload = cb => {
  browserSync.reload()
  cb()
}

// CleanImg
const cleanImg = () => {
  return del(setting.io.output.img + '**/*.{png,apng,jpg,gif,svg}')
}

// CleanEjs
const cleanEjs = () => {
  return del(setting.io.output.html + '**/*.html')
}

// Scss compile
const scss = () => {
  return gulp
    .src(
      setting.io.input.css + '**/*.scss', {
        sourcemaps: true
      }
    )
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err.messageFormatted)
          this.emit('end')
        }
      })
    )
    .pipe(
      css({
        precision: 5,
        importer: packageImporter({
          extensions: ['.scss', '.css']
        })
      })
    )
    .pipe(autoprefixer({}))
    .pipe(
      postcss([
        mqpacker(),
        cssnano({ autoprefixer: false }),
        cssDeclarationSorter({
          order: 'smacss'
        })
      ])
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'development',
        gulp.dest(setting.io.output.css, {
          sourcemaps: '/maps'
        })
      )
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'production',
        gulp.dest(setting.io.output.css)
      )
    )
    .pipe(gulpif(browserSync.active === true, browserSync.stream()))
}

// EJS
const ejsCompile = (mode = false) => {
  // サイト設定ファイルの読み込み.
  const siteSetting = JSON.parse(fs.readFileSync('./setting-site.json', 'utf8'))

  // ejs defineファイルの読み込み.
  const define = JSON.parse(fs.readFileSync('./define.json', 'utf8'))

  // 乱数生成
  const revision = crypto.randomBytes(8).toString('hex')

  let url = ''

  if (process.env.NODE_ENV === 'production') {
    if (mode !== 'fullpath') {
      url = '/'
    } else {
      url = siteSetting.siteDomain + '/'
    }
  } else if (browserSync.active === true) {
    url = browserSync.getOption('urls').get('external') + '/'
  } else {
    url = '/'
  }

  return gulp
    .src([setting.io.input.ejs + '**/*.ejs', '!' + setting.io.input.ejs + '**/_*.ejs'])
    .pipe(
      ejs(
        {
          node_env: process.env.NODE_ENV,
          siteurl: url,
          siteSetting: siteSetting,
          define: define
        },
        {},
        { ext: '.html' }
      )
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(gulpif(process.env.NODE_ENV === 'development', htmlmin(setting.htmlmin)))
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'production',
        htmlmin(setting.htmlminProduction)
      )
    )
    .pipe(
      replace(/\.(js|css|gif|jpg|jpeg|png|apng|svg)\?rev/g, '.$1?rev=' + revision)
    )
    .pipe(htmlbeautify(setting.htmlbeautify))
    .pipe(through(
      {
        objectMode: true
      },
      (chunk, enc, cb) => {
        if (chunk.isNull()) {
          cb(null, chunk)
        } else {
          const contents = String(chunk.contents)
          let dom = new JSDOM(contents)

          const imgs = [...dom.window.document.querySelectorAll('img')]
          for (let i = 0; i < imgs.length; i = (i + 1) | 0) {
            const img = imgs[i]
            const imgSrc = img.src.replace(url, '')
            const imgSize = sizeOf('dist/' + imgSrc)
            if (imgSize.type !== 'svg') {
              img.height = imgSize.height
              img.width = imgSize.width
              img.setAttribute('loading', 'lazy')
            }
          }

          dom = dom.serialize()
          chunk.contents = Buffer.from(dom)
        }
        cb(null, chunk)
      }))
    .pipe(gulp.dest(setting.io.output.html))
}

// Img compressed
const img = () => {
  return gulp
    .src(setting.io.input.img + '**/*.{png,apng,jpg,gif,svg}')
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err.messageFormatted)
          this.emit('end')
        }
      })
    )
    .pipe(newer(setting.io.output.img)) // srcとdistを比較して異なるものだけ処理
    .pipe(
      imagemin([
        pngquant(setting.pngquant),
        mozjpeg(setting.mozjpeg),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
      ])
    )
    .pipe(gulp.dest(setting.io.output.img))
}

// WebpackStream
const js = () => {
  return gulp
    .src(setting.io.input.js + '**/*.js')
    .pipe(
      plumber({
        errorHandler: err => {
          console.log(err.messageFormatted)
          this.emit('end')
        }
      })
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'development',
        webpackStream(webpackConfig, webpack)
      )
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'production',
        webpackStream(webpackConfigBuild, webpack)
      )
    )
    .pipe(gulp.dest(setting.io.output.js))
}

// Watch files
const watch = () => {
  gulp.watch(setting.io.input.css + '**/*.scss', scss)
  gulp.watch(setting.io.input.img + '**/*', img)
  gulp.watch(setting.io.input.js + '**/*.js', gulp.series(js, ejsCompile, reload))
  gulp.watch(setting.io.input.ejs + '**/*.ejs', { interval: 250 }, gulp.series(ejsCompile, reload))
}

// 納品ディレクトリ作成
const genDir = (dirname, type) => {
  dirname = typeof dirname !== 'undefined' ? dirname : 'publish_data'

  const distname = 'dist'
  const userHome = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME']
  const publishDir = path.join(userHome, setting.publishDir)

  if (type === 'zip') {
    return gulp
      .src([
        distname + '/**/*',
        '!' + distname + '/**/maps',
        '!' + distname + '/**/*.map',
        '!' + distname + '/**/*.DS_Store',
        '!' + distname + '/**/*.LICENSE',
        '!' + distname + '/**/*Thumbs.db'
      ])
      .pipe(zip(dirname + '.zip'))
      .pipe(gulp.dest(publishDir))
      .pipe(
        notify({
          title: '納品データをZIP化しました 🗜',
          message: '出力先：' + publishDir + '/' + dirname + '.zip'
        })
      )
  } else {
    return gulp
      .src([
        distname + '/**/*',
        '!' + distname + '/**/maps',
        '!' + distname + '/**/*.map',
        '!' + distname + '/**/*.DS_Store',
        '!' + distname + '/**/*.LICENSE',
        '!' + distname + '/**/*Thumbs.db'
      ])
      .pipe(gulp.dest(dirname))
  }
}

// 書き出しタスク（production）
const genPublishDir = cb => {
  const dirname = 'dist-production'
  genDir(dirname, 'publish')
  cb()
}

// 書き出しタスク（production full path）
const genPublishFullPathDir = cb => {
  const dirname = 'dist-production-fullpath'
  genDir(dirname, 'publish-fullpath')
  cb()
}

// 書き出しタスク（production full path）EJSコンパイル呼び出し
const ejsCompileFullPath = cb => {
  ejsCompile('fullpath')
  cb()
}

// 納品タスク
const genZipArchive = cb => {
  // サイト設定ファイルの読み込み.
  const siteSetting = JSON.parse(fs.readFileSync('./setting-site.json', 'utf8'))

  // 納品ファイル作成
  const dt = new Date()
  const date = dt.toFormat('YYMMDD-HHMI')
  const dirname = 'publish__' + date + '__' + siteSetting.publishFileName
  genDir(dirname, 'zip')
  cb()
}

exports.default = gulp.series(jsoncFileCeck, gulp.parallel(watch, sync))

exports.development = gulp.series(jsoncFileCeck, scss, cleanImg, img, ejsCompile, js)
exports.developmentRestore = gulp.series(jsoncFileCeck, ejsCompile, js)

exports.production = gulp.series(jsoncFileCeck, scss, cleanImg, img, ejsCompile, js, genPublishDir)
exports.productionFullpath = gulp.series(jsoncFileCeck, scss, cleanImg, img, ejsCompileFullPath, js, genPublishFullPathDir)

exports.checkJson = jsoncFileCeck
exports.zip = gulp.series(jsoncFileCeck, scss, cleanImg, img, ejsCompile, js, genZipArchive)
exports.resetImg = gulp.series(cleanImg, img)
exports.resetEjs = gulp.series(cleanEjs, ejsCompile)
