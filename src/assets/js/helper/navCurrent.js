'use strict'

import DEFINE from '../constant/define'

/**
 * ナビのカレント処理を行います
 */
export default target => {
  for (let i = 0; i < target.length; i++) {
    if (DEFINE.BODYCLASS === target[i].dataset.linkname) {
      target[i].classList.add('is-active')
      break
    }
  }
}
