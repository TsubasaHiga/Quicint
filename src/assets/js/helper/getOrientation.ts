import { debounce } from 'throttle-debounce'

import EL from '../constant/elements'

const getOrientation = require('o9n').getOrientation

/**
 * deviceの回転の向きを取得して<html>のデータ属性にセットします
 */
export default (): void => {
  const isLandscapeCheck = () => getOrientation().angle !== 0

  const checkOrientation = () => {
    EL.HTML.dataset.orientation =
      isLandscapeCheck() === true ? 'landscape' : 'portrait'
  }

  checkOrientation()

  window.addEventListener(
    'orientationchange',
    debounce(150, () => checkOrientation()),
    false
  )
}
