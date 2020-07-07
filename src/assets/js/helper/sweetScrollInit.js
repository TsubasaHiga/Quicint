'use strict'

import DEFINE from '../constant/define'
import getDeviceType from '../helper/getDeviceType'
import { throttle, debounce } from 'throttle-debounce'
import SweetScroll from 'sweet-scroll'

/**
 * sweetScroll
 */
export default () => {
  const func = {
    isActive: false,
    deviceType: getDeviceType(),
    sweetScroll: null,

    OPTION: {},

    /**
     * init
     */
    init: () => {
      func.isActive = true
      func.getOption()
      func.sweetScroll = new SweetScroll(func.OPTION)

      // get hash.
      const hash = window.location.hash
      if (hash) {
        const needsInitialScroll = document.getElementById(hash.substr(1)) != null
        if (needsInitialScroll) {
          func.sweetScroll.to(hash, { updateURL: 'replace' })
        }
      }

      window.addEventListener('resize', func.resize, false)
    },

    /**
     * getOption
     */
    getOption: () => {
      func.OPTION = {
        offset: func.deviceType === 'lg' ? DEFINE.SCROLLOFFSETLG : DEFINE.SCROLLOFFSETSM,
        easing: 'easeInOutQuart',
        duration: 900
      }
    },

    /**
     * resize
     */
    resize: () => {
      if (func.deviceType !== getDeviceType()) {
        func.deviceType = getDeviceType()

        func.getOption()
        func.destroy()
        func.init()
      }
    },

    /**
     * destroy
     */
    destroy: () => {
      if (func.isActive) {
        func.isActive = false
        func.sweetScroll.destroy()
        window.removeEventListener('resize', func.resize, false)
      }
    }
  }

  func.init()
}
