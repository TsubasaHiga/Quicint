'use strict'

/**
 * 特定の要素のクラスを取得して文字列で返します
 * @return string
 */
export default target => {
  const className = target.classList[0]
  return className
}
