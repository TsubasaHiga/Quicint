'use strict'

/**
 * CSS変数に100vhをセットします
 *
 * @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
export default (always = false) => {
  const vh = window.innerHeight * 0.01
  const name = always ? '--vh-always' : '--vh'
  document.documentElement.style.setProperty(name, `${vh}px`)
}
