'use strict'

/**
 * documentの高さを取得します
 * @return document height
 */
export default () => {
  const documentH = document.body.clientHeight - window.innerHeight
  return documentH
}
