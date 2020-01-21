'use strict'

import EL from '../constant/elements'
import getDeviceType from './getDeviceType'

/**
 * documentの高さを取得します
 * @return document height
 */
export default () => {
  let documentH = null
  documentH = document.body.clientHeight - window.innerHeight
  if (getDeviceType() === 'sm') {
    documentH = documentH - EL.FOOTER.clientHeight + 0
  }
  return documentH
}
