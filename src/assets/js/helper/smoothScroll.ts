'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'
// @ts-expect-error
import luxy from 'luxy.js'

/**
 * luxyでスムーズスクロール処理を行います
 * @param {object} ua
 */
export default (ua: any): void => {
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
          wrapperSpeed: 0.095
        })

        func.isActive = true
      }
    }

  }

  func.init()
}
