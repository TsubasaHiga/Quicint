'use strict'

import EL from '../constant/elements'
import { throttle, debounce } from 'throttle-debounce'

/**
 * deviceの回転の向きを取得して返します
 * @link https://wemo.tech/402 参考
 */
export default () => {
  let isReverse = false

  // 正面設定が通常の場合の縦横判定処理
  const isLandscapeCheck = () => {
    const isLandscape = window.orientation !== 0
    return isLandscape
  }

  // 正面設定が逆の場合の縦横判定処理
  const isLandscapeCheckReverse = () => {
    const isLandscape = window.orientation === 0
    return isLandscape
  }

  // Androidなら正面設定を確認
  if (EL.HTML.dataset.os === 'android') {
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
    if (orientation.type === 'portrait-secondary' || orientation.type === 'landscape-primary') {
      isReverse = true
    }
  }

  const chkorientation = isReverse => {
    if (isReverse) {
      // 正面が逆の場合
      if (isLandscapeCheckReverse() === true) {
        EL.HTML.dataset.orientation = 'landscape'
      } else {
        EL.HTML.dataset.orientation = 'portrait'
      }
    } else {
      // 正面が通常の場合
      if (isLandscapeCheck() === true) {
        EL.HTML.dataset.orientation = 'landscape'
      } else {
        EL.HTML.dataset.orientation = 'portrait'
      }
    }
  }

  chkorientation(isReverse)

  window.addEventListener(
    'orientationchange',
    debounce(150, () => {
      chkorientation(isReverse)
    }),
    false
  )
}
