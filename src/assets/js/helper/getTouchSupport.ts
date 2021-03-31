'use strict'

import EL from '../constant/elements'

/**
 * タッチサポート判定を行います
 * @param {boolean} isTouchSupport
 */
export default () => {
  const isTouchSupport = (window.ontouchstart === null)
  EL.HTML.dataset.touchsupport = isTouchSupport

  return isTouchSupport
}
