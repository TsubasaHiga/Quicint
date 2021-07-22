/**
 * CSS変数に100vhをセットします
 * @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
const Set100vh = (setProperty = '--vh'): void => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty(setProperty, `${vh}px`)
}

export default Set100vh
