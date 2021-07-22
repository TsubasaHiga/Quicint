// @ts-expect-error
import luxy from 'luxy.js'

import UaType from '../types/UaType'

const SmoothScroll = (state: boolean, ua: UaType): void => {
  const func = {
    init: () => {
      if (ua.browserName === 'ie') {
        return false
      }

      if (ua.browserName === 'firefox') {
        return false
      }

      if (ua.touchsupport) {
        return false
      }

      // laptopの時
      if (ua.type === 'laptop') {
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
