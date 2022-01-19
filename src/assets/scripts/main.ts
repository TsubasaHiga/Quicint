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
import GetDocumentH from './utils/getDocumentHeight'
import GetTouchSupport from './utils/getTouchSupport'
import GetUadata from './utils/getUaData'
import Set100vh from './utils/set100vh'
import SetOrientation from './utils/setOrientation'

// require
require('intersection-observer')
require('focus-visible')

// clientData
let clientData: UaType
// className
let className = ''
// lastInnerWidth
let lastInnerWidth = window.innerWidth
// innerHeight
let innerHeight = window.innerHeight

const setUadata = () => {
  // get uadata
  clientData = GetUadata()
  clientData.touchSupport = GetTouchSupport()

  // uaのオブジェクトのHTML出力
  Object.entries(clientData).forEach(([key, value]) => {
    EL.HTML.dataset[key.toLowerCase()] =
      typeof value === 'boolean' ? value.toString() : value
  })
}

const onScroll = () => {
  const y = Math.round(window.pageYOffset)
  const offset = className === 'top' ? innerHeight : 200
  const documentH = GetDocumentH()

  // add class is-scroll
  if (y > offset) {
    if (!EL.HTML.classList.contains('is-scroll'))
      EL.HTML.classList.add('is-scroll')
  } else {
    EL.HTML.classList.remove('is-scroll')
  }

  // add class is-footer
  if (documentH <= y) {
    if (!EL.HTML.classList.contains('is-footer'))
      EL.HTML.classList.add('is-footer')
  } else {
    EL.HTML.classList.remove('is-footer')
  }
}

const onResize = () => {
  // uaデータの更新
  setUadata()

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

const firstRun = () => {
  // uaデータの更新
  setUadata()

  // orientationの更新
  new SetOrientation()

  // ie smoothScroll disable
  DisableIeSmoothScroll(true)

  // Polyfill
  objectFitImages('img')
  picturefill()

  Set100vh()
  Set100vh('--vh-always')
}

const initOnce = () => {
  SweetScrollInit()
  NavCurrent()
  SmoothScroll(false, clientData)
  HmbMenu()
}

const initRun = () => {
  Set100vh()
  Set100vh('--vh-always')

  // get body className
  className = GetClassName(EL.BODY)

  // Stickyfill
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll('.sticky')
  Stickyfill.add(elements)

  // onScroll
  onScroll()

  // addAnimationClass
  const animationTargets: NodeListOf<HTMLElement> =
    document.querySelectorAll('.c-animation')
  if (animationTargets) AddAnimationClass(animationTargets)

  // top
  if (className.endsWith('top')) PageTop()

  EL.HTML.classList.add('is-loaded')
}

// addEventListeners
window.addEventListener('DOMContentLoaded', firstRun)
window.addEventListener('load', initOnce)
window.addEventListener('load', initRun)
window.addEventListener('scroll', throttle(100, onScroll), false)
window.addEventListener('resize', debounce(100, onResize), false)
