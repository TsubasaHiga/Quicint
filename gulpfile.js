'use strict';

/**
 *
 * 初期設定（プラグイン読み込み、webpack設定、変数、入出力設定、環境依存設定など）
 *
 */

// プラグイン読み込み.
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const connectSSI = require('connect-ssi');
const css = require('gulp-sass');
const cssnano = require('cssnano');
const cssDeclarationSorter = require('css-declaration-sorter');
const crypto = require('crypto');
const dateutils = require('date-utils');
const del = require('del');
const fileinclude = require('gulp-file-include');
const fs = require('fs');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const mqpacker = require('css-mqpacker');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const packageImporter = require('node-sass-package-importer');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const zip = require('gulp-zip');

// 環境設定ファイルの読み込み.
const env = JSON.parse(fs.readFileSync('./env.json', 'utf8'));

// webpackの設定ファイルの読み込み.
const webpackConfig = require('./webpack.config');

/**
 *
 * 以下各種タスク記述
 *
 * @description
     - 可読性維持の為、タスク間は3行改行して記述する
     - 固有設定は変数として初期設定項目に記述する
     - なるべく簡潔な記述を行いメンテナンス性を維持する
 *
 */

// console.log(env.browsersync);

// BrowserSync - tsk is sync.
gulp.task('sync', () => {
  browserSync.init(env.browsersync);
});

// BrowserSync - task is reload.
gulp.task('reload', done => {
  browserSync.reload();
  done();
});

// Clean.
gulp.task('clean', () => {
  return del(env.io.output.img + '**/*.{png,jpg,gif,svg}');
});

// Scss compile.
gulp.task('css', () => {
  return gulp
    .src(env.io.input.css + '**/*.scss')
    .pipe(
      plumber({
        errorHandler : err => {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      css({
        precision : 5,
        importer  : packageImporter({
          extensions : ['.scss', '.css']
        })
      })
    )
    .pipe(autoprefixer({}))
    .pipe(
      postcss([
        mqpacker(),
        cssnano({ autoprefixer : false }),
        cssDeclarationSorter({
          order : 'smacss'
        })
      ])
    )
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(env.io.output.css))
    .pipe(browserSync.stream());
});

// HTML minify.
gulp.task('htmlmin', () => {
  let revision = crypto.randomBytes(8).toString('hex');
  return gulp
    .src(env.io.input.html + '**/*.html')
    .pipe(fileinclude({
      prefix   : '@@',
      basepath : '@file'
    }))
    .pipe(htmlmin(env.htmlmin))
    .pipe(
      replace(/\.(js|css|gif|jpg|jpeg|png|svg)\?rev/g, '.$1?rev=' + revision)
    )
    .pipe(gulp.dest(env.io.output.html));
});

// Img compressed.
gulp.task('img', () => {
  return gulp
    .src(env.io.input.img + '**/*.{png,jpg,gif,svg}')
    .pipe(
      plumber({
        errorHandler : err => {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      })
    )
    .pipe(newer(env.io.output.img)) //srcとdistを比較して異なるものだけ処理
    .pipe(
      imagemin([
        pngquant({
          quality : [0.5, 0.9],
          speed   : 1,
          floyd   : 0
        }),
        mozjpeg({
          quality     : 85,
          dcScanOpt   : 2,
          dct         : 'float',
          progressive : true
        }),
        imagemin.svgo(),
        imagemin.optipng(),
        imagemin.gifsicle()
      ])
    )
    .pipe(gulp.dest(env.io.output.img));
});

// WebpackStream.
gulp.task('js', () => {
  return gulp
    .src(env.io.input.js + '**/*.js')
    .pipe(
      plumber({
        errorHandler : err => {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(env.io.output.js))
    .pipe(browserSync.stream());
});

// Watch files.
gulp.task('watch', () => {
  gulp.watch(env.io.input.css + '**/*.scss', gulp.task('css'));
  gulp.watch(env.io.input.img + '**/*', gulp.series('clean', 'img'));
  gulp.watch(env.io.input.js + '**/*.js', gulp.task('js'));
  gulp.watch(env.io.input.html + '**/*.html', { interval : 250 }, gulp.series('htmlmin', 'reload'));
});

/**
 *
 * タスクリスト
 *
 */

// Defalut + Sync task.
gulp.task('default', gulp.parallel('watch', 'sync'));
