'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'

/**
 * ナビのカレント処理を提供します
 * @param {object} swup
 */
// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'swup' implicitly has an 'any' type.
export default swup => {
  const targets = document.querySelectorAll('[data-indicator]')
  let className = getClassName(EL.BODY)

  /**
   * currentUpdater
   */
  const currentUpdater = () => {
    const matches = []

    for (let i = 0; i < targets.length; i = (i + 1) | 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'dataset' does not exist on type 'Element... Remove this comment to see the full error message
      if (className.match(targets[i].dataset.indicator)) matches.push(targets[i])
    }

    if (matches.length) {
      for (let i = 0; i < matches.length; i = (i + 1) | 0) {
        matches[i].classList.add('is-nav-current')
      }
    }
  }

  currentUpdater()

  if (swup) {
    swup.on('willReplaceContent', () => {
      for (let i = 0; i < targets.length; i = (i + 1) | 0) {
        targets[i].classList.remove('is-nav-current')
      }
    })

    swup.on('contentReplaced', () => {
      className = getClassName(EL.BODY)
      currentUpdater()
    })
  }
}
