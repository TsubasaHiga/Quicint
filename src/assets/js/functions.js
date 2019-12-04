'use strict'
import { el, define } from './define'
import 'nodelist-foreach-polyfill'

/* ---------------------------------------------------------------- */

/**
 * get_deviceType
 * @return string 'lg' or 'sm'
 * @description breakpointとウインドウサイズを比較してlgかsmか返します
 */
export const getDeviceType = () => {
  const windowWidth = window.innerWidth
  const deviceType = windowWidth > define.breakpoint ? 'lg' : 'sm'
  return deviceType
}

/**
 * closet polyfill.
 * @link https://developer.mozilla.org/ja/docs/Web/API/Element/closest#Polyfill
 * @description ie11対応のclosest polyfillです.
 */
export const closetPolyfill = () => {
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.msMatchesSelector ||
      Element.prototype.webkitMatchesSelector
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var el = this

      do {
        if (el.matches(s)) return el
        el = el.parentElement || el.parentNode
      } while (el !== null && el.nodeType === 1)
      return null
    }
  }
}
