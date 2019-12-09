'use strict'

import DEFINE from '../constant/define'

/**
 * breakpointとウインドウサイズを比較してlgかsmか返します
 * @return string 'lg' or 'sm'
 */
export default () => {
  const windowWidth = window.innerWidth
  const deviceType = windowWidth > DEFINE.BREAKPOINT ? 'lg' : 'sm'
  return deviceType
}
