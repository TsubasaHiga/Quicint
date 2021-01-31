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

// plugins
import objectFitImages from 'object-fit-images'
import picturefill from 'picturefill'
import Stickyfill from 'stickyfilljs'
import { throttle, debounce } from 'throttle-debounce'

// page scripts
import pageNameTop from './page/top'
import pageName2 from './page/page2'

// require
require('intersection-observer')
require('focus-visible')

/**
 * getScrollPos
 */
const getScrollPos = () => {
  const y = window.pageYOffset
  const offset = 200
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
 * firstRun
 */
const firstRun = () => {
  // set ua dataset
  uaDataset()

  // set touch support dataset
  getTouchSupport()

  // getOrientation
  getOrientation()

  // ie smoothScroll disable
  ieSmoothScrollDisable(true)

  // Polyfill object-fit
  objectFitImages()

  // Polyfill picturefill
  picturefill()
}

/**
 * initRun
 */
const initRun = () => {
  // get body className
  const className = getClassName(EL.BODY)

  // add .is-loaded
  EL.HTML.classList.add('is-loaded')

  // stickyfilljs
  Stickyfill.add(EL.STICKY)

  // set100vh
  set100vh()
  set100vh(true)

  // getScrollPos
  getScrollPos()

  // navCurrent
  navCurrent(EL.NAV)

  // hmb menu
  hmb()

  // sweetScroll
  sweetScrollInit()

  // addAnimationClass
  if (EL.ANIMATIONS) {
    addAnimationClass(EL.ANIMATIONS, '-20% 0px')
  }

  // top
  if (className.endsWith('top')) {
    pageNameTop()
  }

  // page2
  if (className.endsWith('page2')) {
    pageName2()
  }
}

/**
 * DOMCONTENTLOADED
 */
window.addEventListener('DOMContentLoaded', firstRun)

/**
 * LOAD
 */
window.addEventListener('load', initRun)

/**
 * SCROLL
 */
window.addEventListener('scroll', throttle(150, getScrollPos), false)
