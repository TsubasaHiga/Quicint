'use strict'

import EL from '../constant/elements'
import { throttle, debounce } from 'throttle-debounce'

/**
 * ハンバーガーメニューの処理を行います
 */
export default () => {
  const func = {
    isActive: false,

    /**
     * init
     */
    init: () => {
      EL.HMB.addEventListener('click', func.switchShowHide, false)
      EL.HMBBG.addEventListener('click', func.switchShowHide, false)
      window.addEventListener('resize', func.resize, false)
    },

    /**
     * show
     */
    show: () => {
      func.isActive = true
      EL.HTML.classList.add('is-nav-active')
    },

    /**
     * hide
     */
    hide: () => {
      func.isActive = false
      EL.HTML.classList.remove('is-nav-active')
    },

    /**
     * switchShowHide
     */
    switchShowHide: () => {
      func.isActive ? func.hide() : func.show()
    },

    /**
     * resize
     */
    resize: debounce(150, () => {
      if (func.isActive) {
        func.hide()
      }
    })

  }

  func.init()
}
