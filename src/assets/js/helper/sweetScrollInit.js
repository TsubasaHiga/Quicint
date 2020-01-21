'use strict'

import DEFINE from '../constant/define'
import getDeviceType from '../helper/getDeviceType'
import { throttle, debounce } from 'throttle-debounce'
import SweetScroll from 'sweet-scroll'

/**
 * sweetScrollInit
 */
export default () => {
  const sweetScrollInit = () => {
    let deviceType = getDeviceType()
    // init
    const sweetScrollConfig = {
      offset: deviceType === 'lg' ? DEFINE.SCROLLOFFSETLG : DEFINE.SCROLLOFFSETSM,
      easing: 'easeOutCubic',
      duration: 600
    }
    const sweetScroll = new SweetScroll(sweetScrollConfig)

    // get hash.
    const hash = window.location.hash
    const needsInitialScroll = document.getElementById(hash.substr(1)) != null
    if (needsInitialScroll) {
      // window.location.hash = ''
      sweetScroll.to(hash, { updateURL: 'replace' })
    }

    // resize
    window.addEventListener(
      'resize',
      debounce(300, () => {
        // スムーススクロール destroy.
        if (
          typeof sweetScroll !== 'undefined' &&
          deviceType !== getDeviceType()
        ) {
          deviceType = getDeviceType()
          sweetScroll.destroy()
          sweetScrollInit()
        }
      }),
      false
    )
  }

  sweetScrollInit()
}
