'use strict'

import EL from '../constant/elements'
import pD from './preventDefault'
import getDeviceType from './getDeviceType'
import { throttle, debounce } from 'throttle-debounce'

/**
 * ハンバーガーメニューの処理を提供します
 * @param {object} swup
 */
export default swup => {
  const func = {
    isActive: false,
    deviceType: getDeviceType(),

    HMB: document.querySelector('#hmb'),
    HMBBG: document.querySelector('#hmb__bg'),

    /**
     * init
     */
    init: () => {
      func.HMB.addEventListener('click', func.switchShowHide, false)
      func.HMBBG.addEventListener('click', func.switchShowHide, false)
      window.addEventListener('resize', func.resize, false)
    },

    /**
     * show
     */
    show: () => {
      func.isActive = true
      EL.NAV.style.visibility = ''
      EL.HTML.classList.add('is-nav-active')

      EL.MAINWRAP.addEventListener('touchmove', pD, { passive: false })
      EL.MAINWRAP.addEventListener('wheel', pD, { passive: false })
    },

    /**
     * hide
     */
    hide: () => {
      func.isActive = false
      EL.HTML.classList.remove('is-nav-active')

      EL.MAINWRAP.removeEventListener('touchmove', pD, { passive: false })
      EL.MAINWRAP.removeEventListener('wheel', pD, { passive: false })
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
      if (func.deviceType !== getDeviceType()) {
        func.deviceType = getDeviceType()
        func.hide()

        if (func.deviceType === 'lg') {
          EL.NAV.style.visibility = ''
        }
      }
    })

  }

  func.init()

  /**
   * swup clickLink
   */
  if (swup) {
    swup.on('clickLink', func.hide)
  }
}
