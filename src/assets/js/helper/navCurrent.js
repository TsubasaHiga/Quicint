'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'

/**
 * ナビのカレント処理を提供します
 */
export default () => {
  const targets = document.querySelectorAll('[data-indicator]')
  const className = getClassName(EL.BODY)

  /**
   * currentUpdater
   */
  const currentUpdater = () => {
    const matches = []

    for (let i = 0; i < targets.length; i = (i + 1) | 0) {
      if (className.match(targets[i].dataset.indicator)) matches.push(targets[i])
    }

    if (matches.length) {
      for (let i = 0; i < matches.length; i = (i + 1) | 0) {
        matches[i].classList.add('is-nav-current')
      }
    }
  }

  currentUpdater()
}
