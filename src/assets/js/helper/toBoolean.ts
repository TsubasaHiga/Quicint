'use strict'

/**
 * 文字列'true'をbooleanで返します。
 * @param {string} booleanStr
 */
export default booleanStr => {
  if (typeof booleanStr === 'undefined') {
    return
  }
  return booleanStr.toLowerCase() === 'true'
}
