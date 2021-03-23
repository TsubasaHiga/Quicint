'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'
// luxy.jsはnpm版よりgithub版の方が最新なのでvendor配下で直接ソース読み込みしています
import luxy from '../vendor/luxy'

/**
 * luxyでスムーズスクロール処理を行います
 * @param {object} ua
 */
export default ua => {
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
          wrapper: '#l-mainwrap-inner',
          wrapperSpeed: 0.095
        })

        func.isActive = true
      }
    }

  }

  func.init()
}
