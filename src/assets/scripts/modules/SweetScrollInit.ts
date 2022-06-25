import autoBind from 'auto-bind'
import SweetScroll from 'sweet-scroll'

import DEFINE from '../constant/define'
import GetDeviceType from '../utils/getDeviceType'

type optionsType = {
  offset: number
  easing: string
  duration: number
}
class SweetScrollInit {
  isActive: boolean
  deviceType: string
  sweetScroll: SweetScroll | null

  optionsLg: optionsType
  optionsSm: optionsType

  constructor() {
    autoBind(this)

    this.isActive = false
    this.deviceType = GetDeviceType()
    this.sweetScroll = null

    this.optionsLg = {
      offset: 0,
      easing: 'easeInOutQuart',
      duration: DEFINE.SCROLL_DURATION_LG,
    }

    this.optionsSm = {
      offset: 0,
      easing: 'easeInOutQuart',
      duration: DEFINE.SCROLL_DURATION_SM,
    }

    this.init()

    window.addEventListener('resize', this.onResize, false)
  }

  init(): void {
    this.isActive = true

    const options = this.deviceType === 'lg' ? this.optionsLg : this.optionsSm
    this.sweetScroll = new SweetScroll(options)

    this.scrollToHash()
  }

  scrollToHash(): void {
    if (!this.sweetScroll) {
      return
    }

    const hash = window.location.hash

    if (!hash) {
      return
    }

    const needsInitialScroll = document.getElementById(hash.substr(1)) != null

    if (!needsInitialScroll) {
      return
    }

    this.sweetScroll.to(hash, { updateURL: 'replace' })
  }

  onResize(): void {
    if (this.deviceType === GetDeviceType()) {
      return
    }

    this.deviceType = GetDeviceType()

    this.sweetScrollDestroy()

    this.init()
  }

  sweetScrollDestroy(): void {
    if (!this.isActive || !this.sweetScroll) {
      return
    }

    this.isActive = false

    this.sweetScroll.destroy()
  }
}

export default SweetScrollInit
