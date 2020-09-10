'use strict'

// babel polyfill
import '@babel/polyfill'

// define
import DEFINE from './constant/define'
import EL from './constant/elements'

// helper
import hmb from './helper/hmb'
import uaDataset from './helper/uaDataset'
import sweetScrollInit from './helper/sweetScrollInit'
import ieSmoothScrollDisable from './helper/ieSmoothScrollDisable'
import isTouchSupport from './helper/isTouchSupport'
import navCurrent from './helper/navCurrent'
import getOrientation from './helper/getOrientation'
import getClassName from './helper/getClassName'
import getDeviceType from './helper/getDeviceType'

// plugins
import objectFitImages from 'object-fit-images'
import picturefill from 'picturefill'
import Stickyfill from 'stickyfilljs'
import { throttle, debounce } from 'throttle-debounce'

// page scripts
import pageNameTop from './page/top'
import pageName2 from './page/page2'
require('intersection-observer')

// getDeviceType
const deviceType = getDeviceType()

/**
 * getScrollPos
 */
const getScrollPos = () => {
  const y = window.pageYOffset

  // add class is-scroll
  if (y > 1) {
    if (!EL.HTML.classList.contains('is-scroll')) {
      EL.HTML.classList.add('is-scroll')
    }
  } else {
    EL.HTML.classList.remove('is-scroll')
  }
}

/**
 * firstRun
 */
const firstRun = () => {
  // set ua dataset
  uaDataset()

  // set touch support dataset
  isTouchSupport()

  // Polyfill object-fit
  objectFitImages()

  // Polyfill picturefill
  picturefill()

  // ie smoothScroll disable
  ieSmoothScrollDisable()

  // stickyfilljs
  Stickyfill.add(EL.STICKY)

  // getOrientation
  getOrientation()
}

/**
 * initRun
 */
const initRun = () => {
  // get body className
  const className = getClassName(EL.BODY)

  // add .is-loaded
  EL.HTML.classList.add('is-loaded')

  // getScrollPos
  getScrollPos()

  // navCurrent
  navCurrent(EL.NAV)

  // hmb menu
  hmb()

  // sweetScroll
  sweetScrollInit()

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
