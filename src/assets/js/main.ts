import 'core-js/stable'

import objectFitImages from 'object-fit-images'
import picturefill from 'picturefill'
import Stickyfill from 'stickyfilljs'
import { debounce, throttle } from 'throttle-debounce'

import EL from './constant/elements'
import AddAnimationClass from './modules/AddAnimationClass'
import DisableIeSmoothScroll from './modules/DisableIeSmoothScroll'
import HmbMenu from './modules/HmbMenu'
import NavCurrent from './modules/NavCurrent'
import SmoothScroll from './modules/SmoothScroll'
import SweetScrollInit from './modules/SweetScrollInit'
import PageTop from './pages/PageTop'
import UaType from './types/UaType'
import GetClassName from './utils/getClassName'
import GetDeviceType from './utils/getDeviceType'
import GetDocumentH from './utils/getDocumentHeight'
import GetTouchSupport from './utils/getTouchSupport'
import GetUadata from './utils/getUaData'
import Set100vh from './utils/set100vh'
import SetOrientation from './utils/setOrientation'

// require
require('intersection-observer')
require('focus-visible')

// ua
let ua: UaType

// className
let className = ''

// lastInnerWidth
let lastInnerWidth = window.innerWidth

// innerHeight
let innerHeight = window.innerHeight

/**
 * getScrollPos
 */
const getScrollPos = () => {
  const y = Math.round(window.pageYOffset)
  const offset = className === 'top' ? innerHeight : 200
  const documentH = GetDocumentH()

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
  Set100vh('--vh-always')

  // window高さが高くなった時
  if (window.innerHeight > innerHeight) {
    Set100vh('--vh-max')
  }

  // window幅が変わった時
  if (lastInnerWidth !== window.innerWidth) {
    lastInnerWidth = window.innerWidth
    Set100vh()
  }

  innerHeight = window.innerHeight
}

/**
 * firstRun
 */
const firstRun = () => {
  // get uadata
  ua = GetUadata()
  ua.touchsupport = GetTouchSupport()

  // setOrientation
  SetOrientation()

  // ie smoothScroll disable
  DisableIeSmoothScroll(true)

  // Polyfill
  objectFitImages('img')
  picturefill()

  if (GetDeviceType() === 'lg') {
    EL.NAV.style.visibility = ''
  }

  // uaのオブジェクトのHTML出力
  Object.entries(ua).forEach(([key, value]) => {
    EL.HTML.dataset[key.toLowerCase()] =
      typeof value === 'boolean' ? value.toString() : value
  })

  Set100vh()
  Set100vh('--vh-always')
}

/**
 * initOnce
 */
const initOnce = () => {
  SweetScrollInit()
  NavCurrent()
  SmoothScroll(false, ua)
  HmbMenu()
}

/**
 * initRun
 */
const initRun = () => {
  Set100vh()
  Set100vh('--vh-always')

  // get body className
  className = GetClassName(EL.BODY)

  // stickyfilljs
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.sticky')
  Stickyfill.add(elements)

  // getScrollPos
  getScrollPos()

  // addAnimationClass
  const animationTargets: NodeListOf<HTMLElement> =
    document.querySelectorAll('.c-animation')
  if (animationTargets) {
    AddAnimationClass(animationTargets)
  }

  // top
  if (className.endsWith('top')) {
    PageTop()
  }

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

/**
 * ORIENTATIONCHANGE
 */
window.addEventListener(
  'orientationchange',
  debounce(150, SetOrientation),
  false
)
