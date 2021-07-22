import { debounce } from 'throttle-debounce'

import EL from '../constant/elements'

/**
 * deviceの回転の向きを取得して<html>のデータ属性にセットします
 * @link https://wemo.tech/402 参考
 */
export default (): void => {
  let isReverse = false

  // 正面設定が通常の場合の縦横判定処理
  const isLandscapeCheck = () => window.orientation !== 0

  // 正面設定が逆の場合の縦横判定処理
  const isLandscapeCheckReverse = () => window.orientation === 0

  // Androidなら正面設定を確認
  if (EL.HTML.dataset.os === 'android') {
    // @ts-ignore
    const orientation =
      screen.orientation || screen.mozOrientation || screen.msOrientation
    if (
      orientation.type === 'portrait-secondary' ||
      orientation.type === 'landscape-primary'
    ) {
      isReverse = true
    }
  }

  /**
   * chkorientation
   * @param {boolean} isReverse
   */
  const chkorientation = (isReverse: boolean) => {
    if (isReverse) {
      // 正面が逆の場合
      EL.HTML.dataset.orientation =
        isLandscapeCheckReverse() === true ? 'landscape' : 'portrait'
    } else {
      // 正面が通常の場合
      EL.HTML.dataset.orientation =
        isLandscapeCheck() === true ? 'landscape' : 'portrait'
    }
  }

  chkorientation(isReverse)

  window.addEventListener(
    'orientationchange',
    debounce(150, () => chkorientation(isReverse)),
    false
  )
}
