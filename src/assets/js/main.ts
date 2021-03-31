'use strict'

// babel polyfill
import 'core-js/stable'

// define
import EL from './constant/elements'

// helper
import hmb from './helper/hmb'
import uaDataset from './helper/uaDataset'
import sweetScrollInit from './helper/sweetScrollInit'
import ieSmoothScrollDisable from './helper/ieSmoothScrollDisable'
import getTouchSupport from './helper/getTouchSupport'
import navCurrent from './helper/navCurrent'
import getDocumentH from './helper/getDocumentHeight'
import getOrientation from './helper/getOrientation'
import getClassName from './helper/getClassName'
import addAnimationClass from './helper/addAnimationClass'
import set100vh from './helper/set100vh'
import smoothScroll from './helper/smoothScroll'
import getDeviceType from './helper/getDeviceType'

// plugins
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'obje... Remove this comment to see the full error message
import objectFitImages from 'object-fit-images'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'pict... Remove this comment to see the full error message
import picturefill from 'picturefill'
import Stickyfill from 'stickyfilljs'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'thro... Remove this comment to see the full error message
import { throttle, debounce } from 'throttle-debounce'

// swup plugins
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'swup... Remove this comment to see the full error message
import Swup from 'swup'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@swu... Remove this comment to see the full error message
import SwupBodyClassPlugin from '@swup/body-class-plugin'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@swu... Remove this comment to see the full error message
import SwupHeadPlugin from '@swup/head-plugin'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@swu... Remove this comment to see the full error message
import SwupPreloadPlugin from '@swup/preload-plugin'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@swu... Remove this comment to see the full error message
import SwupFadeTheme from '@swup/fade-theme'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@swu... Remove this comment to see the full error message
import SwupGaPlugin from '@swup/ga-plugin'

// page scripts
import pageNameTop from './page/top'

// require
require('intersection-observer')
require('focus-visible')

// swup
let swup = null

// ua
let ua = null

// className
let className = null

// lastInnerWidth
let lastInnerWidth = window.innerWidth

// innerHeight
let innerHeight = window.innerHeight

// isPopStateEvent
let isPopStateEvent = false

/**
 * getScrollPos
 */
const getScrollPos = () => {
  const y = Math.round(window.pageYOffset)
  const offset = className === 'top' ? innerHeight : 200
  const documentH = getDocumentH()

  // add class is-scroll
  if (y > offset) {
    if (!EL.HTML.classList.contains('is-scroll')) {
      EL.HTML.classList.add('is-scroll')
    }
  } else {
    EL.HTML.classList.remove('is-scroll')
  }

  // add class is-footer
  if (documentH <= y) {
    if (!EL.HTML.classList.contains('is-footer')) {
      EL.HTML.classList.add('is-footer')
    }
  } else {
    EL.HTML.classList.remove('is-footer')
  }
}

/**
 * resize
 */
const resize = () => {
  // set100vh（常に更新）
  set100vh('--vh-always')

  // window高さが高くなった時
  if (window.innerHeight > innerHeight) {
    set100vh('--vh-max')
  }

  // window幅が変わった時
  if (lastInnerWidth !== window.innerWidth) {
    lastInnerWidth = window.innerWidth

    // set100vh
    set100vh()
  }

  innerHeight = window.innerHeight
}

/**
 * swupInit
 * @param {boolean} state
 */
const swupInit = state => {
  if (!state) {
    return
  }

  const swupConfig = {
    containers: ['main', '.pjax-replace'],
    linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]):not([target="_blank"]), a[href^="/"]:not([data-no-swup]):not([target="_blank"]), a[href^="#"]:not([data-no-swup]):not([target="_blank"])`,
    plugins: [
      new SwupBodyClassPlugin(),
      new SwupHeadPlugin(),
      new SwupPreloadPlugin(),
      new SwupFadeTheme({
        mainElement: ['main', '.pjax-replace']
      })
      // new SwupGaPlugin()
    ],
    // cache: false,
    animateHistoryBrowsing: true
  }

  // ie以外でswup実行
  if (ua.browserName !== 'ie') swup = new Swup(swupConfig)
}

/**
 * swupSetup
 */
const swupSetup = () => {
  if (swup) {
    swup.on('contentReplaced', () => {
      console.log('swup -> contentReplaced')
      // if (typeof window.ga !== 'undefined') {
      //   window.ga('set', 'title', document.title)
      //   window.ga('set', 'page', window.location.pathname + window.location.search)
      //   window.ga('send', 'pageview')
      // }
      initRun()
    })
    swup.on('popState', () => {
      console.log('swup -> popState')
      // console.log(isPopStateEvent)
      isPopStateEvent = true
    })
    swup.on('transitionStart', () => {
      console.log('swup -> transitionStart')
    })
  }
}

/**
 * firstRun
 */
const firstRun = () => {
  // set ua dataset
  ua = uaDataset()

  // set touch support dataset
  ua.touchsupport = getTouchSupport()

  // swup init
  // If not used, set to `false`
  swupInit(true)

  // swup Setup
  swupSetup()

  // getOrientation
  getOrientation()

  // ie smoothScroll disable
  ieSmoothScrollDisable(true)

  // Polyfill object-fit
  objectFitImages()

  // Polyfill picturefill
  picturefill()

  if (getDeviceType() === 'lg') {
    EL.NAV.style.visibility = ''
  }

  // set100vh
  set100vh()

  // set100vh（常に更新）
  set100vh('--vh-always')
}

/**
 * initOnce
 */
const initOnce = () => {
  // sweetScroll
  sweetScrollInit(swup)

  // navCurrent
  navCurrent(swup)

  // smoothScroll
  smoothScroll(ua)

  // hmb menu
  hmb(swup)
}

/**
 * initRun
 */
const initRun = () => {
  // set100vh
  set100vh()

  // set100vh（常に更新）
  set100vh('--vh-always')

  // get body className
  className = getClassName(EL.BODY)

  // stickyfilljs
  Stickyfill.add(EL.STICKY)

  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'NodeListOf<Element>' is not assi... Remove this comment to see the full error message
  // getScrollPos
  getScrollPos()

  // addAnimationClass
  const animations = document.querySelectorAll('.c-animation')
  if (animations) addAnimationClass(animations)

  // top
  if (className.endsWith('top')) pageNameTop(swup)

  EL.HTML.classList.add('is-loaded')
}

/**
 * DOMCONTENTLOADED
 */
window.addEventListener('DOMContentLoaded', firstRun)

/**
 * LOAD
 */
window.addEventListener('load', initOnce)
window.addEventListener('load', initRun)

/**
 * SCROLL
 */
window.addEventListener('scroll', throttle(100, getScrollPos), false)

/**
 * RESIZE
 */
window.addEventListener('resize', debounce(50, resize), false)
