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
import pageAnimation from './helper/pageAnimation'

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
 * bfcache対策
 */
window.addEventListener('pageshow', e => {
  if (e.persisted) {
    // ページ遷移後の`.is-page-leave-animation`クラスを削除
    EL.HTML.classList.remove('is-page-leave-animation')
  }
})

/**
 * LOAD
 */
window.addEventListener('load', () => {
  EL.HTML.classList.add('is-loaded')

  // pageAnimation
  pageAnimation()

  // hmb menu
  hmb()

  // navCurrent
  navCurrent(EL.NAV)

  // sweetScroll
  sweetScrollInit()

  // top
  if (DEFINE.BODYCLASS.endsWith('top')) {
    pageNameTop()
  }
})

/**
 * SCROLL
 */
window.addEventListener(
  'scroll',
  throttle(150, () => {
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
