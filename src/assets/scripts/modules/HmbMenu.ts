import autoBind from 'auto-bind'
import { debounce } from 'throttle-debounce'

import EL from '../constant/elements'
import GetDeviceType from '../utils/getDeviceType'
import Pd from '../utils/preventDefault'

class HmbMenu {
  isActive: boolean
  deviceType: string

  hmb: HTMLElement | null
  hmbBg: HTMLElement | null

  constructor() {
    autoBind(this)

    this.isActive = false
    this.deviceType = GetDeviceType()

    this.hmb = document.querySelector('#hmb')
    this.hmbBg = document.querySelector('#hmb-bg')

    this.hmb?.addEventListener('click', this.switchShowHide, false)
    this.hmbBg?.addEventListener('click', this.switchShowHide, false)
    window.addEventListener('resize', debounce(150, this.resize), false)
  }

  show(): void {
    this.isActive = true

    EL.NAV.style.visibility = ''
    document.documentElement.classList.add('is-nav-active')

    EL.MAIN_WRAP?.addEventListener('touchmove', Pd, { passive: false })
    EL.MAIN_WRAP?.addEventListener('wheel', Pd, { passive: false })
  }

  hide(): void {
    this.isActive = false

    document.documentElement.classList.remove('is-nav-active')

    EL.MAIN_WRAP?.removeEventListener('touchmove', Pd)
    EL.MAIN_WRAP?.removeEventListener('wheel', Pd)
  }

  switchShowHide(): void {
    this.isActive ? this.hide() : this.show()
  }

  resize(): void {
    if (this.deviceType === GetDeviceType()) {
      return
    }

    this.deviceType = GetDeviceType()
    this.hide()

    if (this.deviceType === 'lg') {
      EL.NAV.style.visibility = ''
    }
  }
}

export default HmbMenu
