import autoBind from 'auto-bind'
import { debounce } from 'throttle-debounce'

import EL from '../constant/elements'
import GetDeviceType from '../utils/getDeviceType'
import GetUadata from './getUaData'
class SetOrientation {
  isReverse: boolean
  lastInnerWidth: number

  constructor() {
    autoBind(this)

    this.isReverse = false

    this.lastInnerWidth = window.innerWidth

    this.checkReverse()
    this.checkOrientation()

    this.addEventListener()
  }

  checkReverse(): void {
    // Androidなら正面設定を確認
    if (GetUadata().osName === 'android') {
      const orientation =
        // @ts-ignore
        screen.orientation || screen.mozOrientation || screen.msOrientation

      if (
        orientation.type === 'portrait-secondary' ||
        orientation.type === 'landscape-primary'
      ) {
        this.isReverse = true
      }
    }
  }

  // 正面設定が通常の場合の縦横判定処理
  isLandscapeCheck(): boolean {
    if (GetDeviceType() === 'sm' && typeof window.orientation === 'undefined') {
      return false
    }

    if (GetDeviceType() === 'lg') {
      return true
    }

    return window.orientation !== 0
  }

  // 正面設定が逆の場合の縦横判定処理
  isLandscapeCheckReverse(): boolean {
    if (GetDeviceType() === 'sm' && typeof window.orientation === 'undefined') {
      return false
    }

    if (GetDeviceType() === 'lg') {
      return true
    }

    return window.orientation === 0
  }

  checkOrientation(): void {
    // 正面が逆の場合
    if (this.isReverse) {
      EL.HTML.dataset.orientation = this.isLandscapeCheckReverse()
        ? 'landscape'
        : 'portrait'
    }

    // 正面が通常の場合
    if (!this.isReverse) {
      EL.HTML.dataset.orientation = this.isLandscapeCheck()
        ? 'landscape'
        : 'portrait'
    }
  }

  reCheck(): void {
    this.isReverse = false
    this.checkReverse()
    this.checkOrientation()
  }

  addEventListener(): void {
    window.addEventListener(
      'resize',
      debounce(100, () => {
        // window幅が変わった時
        if (this.lastInnerWidth !== window.innerWidth) {
          this.lastInnerWidth = window.innerWidth

          this.reCheck()
        }
      }),
      false
    )
  }
}

export default SetOrientation
