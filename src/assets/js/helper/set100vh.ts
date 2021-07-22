'use strict'

/**
 * CSS変数に100vhをセットします
 *
 * @param {boolean} setProperty 任意のプロパティ名
 * @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
export default (setProperty = '--vh'): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty(setProperty, `${vh}px`)
}
