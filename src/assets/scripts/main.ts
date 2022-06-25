import { debounce, throttle } from 'throttle-debounce'

import AddAnimationClass from './modules/AddAnimationClass'
import AddUaData from './modules/AddUaData'
import DetailsToggle from './modules/DetailsToggle'
import HmbMenu from './modules/HmbMenu'
import Linker from './modules/Linker'
import SmoothScroll from './modules/SmoothScroll'
import SweetScrollInit from './modules/SweetScrollInit'
import PageExample from './pages/example'
import PageTop from './pages/top'
import GetClassNames from './utils/getClassNames'
import GetDocumentH from './utils/getDocumentHeight'
import Set100vh from './utils/set100vh'
import SetOrientation from './utils/setOrientation'

const onDOMContentLoaded = () => {
  // AddUaData
  new AddUaData()
}

const onLoad = () => {
  Set100vh()
  Set100vh('--vh-always')

  // SetOrientation
  new SetOrientation()

  // SweetScrollInit
  new SweetScrollInit()

  // SmoothScroll
  new SmoothScroll(false)

  // HmbMenu
  new HmbMenu()

  // DetailsToggle
  new DetailsToggle()

  // Linker
  new Linker()

  // addAnimationClass
  new AddAnimationClass({
    lg: '-0% 0px',
    sm: '-0% 0px',
  })

  // onScroll
  onScroll()

  // get body className
  const className = GetClassNames(document.body)

  // example // TODO 不使用時は削除してください
  if (className.includes('example')) PageExample()

  // top
  if (className.includes('top')) PageTop()

  document.documentElement.classList.add('is-loaded')
}

const onScroll = () => {
  const y = Math.round(window.scrollY || window.pageYOffset)

  // add className is-scroll
  y > 0
    ? document.documentElement.classList.add('is-scroll')
    : document.documentElement.classList.remove('is-scroll')

  // add className is-footer
  GetDocumentH() <= y
    ? document.documentElement.classList.add('is-footer')
    : document.documentElement.classList.remove('is-footer')
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
