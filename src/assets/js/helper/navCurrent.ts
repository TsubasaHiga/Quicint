/* eslint-disable */
'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'

/**
 * ナビのカレント処理を提供します
 * @param {object} swup
 */
export default (swup: any): void => {
  const targets: NodeListOf<HTMLElement> = document.querySelectorAll('[data-indicator]')
  let className = getClassName(EL.BODY)

  /**
   * currentUpdater
   */
  const currentUpdater = () => {
    const matches = []

    for (let i = 0; i < targets.length; i = (i + 1) | 0) {
      if (targets[i].dataset.indicator!.match(className)) {
        matches.push(targets[i])
      }
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
