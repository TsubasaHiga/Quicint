// @ts-expect-error
import luxy from 'luxy.js'

import EL from '../constant/elements'
import UaType from '../types/UaType'
import getClassName from './getClassName'

/**
 * luxyでスムーズスクロール処理を行います
 */
export default (ua: UaType): void => {
  const func = {
    isActive: false,
    className: getClassName(EL.BODY),

    init: () => {
      // ieの時は無し
      if (ua.browserName === 'ie') return

      // firefoxの時は無し
      if (ua.browserName === 'firefox') return

      // タッチサポートありの時は無し
      if (ua.touchsupport) return

      // laptopの時
      if (ua.type === 'laptop') {
        if (func.className.endsWith('faq')) return

        luxy.init({
          wrapper: '#l-mainwrap',
          wrapperSpeed: 0.095,
        })

        func.isActive = true
      }
    },
  }

  func.init()
}
