'use strict'

import DEFINE from '../constant/define'
import getDeviceType from '../helper/getDeviceType'
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

      // scrollToHash
      func.scrollToHash()

      window.addEventListener('resize', func.resize, false)
    },

    /**
     * scrollToHash
     */
    scrollToHash: () => {
      const hash = window.location.hash
      if (hash) {
        const needsInitialScroll = document.getElementById(hash.substr(1)) != null
        if (needsInitialScroll) {
          func.sweetScroll.to(hash, { updateURL: 'replace' })
        }
      }
    },

    /**
     * getOption
     */
    getOption: () => {
      func.OPTION = {
        offset: func.deviceType === 'lg' ? DEFINE.SCROLL_OFFSET_LG : DEFINE.SCROLL_OFFSET_SM,
        easing: func.deviceType === 'lg' ? DEFINE.SCROLL_EASING_LG : DEFINE.SCROLL_EASING_SM,
        duration: func.deviceType === 'lg' ? DEFINE.SCROLL_DURATION_LG : DEFINE.SCROLL_DURATION_SM
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
