'use strict'

/**
 * documentの高さを取得します
 * @return document height
 */
export default (): number => {
  return document.body.clientHeight - window.innerHeight
}
