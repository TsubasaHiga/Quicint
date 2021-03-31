'use strict'

import EL from '../constant/elements'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'thro... Remove this comment to see the full error message
import { debounce } from 'throttle-debounce'

/**
 * deviceの回転の向きを取得して返します
 * @link https://wemo.tech/402 参考
 */
export default () => {
  let isReverse = false

  // 正面設定が通常の場合の縦横判定処理
  const isLandscapeCheck = () => window.orientation !== 0

  // 正面設定が逆の場合の縦横判定処理
  const isLandscapeCheckReverse = () => window.orientation === 0

  // Androidなら正面設定を確認
  if (EL.HTML.dataset.os === 'android') {
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'msOrientation' does not exist on type 'S... Remove this comment to see the full error message
    if (orientation.type === 'portrait-secondary' || orientation.type === 'landscape-primary') {
      isReverse = true
    }
  }

  /**
   * chkorientation
   * @param {boolean} isReverse
   */
  const chkorientation = isReverse => {
    if (isReverse) {
      // 正面が逆の場合
      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'isReverse' implicitly has an 'any' type... Remove this comment to see the full error message
      EL.HTML.dataset.orientation = isLandscapeCheckReverse() === true ? 'landscape' : 'portrait'
    } else {
      // 正面が通常の場合
      EL.HTML.dataset.orientation = isLandscapeCheck() === true ? 'landscape' : 'portrait'
    }
  }

  chkorientation(isReverse)

  window.addEventListener('orientationchange', debounce(150, () => chkorientation(isReverse)), false)
}
