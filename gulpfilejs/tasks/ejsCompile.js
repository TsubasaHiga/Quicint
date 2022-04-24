'use strict'

const gulp = require('gulp')
const ejs = require('gulp-ejs')
const htmlmin = require('gulp-htmlmin')
const rename = require('gulp-rename')
const gulpif = require('gulp-if')
const replace = require('gulp-replace')
const htmlbeautify = require('gulp-html-beautify')
const sizeOf = require('image-size')
const through = require('through2')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const fs = require('fs')
const crypto = require('crypto')

const browserSync = require('../modules/browserSync')

const paths = require('../constant/paths')
const setting = require(paths.setting)

const ejsCompile = () => {
  // サイト設定ファイルの読み込み.
  const siteSetting = JSON.parse(fs.readFileSync(paths.settingSite, 'utf8'))

  // ejs defineファイルの読み込み.
  const define = JSON.parse(fs.readFileSync(paths.define, 'utf8'))

  // 乱数生成
  const revision = crypto.randomBytes(8).toString('hex')

  let sitePath = siteSetting.sitePath

  if (process.env.NODE_ENV === 'development' && browserSync.active === true) {
    sitePath = browserSync.getOption('urls').get('external') + '/'
  }

  return gulp
    .src([
      setting.io.input.ejs + '**/*.ejs',
      '!' + setting.io.input.ejs + '**/_*.ejs',
    ])
    .pipe(
      ejs(
        {
          node_env: process.env.NODE_ENV,
          sitePath: sitePath,
          siteSetting: siteSetting,
          define: define,
        },
        {},
        { ext: '.html' }
      )
    )
    .pipe(rename({ extname: '.html' }))
    .pipe(
      gulpif(process.env.NODE_ENV === 'development', htmlmin(setting.htmlmin))
    )
    .pipe(
      gulpif(
        process.env.NODE_ENV === 'production',
        htmlmin(setting.htmlminProduction)
      )
    )
    .pipe(
      replace(
        /\.(js|css|gif|jpg|jpeg|png|apng|svg|mp4|webp)\?rev/g,
        '.$1?rev=' + revision
      )
    )
    .pipe(htmlbeautify(setting.htmlbeautify))
    .pipe(
      through(
        {
          objectMode: true,
        },
        (chunk, enc, cb) => {
          if (chunk.isNull()) {
            cb(null, chunk)
          } else {
            const contents = String(chunk.contents)
            let dom = new JSDOM(contents)
            let regexp = /^https?:\/\//g

            const imgs = [...dom.window.document.querySelectorAll('img')]
            for (let i = 0; i < imgs.length; i = (i + 1) | 0) {
              const img = imgs[i]

              if (!regexp.test(img.src)) {
                const imgSrc = img.src.replace(sitePath, '')
                const imgSize = sizeOf('dist/' + imgSrc)
                const imgScale =
                  typeof img.dataset.scale !== 'undefined'
                    ? img.dataset.scale
                    : 1

                img.height = imgSize.height / imgScale
                img.width = imgSize.width / imgScale

                if (typeof img.dataset.lazy !== 'undefined') {
                  img.setAttribute('loading', 'lazy')
                }
              }
            }

            dom = dom.serialize()
            chunk.contents = Buffer.from(dom)
          }
          cb(null, chunk)
        }
      )
    )
    .pipe(gulp.dest(setting.io.output.root))
}

module.exports = ejsCompile
