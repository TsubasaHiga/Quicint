'use strict';

/**
 *
 * 初期設定（プラグイン読み込み、webpack設定、変数、入出力設定など）
 *
 */

// Load plugins.
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const css = require('gulp-sass');
const cssnano = require('cssnano');
const cssDeclarationSorter = require('css-declaration-sorter');
const crypto = require('crypto');
const dateutils = require('date-utils');
const del = require('del');
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

// webpackの設定ファイルの読み込み.
const webpackConfig = require('./webpack.config');

// BrowserSyncの設定.
const browsersync = {
  browser : 'google chrome',
  open    : 'local'
};

// 入出力設定.
const input = {
  css  : 'src/assets/css/',
  img  : 'src/assets/images/',
  js   : 'src/assets/js/',
  html : 'src/'
};
const output = {
  css  : 'dist/assets/css/',
  img  : 'dist/assets/images/',
  js   : 'dist/assets/js/',
  html : 'dist/'
};

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

// BrowserSync - tsk is sync.
gulp.task('sync', () => {
  browserSync.init({
    browser : browsersync.browser,
    server  : {
      baseDir : './dist'
    },
    notify    : false,
    open      : browsersync.open,
    ghostMode : {
      clicks : false,
      forms  : false,
      scroll : false
    },
    reloadOnRestart : true
  });
});

// BrowserSync - task is reload.
gulp.task('reload', done => {
  browserSync.reload();
  done();
});

// Clean.
gulp.task('clean', () => {
  return del(output.img + '**/*.{png,jpg,gif,svg}');
});

// Scss compile.
gulp.task('css', () => {
  return gulp
    .src(input.css + '**/*.scss')
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
    .pipe(gulp.dest(output.css))
    .pipe(browserSync.stream());
});

// HTML minify.
gulp.task('htmlmin', () => {
  let revision = crypto.randomBytes(8).toString('hex');
  return gulp
    .src(input.html + '**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace : true,
        removeComments     : true
      })
    )
    .pipe(
      replace(/\.(js|css|gif|jpg|jpeg|png|svg)\?rev/g, '.$1?rev=' + revision)
    )
    .pipe(gulp.dest(output.html));
});

// Img compressed.
gulp.task('img', () => {
  return gulp
    .src(input.img + '**/*.{png,jpg,gif,svg}')
    .pipe(
      plumber({
        errorHandler : err => {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      })
    )
    .pipe(newer(output.img)) //srcとdistを比較して異なるものだけ処理
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
    .pipe(gulp.dest(output.img));
});

// WebpackStream.
gulp.task('js', () => {
  return gulp
    .src(input.js + '**/*.js')
    .pipe(
      plumber({
        errorHandler : err => {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(output.js))
    .pipe(browserSync.stream());
});

// Watch files.
gulp.task('watch', () => {
  gulp.watch(input.css + '**/*.scss', gulp.task('css'));
  gulp.watch(input.img + '**/*', gulp.series('clean', 'img'));
  gulp.watch(input.js + '**/*.js', gulp.task('js'));
  gulp.watch(input.html + '**/*.html', { interval : 250 }, gulp.series('htmlmin', 'reload'));
});

// Defalut + Sync task.
gulp.task('default', gulp.parallel('watch', 'sync'));
