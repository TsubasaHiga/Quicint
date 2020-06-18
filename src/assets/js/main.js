'use strict'

// babel polyfill
import '@babel/polyfill'

// define
import DEFINE from './constant/define'
import EL from './constant/elements'

// helper
import closetPolyfill from './helper/polyfillCloset'
import hmb from './helper/hmb'
import uaDataset from './helper/uaDataset'
import sweetScrollInit from './helper/sweetScrollInit'
import getDocumentH from './helper/getDocumentHeight'
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
import 'nodelist-foreach-polyfill'

// page scripts
import pageNameTop from './page/top'
import pageName2 from './page/page2'

// getDeviceType
let deviceType = getDeviceType()

// getDocumentH
let documentH = getDocumentH()

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
 * first
 */
const first = () => {
  // set ua dataset
  uaDataset()

  // set touch support dataset
  isTouchSupport()

  // closet polyfill.
  closetPolyfill()

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

  // hmb menu
  hmb()

  // sweetScroll
  sweetScrollInit()
}

/**
 * init
 */
const init = () => {
  // get body className
  const className = getClassName(EL.BODY)

  // add .is-loaded
  EL.HTML.classList.add('is-loaded')

  // getScrollPos
  getScrollPos()

  // navCurrent
  navCurrent(EL.NAV)

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
window.addEventListener('DOMContentLoaded', first)

/**
 * LOAD
 */
window.addEventListener('load', init)

/**
 * SCROLL
 */
window.addEventListener('scroll', throttle(150, getScrollPos), false)

/**
 * RESIZE
 */
window.addEventListener('resize',
  debounce(150, () => {
    // LGとSMで切り替わる時
    if (deviceType !== getDeviceType()) {
      deviceType = getDeviceType()

      // documentH更新
      documentH = getDocumentH()
    }
  }),
  false
)
