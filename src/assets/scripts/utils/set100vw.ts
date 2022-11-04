/**
 * CSS変数に100vw（スクロールバーを含まない値）をセットします
 */
const Set100vw = (setProperty = '--vw'): void => {
  const vw = document.documentElement.clientWidth
  document.documentElement.style.setProperty(setProperty, `${vw}px`)
}

export default Set100vw
