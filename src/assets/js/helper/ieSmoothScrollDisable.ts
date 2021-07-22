'use strict'

import EL from '../constant/elements'

declare global {
  interface window {
    ieSmoothScrollDisable: any
  }
}

/**
 * ieにてスムーズスクロールを無効化します
 *
 * @param {boolean} state
 */
export default (state: boolean): void => {
  // TODO matchからexecに変更。正しく動いているか確認すること。
  if ((/Trident\/7\./).exec(navigator.userAgent)) {
    /**
     * スクロール処理
     * @param {object} e
     */
    const scrollfunc = (e: any) => {
      e.preventDefault()
      const wd = e.wheelDelta
      const csp = window.pageYOffset
      window.scrollTo(0, csp - wd)
    }

    const ieSmoothScrollDisable = (<any>window).ieSmoothScrollDisable

    if (state) {
      EL.BODY.addEventListener('mousewheel', scrollfunc, false);
      (<any>window).ieSmoothScrollDisable = scrollfunc
    }

    if (!state && typeof (<any>window).ieSmoothScrollDisable !== 'undefined') {
      EL.BODY.removeEventListener('mousewheel', (<any>window).ieSmoothScrollDisable, false)
    }
  }
}
