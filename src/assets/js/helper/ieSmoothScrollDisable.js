'use strict'

import EL from '../constant/elements'

/**
 * ieにてスムーズスクロールを無効化します
 *
 * @param {boolean} state
 */
export default state => {
  if (navigator.userAgent.match(/Trident\/7\./)) {
    /**
     * スクロール処理
     * @param {object} e
     */
    const scrollfunc = e => {
      e.preventDefault()
      const wd = event.wheelDelta
      const csp = window.pageYOffset
      window.scrollTo(0, csp - wd)
    }

    if (state) {
      EL.BODY.addEventListener('mousewheel', scrollfunc, false)
      window.ieSmoothScrollDisable = scrollfunc
    }

    if (!state && typeof window.ieSmoothScrollDisable !== 'undefined') {
      EL.BODY.removeEventListener('mousewheel', window.ieSmoothScrollDisable, false)
    }
  }
}
