import SweetScroll from 'sweet-scroll'

import DEFINE from '../constant/define'
import GetDeviceType from '../utils/getDeviceType'

const SweetScrollInit = (): void => {
  const func = {
    isActive: false,
    deviceType: GetDeviceType(),
    sweetScroll: null,

    OPTION: {},

    init: () => {
      func.isActive = true
      func.getOption()
      // @ts-ignore
      func.sweetScroll = new SweetScroll(func.OPTION)

      // scrollToHash
      func.scrollToHash()

      window.addEventListener('resize', func.resize, false)
    },

    scrollToHash: () => {
      const hash = window.location.hash
      if (hash) {
        const needsInitialScroll =
          document.getElementById(hash.substr(1)) != null
        if (needsInitialScroll) {
          // @ts-ignore
          func.sweetScroll.to(hash, { updateURL: 'replace' })
        }
      }
    },

    getOption: () => {
      func.OPTION = {
        offset:
          func.deviceType === 'lg'
            ? DEFINE.SCROLL_OFFSET_LG
            : DEFINE.SCROLL_OFFSET_SM,
        easing:
          func.deviceType === 'lg'
            ? DEFINE.SCROLL_EASING_LG
            : DEFINE.SCROLL_EASING_SM,
        duration:
          func.deviceType === 'lg'
            ? DEFINE.SCROLL_DURATION_LG
            : DEFINE.SCROLL_DURATION_SM,
      }
    },

    resize: () => {
      if (func.deviceType !== GetDeviceType()) {
        func.deviceType = GetDeviceType()

        func.getOption()
        func.destroy()
        func.init()
      }
    },

    destroy: () => {
      if (func.isActive) {
        func.isActive = false
        // @ts-ignore
        func.sweetScroll.destroy()
        window.removeEventListener('resize', func.resize, false)
      }
    },
  }

  func.init()
}

export default SweetScrollInit
