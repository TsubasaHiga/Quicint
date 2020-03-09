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

// plugins
import objectFitImages from 'object-fit-images'
import Stickyfill from 'stickyfilljs'
import lazysizes from 'lazysizes'
import { throttle, debounce } from 'throttle-debounce'
import 'nodelist-foreach-polyfill'
import 'instant.page'

// page scripts
import pageNameTop from './page/top'

/**
 * DOMCONTENTLOADED
 */
window.addEventListener('DOMContentLoaded', () => {
  // set ua dataset
  uaDataset()

  // set touch support dataset
  isTouchSupport()

  // closet polyfill.
  closetPolyfill()

  // Polyfill object-fit
  objectFitImages()

  // ie smoothScroll disable
  ieSmoothScrollDisable()

  // stickyfilljs
  Stickyfill.add(EL.STICKY)

  // getOrientation
  getOrientation()
})

/**
 * LOAD
 */
window.addEventListener('load', () => {
  EL.HTML.classList.add('is-loaded')

  // hmb menu
  hmb()

  // navCurrent
  navCurrent(EL.NAV)

  // sweetScroll
  sweetScrollInit()

  // top
  if (DEFINE.BODYCLASS.match(/top/g)) {
    pageNameTop()
  }
})

/**
 * SCROLL
 */
window.addEventListener(
  'scroll',
  throttle(300, () => {
    const y = window.pageYOffset
    const documentH = getDocumentH()

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
  })
)
