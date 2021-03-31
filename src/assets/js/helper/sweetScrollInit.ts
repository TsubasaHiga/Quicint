'use strict'

import DEFINE from '../constant/define'
import getDeviceType from '../helper/getDeviceType'
import SweetScroll from 'sweet-scroll'

/**
 * sweetScroll
 * @param {object} swup
 */
export default swup => {
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'SweetScroll' is not assignable to type 'null... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        func.sweetScroll.destroy()
        window.removeEventListener('resize', func.resize, false)
      }
    }
  }

  func.init()

  /**
   * swup contentReplaced
   */
  if (func.isActive && swup) {
    swup.on('contentReplaced', () => {
      // scrollToHash
      func.scrollToHash()
    })
  }
}
