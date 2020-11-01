'use strict'

import EL from '../constant/elements'
import UAParser from 'ua-parser-js'

/**
 * ieとedgeHTMLにてスムーズスクロールを無効化します。
 * position fixedの時にガタつくため。
 */
export default () => {
  const ua = UAParser()
  if (
    (ua.browser.name === 'Edge' && ua.engine.name.toLowerCase().replace(' ', '-') === 'edgehtml') ||
    ua.browser.name === 'IE'
  ) {
    EL.BODY.addEventListener('mousewheel', () => {
      event.preventDefault()
      const wd = event.wheelDelta
      const csp = window.pageYOffset
      window.scrollTo(0, csp - wd)
    })
  }
}
