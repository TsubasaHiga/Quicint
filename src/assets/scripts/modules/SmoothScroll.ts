import autoBind from 'auto-bind'

import UaType from '../types/UaType'
import GetUaData from '../utils/getUaData'

const luxy = require('luxy.js')

type optionsType = {
  wrapper: string
  wrapperSpeed: number
}
class SmoothScroll {
  options: optionsType

  constructor(state: boolean) {
    autoBind(this)

    const clientData = GetUaData()

    this.options = {
      wrapper: '#l-mainwrap',
      wrapperSpeed: 0.095,
    }

    if (state) {
      this.init(clientData)
    }
  }

  init(clientData: UaType): void {
    if (clientData.browserName === 'ie') {
      return
    }

    if (clientData.browserName === 'firefox') {
      return
    }

    if (clientData.touchSupport) {
      return
    }

    if (clientData.type === 'laptop') {
      luxy.init(this.options)
    }
  }
}

export default SmoothScroll
