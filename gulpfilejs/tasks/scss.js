'use strict'

const gulp = require('gulp')
const cssnano = require('cssnano')
const cssDeclarationSorter = require('css-declaration-sorter')
const autoprefixer = require('autoprefixer')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const postcssEasingGradients = require('postcss-easing-gradients')
const mqpacker = require('css-mqpacker')
const gulpif = require('gulp-if')
const Fiber = require('fibers')

const browserSync = require('../modules/browserSync')

const paths = require('../constant/paths')
const setting = require(paths.setting)

// sass.compiler = require('sass')

const scss = () => {
  return gulp
    .src(setting.io.input.styles + '**/*.scss', { sourcemaps: true })
    .pipe(
      sass({ fiber: Fiber, outputStyle: 'compressed' }).on(
        'error',
        sass.logError
      )
    )
    .pipe(
      postcss([
        autoprefixer({ grid: true }),
        postcssEasingGradients(),
        mqpacker(),
        cssnano({ autoprefixer: false }),
        cssDeclarationSorter({ order: 'smacss' }),
      ])
    )
    .pipe(gulp.dest(setting.io.output.styles, { sourcemaps: '/maps' }))
    .pipe(gulpif(browserSync.active === true, browserSync.stream()))
}

module.exports = scss
