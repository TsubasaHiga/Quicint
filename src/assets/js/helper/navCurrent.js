'use strict'

import EL from '../constant/elements'
import getClassName from './getClassName'

/**
 * ナビのカレント処理を行います
 */
export default target => {
  const className = getClassName(EL.BODY)
  for (let i = 0; i < target.length; i = (i + 1) | 0) {
    if (className === target[i].dataset.linkname) {
      target[i].classList.add('is-active')
    } else {
      target[i].classList.remove('is-active')
    }
  }
}
