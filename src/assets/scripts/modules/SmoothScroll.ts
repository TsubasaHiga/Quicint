// @ts-expect-error
import luxy from 'luxy.js'

import UaType from '../types/UaType'

const SmoothScroll = (state: boolean, clientData: UaType): void => {
  const func = {
    init: () => {
      if (clientData.browserName === 'ie') {
        return false
      }

      if (clientData.browserName === 'firefox') {
        return false
      }

      if (clientData.touchSupport) {
        return false
      }

      // laptopの時
      if (clientData.type === 'laptop') {
        luxy.init({
          wrapper: '#l-mainwrap',
          wrapperSpeed: 0.095,
        })
      }
    },
  }

  if (state) {
    func.init()
  }
}

export default SmoothScroll
