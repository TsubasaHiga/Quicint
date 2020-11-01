'use strict'

/**
 * documentの高さを取得します
 * @return document height
 */
export default () => {
  return document.body.clientHeight - window.innerHeight
}
