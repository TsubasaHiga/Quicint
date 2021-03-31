'use strict'

import EL from '../constant/elements'

/**
 * ieにてスムーズスクロールを無効化します
 *
 * @param {boolean} state
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
export default state => {
  if (navigator.userAgent.match(/Trident\/7\./)) {
    /**
     * スクロール処理
     * @param {object} e
     */
    const scrollfunc = e => {
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'e' implicitly has an 'any' type.
      e.preventDefault()
      const wd = event.wheelDelta
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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
