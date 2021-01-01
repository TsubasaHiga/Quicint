'use strict'

import DEFINE from '../constant/define'

/**
 * breakpointとウインドウサイズを比較してlgかsmか返します
 * @return string 'lg' or 'sm'
 */
export default () => {
  return window.innerWidth > DEFINE.BREAKPOINT ? 'lg' : 'sm'
}
