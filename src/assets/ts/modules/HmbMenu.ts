import { debounce } from 'throttle-debounce'

import EL from '../constant/elements'
import GetDeviceType from '../utils/getDeviceType'
import Pd from '../utils/preventDefault'

const HmbMenu = (): void => {
  const func = {
    isActive: false,
    deviceType: GetDeviceType(),

    HMB: document.querySelector('#hmb'),
    HMBBG: document.querySelector('#hmb__bg'),

    init: () => {
      func.HMB?.addEventListener('click', func.switchShowHide, false)
      func.HMBBG?.addEventListener('click', func.switchShowHide, false)
      window.addEventListener('resize', func.resize, false)
    },

    show: () => {
      func.isActive = true
      EL.NAV.style.visibility = ''
      EL.HTML.classList.add('is-nav-active')

      EL.MAINWRAP?.addEventListener('touchmove', Pd, { passive: false })
      EL.MAINWRAP?.addEventListener('wheel', Pd, { passive: false })
    },

    hide: () => {
      func.isActive = false
      EL.HTML.classList.remove('is-nav-active')

      EL.MAINWRAP?.removeEventListener('touchmove', Pd)
      EL.MAINWRAP?.removeEventListener('wheel', Pd)
    },

    switchShowHide: () => {
      func.isActive ? func.hide() : func.show()
    },

    resize: debounce(150, () => {
      if (func.deviceType !== GetDeviceType()) {
        func.deviceType = GetDeviceType()
        func.hide()

        if (func.deviceType === 'lg') {
          EL.NAV.style.visibility = ''
        }
      }
    }),
  }

  func.init()
}

export default HmbMenu
