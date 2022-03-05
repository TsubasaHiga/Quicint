import 'core-js/stable'

import objectFitImages from 'object-fit-images'
import picturefill from 'picturefill'
import Stickyfill from 'stickyfilljs'
import { debounce, throttle } from 'throttle-debounce'

import EL from './constant/elements'
import AddAnimationClass from './modules/AddAnimationClass'
import AddUaData from './modules/AddUaData'
import DetailsToggle from './modules/DetailsToggle'
import HmbMenu from './modules/HmbMenu'
import Linker from './modules/Linker'
import Modal from './modules/Modal'
import NavCurrent from './modules/NavCurrent'
import SmoothScroll from './modules/SmoothScroll'
import SweetScrollInit from './modules/SweetScrollInit'
import PageTop from './pages/PageTop'
import GetClassName from './utils/getClassName'
import GetDocumentH from './utils/getDocumentHeight'
import Set100vh from './utils/set100vh'
import SetOrientation from './utils/setOrientation'

// require
require('intersection-observer')
require('focus-visible')

const onDOMContentLoaded = () => {
  // AddUaData
  new AddUaData()

  // Polyfill
  objectFitImages('img')
  picturefill()
  Stickyfill.add(document.querySelectorAll('.sticky'))
}

const onLoad = () => {
  Set100vh()
  Set100vh('--vh-always')

  // SetOrientation
  new SetOrientation()

  // SweetScrollInit
  new SweetScrollInit()

  // NavCurrent
  new NavCurrent()

  // SmoothScroll
  new SmoothScroll(false)

  // HmbMenu
  new HmbMenu()

  // modal
  new Modal()

  // DetailsToggle
  new DetailsToggle()

  // Linker
  new Linker()

  // addAnimationClass
  new AddAnimationClass()

  // onScroll
  onScroll()

  // get body className
  const className = GetClassName(document.body)

  // top
  if (className.endsWith('top')) PageTop()

  EL.HTML.classList.add('is-loaded')
}

const onScroll = () => {
  const y = Math.round(window.pageYOffset)

  // add className is-scroll
  y > 0
    ? EL.HTML.classList.add('is-scroll')
    : EL.HTML.classList.remove('is-scroll')

  // add className is-footer
  GetDocumentH() <= y
    ? EL.HTML.classList.add('is-footer')
    : EL.HTML.classList.remove('is-footer')
}

let oldInnerWidth = window.innerWidth
const onResize = () => {
  Set100vh('--vh-always')

  // window幅が変わった時
  if (oldInnerWidth !== window.innerWidth) {
    Set100vh()
    oldInnerWidth = window.innerWidth
  }
}

// addEventListeners
window.addEventListener('DOMContentLoaded', onDOMContentLoaded)
window.addEventListener('load', onLoad)
window.addEventListener('scroll', throttle(100, onScroll), false)
window.addEventListener('resize', debounce(100, onResize), false)
